const { DataTypes } = require("sequelize");
const db = require("../db");

const Temperament = db.define(
  "temperament",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Temperament;
