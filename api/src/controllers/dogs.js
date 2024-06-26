const axios = require("axios");
const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");

const { uploadDogImage } = require("../utils/cloudinary");

const fsExtra = require("fs-extra");

const {
  convertTemperamentsToArray,
  validatePage,
  validateId,
  validateImageSize,
  validateFileType,
  validateHeight,
  validateLifeSpan,
  validateName,
  validateWeight,
  validateText,
} = require("../utils/index");

const dogServices = require("../services/dogs");
const temperamentServices = require("../services/temperaments");

// Get all dogs from API
const getAllApi = async () => {
  const results = [];
  try {
    const dbResults = await Dog.findAll({ limit: 1 });

    if (dbResults.length > 0) {
      return;
    }

    const apiResults = await axios.get("https://api.thedogapi.com/v1/breeds");

    if (apiResults) {
      for (let r of apiResults.data) {
        if (r.weight !== "NaN" || r.height !== "NaN" || r.life_span !== "NaN") {
          if (r.id !== 232 && r.id !== 179) {
            const image = await axios.get(
              `https://api.thedogapi.com/v1/images/${r.reference_image_id}`
            );
            const dogCreated = await Dog.create({
              name: r.name,
              min_weight: parseInt(r.weight.metric.split(" - ")[0]),
              max_weight: parseInt(r.weight.metric.split(" - ")[1])
                ? parseInt(r.weight.metric.split(" - ")[1])
                : null,
              weight: r.weight.metric,
              min_height: parseInt(r.height.metric.split(" - ")[0]),
              max_height: parseInt(r.height.metric.split(" - ")[1])
                ? parseInt(r.height.metric.split(" - ")[1])
                : null,
              height: r.height.metric,
              min_life_span: parseInt(r.life_span.split(" ")[0]),
              max_life_span: parseInt(r.life_span.split(" ")[1].split(" ")[1])
                ? parseInt(r.life_span.split(" ")[1].split(" ")[1])
                : null,
              life_span: r.life_span,
              image: image.data.url ? image.data.url : null,
            });

            if (dogCreated) {
              const temperaments = r.temperament
                ? convertTemperamentsToArray(r.temperament)
                : [];

              if (temperaments.length > 0) {
                temperaments.forEach(async (temperament) => {
                  const temperamentFound = await Temperament.findOne({
                    where: { name: temperament },
                  });
                  temperamentFound.addDog(dogCreated.dataValues.id);
                });
              }
            }
          }
        }
      }
    }

    return results;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error trying to get all dogs from API");
  }
};

// Get all dogs
const getDogs = async (req, res, next) => {
  const { page } = req.query;
  try {
    if (page) {
      if (validatePage(page)) {
        return res.status(400).json({
          statusCode: 400,
          msg: "Page must be a number",
        });
      }

      if (parseInt(page) === 0) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Page ${page} not found!`,
        });
      }
    }

    const dogs = await dogServices.getDogs(page ? page : 1);

    if (!dogs) {
      return res.status(404).json({
        statusCode: 404,
        msg: "No dogs saved in DB!",
      });
    }

    if (!dogs.data.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Page ${page} not found!`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      ...dogs,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

// Get Dog by id
const getDogById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!validateId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

    const dog = await dogServices.getDogById(id);

    if (!dog) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Dog with ID: ${id} not found!`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: dog,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

// Get filtered dogs
const getFilteredDogs = async (req, res, next) => {
  const { order, weight, height, life, page, name, temperament } = req.query;

  try {
    if (page) {
      if (validatePage(page)) {
        return res.status(400).json({
          statusCode: 400,
          msg: "Page must be a number",
        });
      }

      if (parseInt(page) === 0) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Page ${page} not found!`,
        });
      }
    }

    if (order) {
      if (order.toLowerCase() !== "asc" && order.toLowerCase() !== "desc") {
        return res.status(400).json({
          statusCode: 400,
          msg: "Order query must be ASC or DESC",
        });
      }
    }

    if (weight) {
      if (weight.toLowerCase() !== "asc" && weight.toLowerCase() !== "desc") {
        return res.status(400).json({
          statusCode: 400,
          msg: "Weight query must be ASC or DESC",
        });
      }
    }

    if (height) {
      if (height.toLowerCase() !== "asc" && height.toLowerCase() !== "desc") {
        return res.status(400).json({
          statusCode: 400,
          msg: "Height query must be ASC or DESC",
        });
      }
    }

    if (life) {
      if (life.toLowerCase() !== "asc" && life.toLowerCase() !== "desc") {
        return res.status(400).json({
          statusCode: 400,
          msg: "Life query must be ASC or DESC",
        });
      }
    }

    if (temperament) {
      if (!validateId(temperament)) {
        return res.status(400).json({
          statusCode: 400,
          msg: `temperament: ${temperament} - Invalid format!`,
        });
      }

      const temperamentFound = await temperamentServices.getTemperamentById(
        temperament
      );

      if (!temperamentFound) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Temperament with ID: ${temperament} not found!`,
        });
      }
    }

    /* if (!order && !weight && !height && !life && !name && !temperament) {
      return res.status(400).json({
        statusCode: 400,
        msg: "Query parameter is missing!",
      });
    } */

    const dogs = await dogServices.getFilteredDogs(
      page ? page : 1,
      order,
      weight,
      height,
      life,
      name,
      temperament
    );

    if (!dogs) {
      return res.status(404).json({
        statusCode: 404,
        msg: "No dogs found with these filters!",
      });
    }

    if (!dogs.data.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Page ${page} not found!`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      ...dogs,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

// Create dog
const createDog = async (req, res, next) => {
  const dog = req.body;

  if (validateName(dog.name)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateName(dog.name),
    });
  }

  if (validateHeight(dog.min_height, dog.max_height)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateHeight(dog.min_height, dog.max_height),
    });
  }

  if (validateWeight(dog.min_weight, dog.max_weight)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateWeight(dog.min_weight, dog.max_weight),
    });
  }

  if (validateLifeSpan(dog.min_life_span, dog.max_life_span)) {
    return res.status(400).json({
      statusCode: 400,
      msg: validateLifeSpan(dog.min_life_span, dog.max_life_span),
    });
  }

  try {
    const dogCreated = await dogServices.createDog(
      dog,
      dog.min_weight + " - " + dog.max_weight,
      dog.min_height + " - " + dog.max_height,
      dog.min_life_span + " - " + dog.max_life_span
    );

    if (dog.temperaments.length > 0) {
      for (let t of dog.temperaments) {
        const temperamentFound = await Temperament.findOne({
          where: { name: t },
        });
        temperamentFound.addDog(dogCreated.dataValues.id);
      }
    }

    res.status(201).json({
      statusCode: 201,
      msg: "Dog created successfully!",
      data: dogCreated,
    });
  } catch (error) {
    console.log(error.message);
    return next(new Error("Error trying to create a new dog!"));
  }
};

// Update dog image
const updateDogImage = async (req, res, next) => {
  const { id } = req.params;

  if (!validateId(id)) {
    return res.status(400).json({
      statusCode: 400,
      msg: `ID: ${id} - Invalid format!`,
    });
  }

  try {
    const dog = await dogServices.getDogById(id);

    if (!dog) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Dog with ID: ${id} not found!`,
      });
    }

    if (req.files?.image) {
      if (await validateFileType(req.files.image.tempFilePath)) {
        const message = await validateFileType(req.files.image.tempFilePath);

        await fsExtra.unlink(req.files.image.tempFilePath);

        await Dog.destroy({
          where: {
            id,
          },
        });

        return res.status(400).json({
          statusCode: 400,
          msg: message,
        });
      }

      if (await validateImageSize(req.files.image.tempFilePath)) {
        const message = await validateImageSize(req.files.image.tempFilePath);

        await fsExtra.unlink(req.files.image.tempFilePath);

        await Dog.destroy({
          where: {
            id,
          },
        });

        return res.status(400).json({
          statusCode: 400,
          msg: message,
        });
      }

      const result = await uploadDogImage(req.files.image.tempFilePath);

      await fsExtra.unlink(req.files.image.tempFilePath);

      const dogUpdated = await dogServices.updateDogImage(
        dog.id,
        result.secure_url,
        result.public_id
      );

      return res.status(200).json({
        statusCode: 200,
        msg: "Image updated successfully!",
        data: dogUpdated,
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: "Image file is missing!",
      });
    }
  } catch (error) {
    await fsExtra.unlink(req.files.image.tempFilePath);
    await Dog.destroy({
      where: {
        id,
      },
    });
    console.log(error.message);
    return next(error);
  }
};

// Get all temperaments
const getTemperaments = async (req, res, next) => {
  try {
    const temperaments = await temperamentServices.getTemperaments();

    if (!temperaments) {
      return res.status(404).json({
        statusCode: 404,
        msg: "No temperaments saved in DB!",
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: temperaments,
    });
  } catch (error) {
    return next(error);
  }
};

// Get last dogs
const getLastDogs = async (req, res, next) => {
  try {
    const dogs = await dogServices.getLastDogs();

    if (!dogs) {
      return res.status(404).json({
        statusCode: 404,
        msg: "No dogs saved in DB!",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: dogs,
    });
  } catch (error) {
    return next(error);
  }
};

// Get more views
const getMoreViews = async (req, res, next) => {
  try {
    const dogs = await dogServices.getMoreViews();

    if (!dogs) {
      return res.status(404).json({
        statusCode: 404,
        msg: "No dogs saved in DB!",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: dogs,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

// Create comment
const createComment = async (req, res, next) => {
  const { text, from, dogId } = req.body;

  try {
    if (!dogId) {
      return res.status(400).json({
        statusCode: 400,
        msg: "dogId is missing",
      });
    }

    if (!validateId(dogId)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `dogId: ${dogId} - Invalid format!`,
      });
    }

    const dog = await Dog.findByPk(dogId);

    if (!dog) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Dog with ID: ${dogId} not found!`,
      });
    }

    if (validateText(text)) {
      return res.status(400).json({
        statusCode: 400,
        msg: validateText(text),
      });
    }

    if (from) {
      if (typeof from !== "string") {
        return res.status(400).json({
          statusCode: 400,
          msg: "From must be a string!",
        });
      }
    }

    const comment = await dogServices.createComment(text, from, dogId);

    res.status(201).json({
      statusCode: 201,
      msg: "Comment created successfully!",
      data: comment,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

// Get dog comments
const getDogComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!validateId(id)) {
      return res.status(400).json({
        statusCode: 400,
        msg: `ID: ${id} - Invalid format!`,
      });
    }

    const dog = await Dog.findByPk(id);

    if (!dog) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Dog with ID: ${id} not found!`,
      });
    }

    const comments = await dogServices.getDogComments(id);

    if (!comments.length > 0) {
      return res.status(404).json({
        statusCode: 404,
        msg: "This dog does not have comments to show!",
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: comments,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

// Get last comments
const getLastComments = async (req, res, next) => {
  try {
    const comments = await dogServices.getLastComments();

    if (!comments) {
      return res.status(404).json({
        statusCode: 404,
        msg: "No comments saved in DB!",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: comments,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

// Get random dog
const getRandomDog = async (req, res, next) => {
  try {
    const dog = await dogServices.getRandomDog();

    if (!dog) {
      return res.status(404).json({
        statusCode: 404,
        msg: `No dogs saved in DB!`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: dog,
    });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  getAllApi,
  getDogs,
  getDogById,
  getFilteredDogs,
  createDog,
  updateDogImage,
  getTemperaments,
  getLastDogs,
  getMoreViews,
  createComment,
  getDogComments,
  getLastComments,
  getRandomDog,
};
