const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  createOrder,
  getOrders,
  getOrder,
  updateStatus,
  getAllOrders,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/all", protect, admin, getAllOrders);
router.get("/:id", protect, getOrder);
router.patch("/:id/status", protect, admin, updateStatus);
router.put("/:id/status", protect, admin, updateStatus);

module.exports = router;