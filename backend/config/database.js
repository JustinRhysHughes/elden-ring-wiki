// Database configuration file
// Creates and exports the Sequelize instance connected to an SQLite database
// Handles connection errors gracefully with try/catch
// All sensitive connection details are loaded from environment variables

const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a new Sequelize instance using SQLite as the dialect
// DB_STORAGE defines the file path for the SQLite database file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE,
  logging: false,
});

// Test the database connection
// If the connection fails, log a user-friendly error message
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Unable to connect to the database:", err.message);
    console.error("Please check your database configuration and try again");
  }
};

testConnection();

module.exports = sequelize;
