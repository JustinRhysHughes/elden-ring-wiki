// User Controller
// Handles updating user details and password
// Users can only update their own account

const { User } = require("../models");
const bcrypt = require("bcrypt");

// PUT update user details
// Authenticated users can update their own name, email and mobile
const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Users can only update their own account unless admin
    if (req.user.id !== parseInt(id) && !req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { name, email, mobile } = req.body;

    await user.update({ name, email, mobile });

    res.json({
      message: "Details updated successfully",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Error updating user details:", err);
    res.status(500).json({ error: "Failed to update details" });
  }
};

// PUT update user password
// Requires current password verification before updating
const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;

    // Users can only update their own password
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    await user.update({ password: hashed });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
};

// GET all users - admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "username",
        "name",
        "email",
        "mobile",
        "isAdmin",
        "createdAt",
      ],
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// PUT toggle admin status - admin only
const toggleAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from removing their own admin status
    if (req.user.id === parseInt(id)) {
      return res
        .status(400)
        .json({ error: "Cannot modify your own admin status" });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.update({ isAdmin: req.body.isAdmin });

    res.json({
      message: "User updated successfully",
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Error updating admin status:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = {
  updateUserDetails,
  updateUserPassword,
  getAllUsers,
  toggleAdminStatus,
};
