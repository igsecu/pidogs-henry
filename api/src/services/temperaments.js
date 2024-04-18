const Temperament = require("../models/Temperament");

// Get temperament by id
const getTemperamentById = async (id) => {
  try {
    const temperament = await Temperament.findByPk(id, {
      attributes: ["id", "name"],
    });

    if (temperament) {
      return {
        id: temperament.id,
        name: temperament.name,
      };
    }

    return temperament;
  } catch (error) {
    throw new Error("Error trying to get a temperament by its id");
  }
};

// Get temperaments
const getTemperaments = async () => {
  const results = [];
  try {
    const temperaments = await Temperament.findAll({
      order: [["name", "ASC"]],
    });

    if (temperaments) {
      temperaments.forEach((t) => {
        results.push({
          id: t.id,
          name: t.name,
        });
      });
    }

    return results;
  } catch (error) {
    throw new Error("Error trying to get all temperaments");
  }
};

module.exports = {
  getTemperamentById,
  getTemperaments,
};
