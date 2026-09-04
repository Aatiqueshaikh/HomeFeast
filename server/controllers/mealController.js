const Meal = require("../models/Meal");
const Cook = require("../models/Cook");

// Create meal
const createMeal = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      foodType,
      mealPlan,
      price,
      image,
      mealType,
      isAvailable,
    } = req.body;

    if (
      !name ||
      !description ||
      !category ||
      !foodType ||
      !mealPlan ||
      price === undefined ||
      !mealType
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Find the cook profile belonging to the logged-in user
    const cook = await Cook.findOne({
      user: req.user._id,
    });

    if (!cook) {
      return res.status(404).json({
        message: "Cook profile not found",
      });
    }

    const meal = await Meal.create({
        cook: cook._id,
        name,
        description,
        category,
        foodType,
        mealPlan,
        price,
        image: image || "",
        mealType,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
    });

    res.status(201).json({
      message: "Meal created successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create meal",
      error: error.message,
    });
  }
};

// Get all meals
const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find()
      .populate("cook", "businessName city foodType image isVerified")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: meals.length,
      meals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch meals",
      error: error.message,
    });
  }
};

// Get meals by cook
const getMealsByCook = async (req, res) => {
  try {
    const meals = await Meal.find({
      cook: req.params.cookId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: meals.length,
      meals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cook meals",
      error: error.message,
    });
  }
};

// Get single meal
const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate(
      "cook",
      "businessName city foodType image isVerified"
    );

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    res.status(200).json({
      meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch meal",
      error: error.message,
    });
  }
};

// Update meal
const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    // Find the cook who owns this meal
    const cook = await Cook.findOne({
      _id: meal.cook,
      user: req.user._id,
    });

    if (!cook) {
      return res.status(403).json({
        message: "Not authorized to update this meal",
      });
    }

    const {
      name,
      description,
      category,
      foodType,
      mealPlan,
      price,
      image,
      mealType,
      isAvailable,
    } = req.body;

    if (name !== undefined) meal.name = name;
    if (description !== undefined) meal.description = description;
    if (category !== undefined) meal.category = category;
    if (foodType !== undefined) meal.foodType = foodType;
    if (mealPlan !== undefined) meal.mealPlan = mealPlan;
    if (price !== undefined) meal.price = price;
    if (image !== undefined) meal.image = image;
    if (mealType !== undefined) meal.mealType = mealType;
    if (isAvailable !== undefined) meal.isAvailable = isAvailable;

    await meal.save();

    res.status(200).json({
      message: "Meal updated successfully",
      meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update meal",
      error: error.message,
    });
  }
};

// Delete meal
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    // Find the cook who owns this meal
    const cook = await Cook.findOne({
      _id: meal.cook,
      user: req.user._id,
    });

    if (!cook) {
      return res.status(403).json({
        message: "Not authorized to delete this meal",
      });
    }

    await meal.deleteOne();

    res.status(200).json({
      message: "Meal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete meal",
      error: error.message,
    });
  }
};

module.exports = {
  createMeal,
  getAllMeals,
  getMealsByCook,
  getMealById,
  updateMeal,
  deleteMeal,
};