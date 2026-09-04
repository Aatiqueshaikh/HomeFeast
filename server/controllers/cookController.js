const Cook = require("../models/Cook");

// Create cook profile
const createCook = async (req, res) => {
  try {
    const {
      businessName,
      description,
      city,
      foodType,
      pricePerMeal,
      image,
    } = req.body;

    if (
      !businessName ||
      !description ||
      !city ||
      !foodType ||
      pricePerMeal === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const existingCook = await Cook.findOne({
      user: req.user._id,
    });

    if (existingCook) {
      return res.status(400).json({
        message: "Cook profile already exists",
      });
    }

    const cook = await Cook.create({
      user: req.user._id,
      businessName,
      description,
      city,
      foodType,
      pricePerMeal,
      image: image || "",
    });

    res.status(201).json({
      message: "Cook profile created successfully",
      cook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create cook profile",
      error: error.message,
    });
  }
};

// Get all cooks
const getAllCooks = async (req, res) => {
  try {
    const cooks = await Cook.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: cooks.length,
      cooks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cooks",
      error: error.message,
    });
  }
};

// Get single cook
const getCookById = async (req, res) => {
  try {
    const cook = await Cook.findById(req.params.id).populate(
      "user",
      "name email phone"
    );

    if (!cook) {
      return res.status(404).json({
        message: "Cook not found",
      });
    }

    res.status(200).json({
      cook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cook",
      error: error.message,
    });
  }
};

// Update cook profile
const updateCook = async (req, res) => {
  try {
    const cook = await Cook.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cook) {
      return res.status(404).json({
        message: "Cook profile not found or not authorized",
      });
    }

    const {
      businessName,
      description,
      city,
      foodType,
      pricePerMeal,
      image,
      isVerified,
    } = req.body;

    if (businessName !== undefined) cook.businessName = businessName;
    if (description !== undefined) cook.description = description;
    if (city !== undefined) cook.city = city;
    if (foodType !== undefined) cook.foodType = foodType;
    if (pricePerMeal !== undefined) cook.pricePerMeal = pricePerMeal;
    if (image !== undefined) cook.image = image;

    // Verification should not be changed by a normal cook
    if (req.user.role === "admin" && isVerified !== undefined) {
      cook.isVerified = isVerified;
    }

    await cook.save();

    res.status(200).json({
      message: "Cook profile updated successfully",
      cook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update cook profile",
      error: error.message,
    });
  }
};

// Get logged-in cook profile
const getMyCookProfile = async (req, res) => {
  try {
    const cook = await Cook.findOne({
      user: req.user._id,
    }).populate("user", "name email phone city");

    if (!cook) {
      return res.status(404).json({
        message: "Cook profile not found",
      });
    }

    res.status(200).json({
      cook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cook profile",
      error: error.message,
    });
  }
};

// Verify / unverify cook profile (Admin only)
const verifyCook = async (req, res) => {
  try {
    const cook = await Cook.findById(req.params.id);

    if (!cook) {
      return res.status(404).json({
        message: "Cook profile not found",
      });
    }

    const { isVerified } = req.body;

    if (typeof isVerified !== "boolean") {
      return res.status(400).json({
        message: "isVerified must be true or false",
      });
    }

    cook.isVerified = isVerified;

    await cook.save();

    res.status(200).json({
      message: isVerified
        ? "Cook approved successfully"
        : "Cook approval removed successfully",
      cook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update cook verification",
      error: error.message,
    });
  }
};

module.exports = {
  createCook,
  getAllCooks,
  getCookById,
  getMyCookProfile,
  updateCook,
  verifyCook,
};