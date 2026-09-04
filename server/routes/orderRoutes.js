const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getCookOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/", protect, getMyOrders);

// Get orders for logged-in cook
router.get("/cook", protect, getCookOrders);

// Update order status by cook
router.put("/:id/status", protect, updateOrderStatus);

// Get single order
router.get("/:id", protect, getOrderById);

// Cancel order
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;