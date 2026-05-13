// server.js
// Entry point for the Elden Ring REST API
// Initialises Express, middleware, routes and database connection

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const bossRoutes = require("./routes/bossRoutes");
const locationRoutes = require("./routes/locationRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bosses", bossRoutes);
app.use("/api/locations", locationRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Elden Ring API is running" });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Sync database and start server
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
