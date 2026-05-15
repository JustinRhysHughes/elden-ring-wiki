const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const {
  updateUserDetails,
  updateUserPassword,
  getAllUsers,
  toggleAdminStatus,
} = require("../controllers/userController");

// GET all users - admin only
router.get("/", verifyToken, isAdmin, getAllUsers);

// PUT update user details - requires authentication
router.put("/:id", verifyToken, updateUserDetails);

// PUT update user password - requires authentication
router.put("/:id/password", verifyToken, updateUserPassword);

// PUT toggle admin status - admin only
router.put("/:id/admin", verifyToken, isAdmin, toggleAdminStatus);

module.exports = router;
