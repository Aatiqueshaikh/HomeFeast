const express = require("express");

const {
  createMeal,
  getAllMeals,
  getMealsByCook,
  getMealById,
  updateMeal,
  deleteMeal,
} = require("../controllers/mealController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all meals
router.get("/", getAllMeals);

// Get meals by cook
router.get("/cook/:cookId", getMealsByCook);

// Get single meal
router.get("/:id", getMealById);

// Create meal
router.post("/", protect, createMeal);

// Update meal
router.put("/:id", protect, updateMeal);

// Delete meal
router.delete("/:id", protect, deleteMeal);

module.exports = router;