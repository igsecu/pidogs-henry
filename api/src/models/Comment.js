const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define(
  "comment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      defaultValue: "Anonymous",
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Comment;
