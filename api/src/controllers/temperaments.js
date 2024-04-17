const axios = require("axios");
const Temperament = require("../models/Temperament");

// Get all temperament from API
const getAllTemperamentsFromApi = async () => {
  try {
    const dbResults = await Temperament.findAll({ limit: 1 });

    if (dbResults.length > 0) {
      return;
    }

    let response = await axios.get("https://api.thedogapi.com/v1/breeds");

    let temperamentsFromApi = [];

    response = response.data.map((item) => {
      return item.temperament;
    });

    response.forEach((item) => {
      if (item !== undefined) {
        item.split(", ").forEach((i) => {
          temperamentsFromApi.push(i.toUpperCase());
        });
      }
    });

    temperamentsFromApi = Array.from(new Set(temperamentsFromApi));

    // Create a temperament for each item in the array, in de DB
    for (let temperament of temperamentsFromApi) {
      await Temperament.create({ name: temperament });
    }
  } catch (error) {
    return next("Error trying to get all temperaments");
  }
};

module.exports = {
  getAllTemperamentsFromApi,
};
