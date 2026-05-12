// server.js
// Entry point for the Elden Ring REST API
// Initialises Express, middleware, routes and database connection

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Elden Ring API is running" });
});

// Sync database and start server
// force: false means it won't drop existing tables
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected and synced");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
  });
