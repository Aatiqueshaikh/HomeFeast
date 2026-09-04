const express = require("express");

const {
  createCook,
  getAllCooks,
  getCookById,
  getMyCookProfile,
  updateCook,
} = require("../controllers/cookController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all cooks
router.get("/", getAllCooks);

// Get logged-in cook profile
router.get("/me/profile", protect, getMyCookProfile);

// Get single cook
router.get("/:id", getCookById);

// Create cook profile
router.post("/", protect, createCook);

// Update cook profile
router.put("/:id", protect, updateCook);

module.exports = router;