// Location Controller
// Handles all CRUD operations for Location entities
// GET routes are public, POST/PUT/DELETE require admin authentication

const { Location, Boss } = require("../models");

// GET all locations
// Returns all locations with their associated bosses
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      include: [{ model: Boss, attributes: ["name", "difficulty"] }],
    });
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

// GET single location by id
// Returns a single location with its associated bosses
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id, {
      include: [{ model: Boss, attributes: ["name", "difficulty"] }],
    });

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json(location);
  } catch (err) {
    console.error("Error fetching location:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    res.status(500).json({ error: "Failed to fetch location" });
  }
};

// POST create a new location
// Admin only - requires valid JWT token with isAdmin: true
const createLocation = async (req, res) => {
  try {
    const { name, region, description } = req.body;

    const location = await Location.create({ name, region, description });

    res
      .status(201)
      .json({ message: "Location created successfully", location });
  } catch (err) {
    console.error("Error creating location:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ error: "Failed to create location" });
  }
};

// PUT update an existing location
// Admin only - requires valid JWT token with isAdmin: true
const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    const { name, region, description } = req.body;

    await location.update({
      name: name || location.name,
      region: region || location.region,
      description: description || location.description,
    });

    res.json({ message: "Location updated successfully", location });
  } catch (err) {
    console.error("Error updating location:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ error: "Failed to update location" });
  }
};

// PATCH partially update a location
// Admin only - requires valid JWT token with isAdmin: true
const patchLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    await location.update(req.body);

    res.json({ message: "Location patched successfully", location });
  } catch (err) {
    console.error("Error patching location:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    res.status(500).json({ error: "Failed to patch location" });
  }
};

// DELETE a location
// Admin only - requires valid JWT token with isAdmin: true
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    await location.destroy();
    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    console.error("Error deleting location:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    res.status(500).json({ error: "Failed to delete location" });
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  patchLocation,
  deleteLocation,
};
