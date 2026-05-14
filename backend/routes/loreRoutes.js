// Lore Routes
// Public: GET /api/lore, GET /api/lore/:slug
// Admin only: POST, PUT, PATCH, DELETE

const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const {
  getAllLore,
  getLoreBySlug,
  getLoreById,
  createLore,
  updateLore,
  patchLore,
  deleteLore,
} = require("../controllers/loreController");

// Public routes
router.get("/", getAllLore);
router.get("/id/:id", getLoreById);
router.get("/:slug", getLoreBySlug);

// Admin only routes
router.post("/", verifyToken, isAdmin, createLore);
router.put("/:id", verifyToken, isAdmin, updateLore);
router.patch("/:id", verifyToken, isAdmin, patchLore);
router.delete("/:id", verifyToken, isAdmin, deleteLore);

module.exports = router;
