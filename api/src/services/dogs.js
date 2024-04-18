const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");

const { Op } = require("sequelize");

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
      attributes: ["id", "name", "image", "weight", "height", "life_span"],
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

      return {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        weight: dog.weight,
        height: dog.height,
        life_span: dog.life_span,
        temperaments: temperaments.map((t) => t.name),
      };
    }

    return dog;
  } catch (error) {
    throw new Error("Error trying to get a dog by its id");
  }
};

// Get dogs by temperament
const getDogsByTemperament = async (page, id) => {
  const results = [];
  try {
    const dogs = await Dog.findAndCountAll({
      attributes: ["id", "name", "image", "weight"],
      include: {
        model: Temperament,
        where: {
          id,
        },
      },
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
    throw new Error("Error trying to get all dogs by temperament");
  }
};

// Get filtered dogs
const getFilteredDogs = async (page, order, weight, height, life, name) => {
  const results = [];
  try {
    const dogs = await Dog.findAndCountAll({
      where: {
        ...(name
          ? {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            }
          : {}),
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

module.exports = {
  getDogs,
  getDogById,
  getDogsByTemperament,
  getFilteredDogs,
  createDog,
};
