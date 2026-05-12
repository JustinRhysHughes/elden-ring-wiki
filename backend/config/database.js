//* Database configuration file
//*Creates and exports the Sequelize instance connected to an SQLite database
//* All sensitive connection details are loaded from environment variables

const { Sequelize } = require("sequelize");
require("dotenv").config();

//* Create a new Sequelize instance using SQLite as the dialect
//* DB_STORAGE defines the file path for the SQLite database file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE,
  logging: false,
});

module.exports = sequelize;
