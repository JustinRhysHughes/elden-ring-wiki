// Lore Model
// Represents a lore entry in the Elden Ring wiki
// Contains information about the world, factions, events and locations

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Lore = sequelize.define("Lore", {
  // Primary key
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // URL-friendly slug for routing
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "Slug already exists",
    },
    validate: {
      notEmpty: {
        msg: "Slug cannot be empty",
      },
    },
  },
  // Title of the lore entry
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Title cannot be empty",
      },
    },
  },
  // Category of the lore entry
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Category cannot be empty",
      },
    },
  },
  // Full description of the lore entry
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Description cannot be empty",
      },
    },
  },
  // Optional image path
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Lore;
