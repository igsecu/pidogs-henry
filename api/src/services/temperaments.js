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

module.exports = {
  getTemperamentById,
};
