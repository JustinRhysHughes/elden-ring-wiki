// Boss Routes
// Public: GET /api/bosses, GET /api/bosses/:id
// Admin only: POST, PUT, PATCH, DELETE

const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const { validate, bossSchema } = require("../middleware/validate");
const {
  getAllBosses,
  getBossById,
  getBossBySlug,
  createBoss,
  updateBoss,
  patchBoss,
  deleteBoss,
} = require("../controllers/bossController");

// Public routes
router.get("/", getAllBosses);
router.get("/:slug", getBossBySlug);
router.get("/:id", getBossById);

// Admin only routes
router.post("/", verifyToken, isAdmin, validate(bossSchema), createBoss);
router.put("/:id", verifyToken, isAdmin, validate(bossSchema), updateBoss);
router.patch("/:id", verifyToken, isAdmin, patchBoss);
router.delete("/:id", verifyToken, isAdmin, deleteBoss);

module.exports = router;
