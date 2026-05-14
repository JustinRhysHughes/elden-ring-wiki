// User Routes
// Authenticated routes for managing user account details and password

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  updateUserDetails,
  updateUserPassword,
} = require("../controllers/userController");

// PUT update user details - requires authentication
router.put("/:id", verifyToken, updateUserDetails);

// PUT update user password - requires authentication
router.put("/:id/password", verifyToken, updateUserPassword);

module.exports = router;
