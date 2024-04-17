const axios = require("axios");
const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");

const { convertTemperamentsToArray, validatePage } = require("../utils/index");

const dogServices = require("../services/dogs");

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
            const dogCreated = await Dog.create({
              name: r.name,
              image: r.reference_image_id,
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

module.exports = {
  getAllApi,
  getDogs,
};
