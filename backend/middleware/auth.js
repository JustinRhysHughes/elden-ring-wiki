// Auth Middleware
// Verifies JWT token on protected routes
// isAdmin middleware checks if the authenticated user has admin privileges

const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token
// Attaches decoded user data to req.user if valid
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access denied - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Middleware to check if the authenticated user is an admin
// Must be used after verifyToken
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Access denied - admins only" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
