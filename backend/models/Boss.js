//* Boss Model
//* Represents a boss enemy in the Lands Between
//* A Boss belongs to a Location

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Boss = sequelize.define("Boss", {
  //* Primary key
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  //* URL-friendly slug for routing
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
  //* Name of the boss
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Boss name cannot be empty",
      },
      len: {
        args: [2, 100],
        msg: "Boss name must be between 2 and 100 characters",
      },
    },
  },
  //* Difficulty rating
  difficulty: {
    type: DataTypes.ENUM("Easy", "Medium", "Hard", "Very Hard"),
    allowNull: false,
    validate: {
      isIn: {
        args: [["Easy", "Medium", "Hard", "Very Hard"]],
        msg: "Difficulty must be Easy, Medium, Hard or Very Hard",
      },
    },
  },
  //* Item dropped on defeat
  drops: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  //* Description of the boss
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  //* Optional image path
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  //* Location name for display (separate from the FK relationship)
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  //* Foreign key linking boss to a location
  LocationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Locations",
      key: "id",
    },
  },
});

module.exports = Boss;
