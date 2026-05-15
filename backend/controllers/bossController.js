// Boss Controller
// Handles all CRUD operations for Boss entities
// GET routes are public, POST/PUT/DELETE require admin authentication

const { Boss, Location } = require("../models");

// GET all bosses
// Returns all bosses with their associated location
const getAllBosses = async (req, res) => {
  try {
    const bosses = await Boss.findAll({
      include: [{ model: Location, attributes: ["name", "region"] }],
    });
    res.json(bosses);
  } catch (err) {
    console.error("Error fetching bosses:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    res.status(500).json({ error: "Failed to fetch bosses" });
  }
};

// GET single boss by slug
const getBossBySlug = async (req, res) => {
  try {
    const boss = await Boss.findOne({
      where: { slug: req.params.slug },
      include: [{ model: Location, attributes: ["name", "region"] }],
    });
    if (!boss) return res.status(404).json({ error: "Boss not found" });
    res.json(boss);
  } catch (err) {
    console.error("Error fetching boss:", err);
    res.status(500).json({ error: "Failed to fetch boss" });
  }
};

// GET single boss by id
// Returns a single boss with its associated location
const getBossById = async (req, res) => {
  try {
    const boss = await Boss.findByPk(req.params.id, {
      include: [{ model: Location, attributes: ["name", "region"] }],
    });

    if (!boss) {
      return res.status(404).json({ error: "Boss not found" });
    }

    res.json(boss);
  } catch (err) {
    console.error("Error fetching boss:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    res.status(500).json({ error: "Failed to fetch boss" });
  }
};

// POST create a new boss
// Admin only - requires valid JWT token with isAdmin: true
const createBoss = async (req, res) => {
  try {
    const { name, difficulty, drops, description, LocationId } = req.body;

    // Check location exists
    const location = await Location.findByPk(LocationId);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    // Auto-generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const boss = await Boss.create({
      slug,
      name,
      difficulty,
      drops,
      description,
      location: location.name,
      LocationId,
    });

    res.status(201).json({ message: "Boss created successfully", boss });
  } catch (err) {
    console.error("Error creating boss:", err);
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }
    res.status(500).json({ error: "Failed to create boss" });
  }
};

// PUT update an existing boss
// Admin only - requires valid JWT token with isAdmin: true
const updateBoss = async (req, res) => {
  try {
    const boss = await Boss.findByPk(req.params.id);

    if (!boss) {
      return res.status(404).json({ error: "Boss not found" });
    }

    const { name, difficulty, drops, description, LocationId } = req.body;

    await boss.update({
      name: name || boss.name,
      difficulty: difficulty || boss.difficulty,
      drops: drops || boss.drops,
      description: description || boss.description,
      LocationId: LocationId || boss.LocationId,
    });

    res.json({ message: "Boss updated successfully", boss });
  } catch (err) {
    console.error("Error updating boss:", err);
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
    res.status(500).json({ error: "Failed to update boss" });
  }
};

// PATCH partially update a boss
// Admin only - requires valid JWT token with isAdmin: true
const patchBoss = async (req, res) => {
  try {
    const boss = await Boss.findByPk(req.params.id);

    if (!boss) {
      return res.status(404).json({ error: "Boss not found" });
    }

    await boss.update(req.body);

    res.json({ message: "Boss patched successfully", boss });
  } catch (err) {
    console.error("Error patching boss:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    res.status(500).json({ error: "Failed to patch boss" });
  }
};

// DELETE a boss
// Admin only - requires valid JWT token with isAdmin: true
const deleteBoss = async (req, res) => {
  try {
    const boss = await Boss.findByPk(req.params.id);

    if (!boss) {
      return res.status(404).json({ error: "Boss not found" });
    }

    await boss.destroy();
    res.json({ message: "Boss deleted successfully" });
  } catch (err) {
    console.error("Error deleting boss:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res.status(503).json({
        error: "Database is currently unavailable, please try again later",
      });
    }
    res.status(500).json({ error: "Failed to delete boss" });
  }
};

module.exports = {
  getAllBosses,
  getBossById,
  getBossBySlug,
  createBoss,
  updateBoss,
  patchBoss,
  deleteBoss,
};
