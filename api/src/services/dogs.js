const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");
const Comment = require("../models/Comment");

const { Op, Sequelize } = require("sequelize");

const { deleteImage } = require("../utils/cloudinary");

// Get dogs
const getDogs = async (page) => {
  const results = [];
  try {
    const dogs = await Dog.findAndCountAll({
      attributes: ["id", "name", "image", "weight"],
      limit: 8,
      offset: page * 8 - 8,
    });

    if (dogs.count === 0) {
      return false;
    }

    if (dogs.rows.length > 0) {
      for (let d of dogs.rows) {
        const temperaments = await Temperament.findAll({
          include: {
            model: Dog,
            where: {
              id: d.id,
            },
          },
        });

        if (temperaments.length > 0) {
          results.push({
            id: d.id,
            name: d.name,
            image: d.image,
            weight: d.weight,
            temperaments: temperaments.map((t) => t.name),
          });
        } else {
          results.push({
            id: d.id,
            name: d.name,
            image: d.image,
            weight: d.weight,
            temperaments: [],
          });
        }
      }

      return {
        totalResults: dogs.count,
        totalPages: Math.ceil(dogs.count / 8),
        page: parseInt(page),
        data: results,
      };
    } else {
      return { data: [] };
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get all dogs");
  }
};

// Get Dog By id
const getDogById = async (id) => {
  try {
    const dog = await Dog.findByPk(id, {
      attributes: [
        "id",
        "name",
        "image",
        "weight",
        "height",
        "life_span",
        "views",
        "comments_number",
      ],
    });

    if (dog) {
      const temperaments = await Temperament.findAll({
        attributes: ["id", "name"],
        include: {
          model: Dog,
          where: {
            id,
          },
        },
      });

      await Dog.increment(
        { views: 1 },
        {
          where: { id },
        }
      );

      return {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        weight: dog.weight,
        height: dog.height,
        life_span: dog.life_span,
        temperaments: temperaments.map((t) => t.name),
        views: dog.views,
        comments: dog.comments_number,
      };
    }

    return dog;
  } catch (error) {
    throw new Error("Error trying to get a dog by its id");
  }
};

// Get filtered dogs
const getFilteredDogs = async (
  page,
  order,
  weight,
  height,
  life,
  name,
  temperament
) => {
  const results = [];
  try {
    const dogs = await Dog.findAndCountAll({
      distinct: true,
      where: {
        ...(name
          ? {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            }
          : {}),
      },
      include: {
        model: Temperament,
        where: {
          ...(temperament
            ? {
                id: temperament,
              }
            : {}),
        },
      },
      order: [
        ...(order ? [["name", order.toUpperCase()]] : []),
        ...(weight ? [["min_weight", weight.toUpperCase()]] : []),
        ...(height ? [["min_height", height.toUpperCase()]] : []),
        ...(life ? [["life_span", life.toUpperCase()]] : []),
      ],
      limit: 8,
      offset: page * 8 - 8,
    });

    if (dogs.count === 0) {
      return false;
    }
    if (dogs.rows.length > 0) {
      for (let d of dogs.rows) {
        const temperaments = await Temperament.findAll({
          include: {
            model: Dog,
            where: {
              id: d.id,
            },
          },
        });

        if (temperaments.length > 0) {
          results.push({
            id: d.id,
            name: d.name,
            image: d.image,
            weight: d.weight,
            temperaments: temperaments.map((t) => {
              return t.name;
            }),
          });
        } else {
          results.push({
            id: d.id,
            name: d.name,
            image: d.image,
            weight: d.weight,
            temperaments: [],
          });
        }
      }

      return {
        totalResults: dogs.count,
        totalPages: Math.ceil(dogs.count / 8),
        page: parseInt(page),
        data: results,
      };
    } else {
      return { data: [] };
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get filtered dogs");
  }
};

// Create dog
const createDog = async (dog, weight, height, life_span) => {
  try {
    const dogCreated = await Dog.create({
      name: dog.name,
      min_height: dog.min_height,
      max_height: dog.max_height,
      min_weight: dog.min_weight,
      max_weight: dog.max_weight,
      min_life_span: dog.min_life_span,
      max_life_span: dog.max_life_span,
      weight,
      height,
      life_span,
    });

    console.log(dogCreated);

    return dogCreated;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to create a new dog");
  }
};

// Update dog image
const updateDogImage = async (id, image, image_id) => {
  try {
    const dog = await Dog.findByPk(id);

    if (dog.image_id !== null) {
      await deleteImage(dog.image_id);
    }

    const dogUpdated = await Dog.update(
      {
        image,
        image_id,
      },
      {
        where: {
          id,
        },
      }
    );

    if (dogUpdated[0] === 1) {
      const dog = await getDogById(id);

      return dog;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to update dog image!");
  }
};

// Get last dogs
const getLastDogs = async () => {
  const results = [];
  try {
    const dogs = await Dog.findAll({
      attributes: ["id", "name", "image"],
      order: [["createdAt", "DESC"]],
      limit: 7,
    });

    if (dogs) {
      dogs.forEach((d) => {
        results.push({
          id: d.id,
          name: d.name,
          image: d.image,
        });
      });
    }

    return results;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get last dogs");
  }
};

// Get more views
const getMoreViews = async () => {
  const results = [];
  try {
    const dogs = await Dog.findAll({
      attributes: ["id", "name", "image", "views"],
      order: [["views", "DESC"]],
      limit: 7,
    });

    if (dogs) {
      dogs.forEach((d) => {
        results.push({
          id: d.id,
          name: d.name,
          image: d.image,
          views: d.views,
        });
      });
    }

    return results;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get dogs with more views");
  }
};

// Create comment
const createComment = async (text, from, dogId) => {
  try {
    const comment = await Comment.create({
      text,
      from: from ? from : "Anonymous",
      dogId,
    });

    await Dog.increment(
      { comments_number: 1 },
      {
        where: {
          id: dogId,
        },
      }
    );

    return {
      id: comment.id,
      text: comment.text,
      from: comment.from,
    };
  } catch (error) {
    throw new Error("Error trying to create a comment");
  }
};

// Get dog Comments
const getDogComments = async (id) => {
  const results = [];

  try {
    const comments = await Comment.findAll({
      where: {
        dogId: id,
      },
      order: [["createdAt", "ASC"]],
    });

    if (comments) {
      comments.forEach((c) => {
        results.push({
          id: c.id,
          text: c.text,
          from: c.from,
        });
      });
    }

    return results;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get dog comments");
  }
};

// Get last comments
const getLastComments = async () => {
  const results = [];
  try {
    const comments = await Comment.findAll({
      attributes: ["id", "text", "from"],
      include: {
        model: Dog,
        attributes: ["id", "name", "image"],
      },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    if (comments) {
      comments.forEach((c) => {
        results.push({
          id: c.id,
          text: c.text,
          from: c.from,
          dog: {
            id: c.dog.id,
            name: c.dog.name,
            image: c.dog.image,
          },
        });
      });
    }

    return results;

    return results;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get last comments");
  }
};

// Get random dog
const getRandomDog = async () => {
  try {
    const dog = await Dog.findOne({
      order: Sequelize.literal("random()"),
    });

    if (dog) {
      return {
        name: dog.name,
        image: dog.image,
      };
    }

    return dog;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get a random dog");
  }
};

module.exports = {
  getDogs,
  getDogById,
  getFilteredDogs,
  createDog,
  updateDogImage,
  getLastDogs,
  getMoreViews,
  createComment,
  getDogComments,
  getLastComments,
  getRandomDog,
};
