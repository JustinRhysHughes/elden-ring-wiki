// Boss Model
// Represents a boss enemy in the Lands Between
// A Boss belongs to a Location

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Boss = sequelize.define("Boss", {
  // Primary key - auto incrementing integer
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // Name of the boss
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
  // Difficulty rating of the boss
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
  // Item dropped by the boss on defeat
  drops: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Description of the boss
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Foreign key linking boss to a location
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
