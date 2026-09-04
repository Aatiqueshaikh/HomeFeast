const User = require("../models/User");
const Cook = require("../models/Cook");
const Order = require("../models/Order");
const Subscription = require("../models/Subscription");
const Complaint = require("../models/Complaint");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Get all cooks
const getAllCooks = async (req, res) => {
  try {
    const cooks = await Cook.find()
      .populate("user", "name email phone city role")
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

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone city")
      .populate("cook", "businessName city foodType")
      .populate("meal", "name price mealType foodType")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user", "name email phone city")
      .populate("cook", "businessName city foodType")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch subscriptions",
      error: error.message,
    });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email phone city")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch complaints",
      error: error.message,
    });
  }
};

// Resolve complaint
const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = "Resolved";

    await complaint.save();

    res.status(200).json({
      message: "Complaint resolved successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to resolve complaint",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAllCooks,
  getAllOrders,
  getAllSubscriptions,
  getAllComplaints,
  resolveComplaint,
};