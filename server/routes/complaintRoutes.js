const express = require("express");

const {
  createComplaint,
  getMyComplaints,
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Submit complaint
router.post("/", protect, createComplaint);

// Get logged-in user's complaints
router.get("/", protect, getMyComplaints);

module.exports = router;