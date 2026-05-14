// Database configuration file
// Creates and exports the Sequelize instance connected to Supabase PostgreSQL
// All sensitive connection details are loaded from environment variables

const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance using the DATABASE_URL connection string
// SSL is required for Supabase connections
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Test the database connection
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
