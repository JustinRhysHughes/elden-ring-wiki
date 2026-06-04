//* server.js
//* Entry point for the Elden Ring REST API
//* Supports both local development and Vercel serverless deployment

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

//* Allowed origins - restrict to your Vercel frontend in production
const allowedOrigins = [
  "http://localhost:3000",
  "https://elden-ring-wiki.vercel.app",
  "https://elden-ring-wiki-git-main-justin-hughes-projects-3b7faa1f.vercel.app",
];

//* CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      //* Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    credentials: true,
  }),
);

//* Handle preflight requests
app.options("/{*path}", cors());

// Security middleware
app.use(helmet());
app.use(express.json());

//* User-Agent bot filtering middleware
//* Blocks known bots and scrapers from accessing the API
app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"] || "";
  const blockedAgents = [
    "bot",
    "crawler",
    "spider",
    "scraper",
    "curl",
    "wget",
    "python-requests",
    "java",
  ];

  const isBlocked = blockedAgents.some((agent) =>
    userAgent.toLowerCase().includes(agent),
  );

  if (isBlocked) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
});

//* Routes
app.use("/api/auth", authRoutes);
app.use("/api/bosses", bossRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/lores", loreRoutes);
app.use("/api/users", userRoutes);

//* Health check
app.get("/", (req, res) => {
  res.json({ message: "Elden Ring API is running" });
});

//* 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//* Global error handler - no stack traces in production
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ error: "Internal server error" });
  } else {
    res.status(500).json({ error: err.message });
  }
});

//* Only start server if not in serverless environment
if (process.env.NODE_ENV !== "production") {
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
} else {
  //* In production sync without starting a server
  sequelize
    .sync({ force: false })
    .then(() => console.log("Database synced"))
    .catch((err) => console.error("Database sync failed:", err.message));
}

//* Export for Vercel serverless
module.exports = app;
