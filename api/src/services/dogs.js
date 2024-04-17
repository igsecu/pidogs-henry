const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");

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

module.exports = {
  getDogs,
};
