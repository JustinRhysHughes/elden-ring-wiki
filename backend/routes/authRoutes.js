// Auth Routes
// Handles user registration and login
// POST /api/auth/register - creates a new user
// POST /api/auth/login - authenticates a user and returns a JWT token

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// POST /api/auth/register
// Creates a new user account
// Password is automatically hashed via the User model hook
router.post("/register", async (req, res) => {
  try {
    const { username, name, email, password, mobile } = req.body;

    // Check if username or email already exists
    const existing = await User.findOne({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create new user - password hashed automatically via beforeCreate hook
    const user = await User.create({
      username,
      name,
      email,
      password,
      mobile: mobile || null,
      isAdmin: false,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    // Handle Sequelize validation errors
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ error: "Server error during registration" });
  }
});

// POST /api/auth/login
// Authenticates a user and returns a signed JWT token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare submitted password against hashed password in DB
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Sign JWT token with user id and isAdmin flag
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;
