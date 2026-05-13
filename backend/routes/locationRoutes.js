// Location Routes
// Public: GET /api/locations, GET /api/locations/:id
// Admin only: POST, PUT, PATCH, DELETE

const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const { validate, locationSchema } = require("../middleware/validate");
const {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  patchLocation,
  deleteLocation,
} = require("../controllers/locationController");

// Public routes
router.get("/", getAllLocations);
router.get("/:id", getLocationById);

// Admin only routes - Joi validation runs before controller
router.post(
  "/",
  verifyToken,
  isAdmin,
  validate(locationSchema),
  createLocation,
);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  validate(locationSchema),
  updateLocation,
);
router.patch("/:id", verifyToken, isAdmin, patchLocation);
router.delete("/:id", verifyToken, isAdmin, deleteLocation);

module.exports = router;
