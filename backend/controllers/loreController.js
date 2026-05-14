// Lore Controller
// Handles all CRUD operations for Lore entries
// GET routes are public, POST/PUT/DELETE require admin authentication

const { Lore } = require("../models");

// GET all lore entries
const getAllLore = async (req, res) => {
  try {
    const lore = await Lore.findAll();
    res.json(lore);
  } catch (err) {
    console.error("Error fetching lore:", err);
    if (
      err.name === "SequelizeConnectionError" ||
      err.name === "SequelizeConnectionRefusedError"
    ) {
      return res
        .status(503)
        .json({ error: "Database is currently unavailable" });
    }
    res.status(500).json({ error: "Failed to fetch lore" });
  }
};

// GET single lore entry by slug
const getLoreBySlug = async (req, res) => {
  try {
    const lore = await Lore.findOne({ where: { slug: req.params.slug } });
    if (!lore) return res.status(404).json({ error: "Lore entry not found" });
    res.json(lore);
  } catch (err) {
    console.error("Error fetching lore:", err);
    res.status(500).json({ error: "Failed to fetch lore entry" });
  }
};

// GET single lore entry by id
const getLoreById = async (req, res) => {
  try {
    const lore = await Lore.findByPk(req.params.id);
    if (!lore) return res.status(404).json({ error: "Lore entry not found" });
    res.json(lore);
  } catch (err) {
    console.error("Error fetching lore:", err);
    res.status(500).json({ error: "Failed to fetch lore entry" });
  }
};

// POST create a new lore entry - admin only
const createLore = async (req, res) => {
  try {
    const { title, category, description, image } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const lore = await Lore.create({
      slug,
      title,
      category,
      description,
      image,
    });
    res.status(201).json({ message: "Lore entry created successfully", lore });
  } catch (err) {
    console.error("Error creating lore:", err);
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({ error: err.errors.map((e) => e.message) });
    }
    res.status(500).json({ error: "Failed to create lore entry" });
  }
};

// PUT update a lore entry - admin only
const updateLore = async (req, res) => {
  try {
    const lore = await Lore.findByPk(req.params.id);
    if (!lore) return res.status(404).json({ error: "Lore entry not found" });

    const { title, category, description, image } = req.body;
    await lore.update({
      title: title || lore.title,
      category: category || lore.category,
      description: description || lore.description,
      image: image || lore.image,
    });

    res.json({ message: "Lore entry updated successfully", lore });
  } catch (err) {
    console.error("Error updating lore:", err);
    res.status(500).json({ error: "Failed to update lore entry" });
  }
};

// PATCH partially update a lore entry - admin only
const patchLore = async (req, res) => {
  try {
    const lore = await Lore.findByPk(req.params.id);
    if (!lore) return res.status(404).json({ error: "Lore entry not found" });
    await lore.update(req.body);
    res.json({ message: "Lore entry patched successfully", lore });
  } catch (err) {
    console.error("Error patching lore:", err);
    res.status(500).json({ error: "Failed to patch lore entry" });
  }
};

// DELETE a lore entry - admin only
const deleteLore = async (req, res) => {
  try {
    const lore = await Lore.findByPk(req.params.id);
    if (!lore) return res.status(404).json({ error: "Lore entry not found" });
    await lore.destroy();
    res.json({ message: "Lore entry deleted successfully" });
  } catch (err) {
    console.error("Error deleting lore:", err);
    res.status(500).json({ error: "Failed to delete lore entry" });
  }
};

module.exports = {
  getAllLore,
  getLoreBySlug,
  getLoreById,
  createLore,
  updateLore,
  patchLore,
  deleteLore,
};
