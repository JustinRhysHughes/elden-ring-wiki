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
const loreRoutes = require("./routes/loreRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bosses", bossRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/lore", loreRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Elden Ring API is running" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

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
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled database rejection:", err.message);
});