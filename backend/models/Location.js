// Location Model
// Represents a location/region in the Lands Between
// A Location can have many Bosses associated with it

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Location = sequelize.define("Location", {
  // Primary key - auto incrementing integer
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  // Name of the location
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Location name cannot be empty",
      },
      len: {
        args: [2, 100],
        msg: "Location name must be between 2 and 100 characters",
      },
    },
  },
  // Region the location belongs to
  region: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Region cannot be empty",
      },
    },
  },
  // Description of the location
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Location;
