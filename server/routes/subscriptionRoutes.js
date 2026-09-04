const express = require("express");

const {
  createSubscription,
  getMySubscriptions,
  getSubscriptionById,
  cancelSubscription,
  getCookSubscriptions,
  acceptSubscription,
  rejectSubscription,
} = require("../controllers/subscriptionController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All subscription routes require authentication

// Create subscription
router.post("/", protect, createSubscription);

// Get logged-in user's subscriptions
router.get("/", protect, getMySubscriptions);

// Get subscriptions for logged-in cook
router.get("/cook", protect, getCookSubscriptions);

// Accept subscription request
router.put("/:id/accept", protect, acceptSubscription);

// Reject subscription request
router.put("/:id/reject", protect, rejectSubscription);

// Get single subscription
router.get("/:id", protect, getSubscriptionById);

// Cancel subscription
router.put("/:id/cancel", protect, cancelSubscription);

module.exports = router;