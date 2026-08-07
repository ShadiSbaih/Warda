const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  updateDriverLocation,
  getDriverLocation,
  updateTracking,
} = require("../controllers/trackingController");

// Admin updates driver location
router.put("/:id/location", protect, admin, updateDriverLocation);

// Customer / admin fetches current driver location
router.get("/:id/location", protect, getDriverLocation);

// Admin updates tracking status (legacy route kept for compatibility)
router.put("/:id", protect, admin, updateTracking);

module.exports = router;
