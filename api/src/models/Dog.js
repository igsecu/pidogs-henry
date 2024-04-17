const { DataTypes } = require("sequelize");
const db = require("../db");

const Dog = db.define(
  "dog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    min_height: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    max_height: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_weight: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    max_weight: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_life_span: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    max_life_span: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    image_id: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);

module.exports = Dog;
