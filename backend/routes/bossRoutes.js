// Boss Routes
// Public: GET /api/bosses, GET /api/bosses/:id
// Admin only: POST, PUT, PATCH, DELETE

const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const {
  getAllBosses,
  getBossById,
  createBoss,
  updateBoss,
  patchBoss,
  deleteBoss,
} = require("../controllers/bossController");

// Public routes
router.get("/", getAllBosses);
router.get("/:id", getBossById);

// Admin only routes
router.post("/", verifyToken, isAdmin, createBoss);
router.put("/:id", verifyToken, isAdmin, updateBoss);
router.patch("/:id", verifyToken, isAdmin, patchBoss);
router.delete("/:id", verifyToken, isAdmin, deleteBoss);

module.exports = router;
