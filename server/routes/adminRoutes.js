const express = require("express");

const {
  getAllUsers,
  getAllCooks,
  getAllOrders,
  getAllSubscriptions,
  getAllComplaints,
  resolveComplaint,
} = require("../controllers/adminController");

const { verifyCook } = require("../controllers/cookController");

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin-only routes
router.get("/users", protect, adminMiddleware, getAllUsers);
router.get("/cooks", protect, adminMiddleware, getAllCooks);
router.get("/orders", protect, adminMiddleware, getAllOrders);

router.put(
  "/cooks/:id/verify",
  protect,
  adminMiddleware,
  verifyCook
);

router.get(
  "/subscriptions",
  protect,
  adminMiddleware,
  getAllSubscriptions
);

// Complaint management
router.get("/complaints", protect, adminMiddleware, getAllComplaints);
router.put(
  "/complaints/:id/resolve",
  protect,
  adminMiddleware,
  resolveComplaint
);

module.exports = router;