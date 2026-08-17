const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const admin = require("../middleware/admin");
const delivery = require("../middleware/delivery");

const {
  createOrder,
  getOrders,
  getOrder,
  updateStatus,
  updatePaymentStatus,
  cancelOrder,
  getAllOrders,
  getDeliveryOrders,
} = require("../controllers/orderController");

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/all", protect, admin, getAllOrders);
router.get("/delivery", protect, delivery, getDeliveryOrders);
router.get("/:id", protect, getOrder);

// User can cancel their own order before preparation
router.patch("/:id/cancel", protect, cancelOrder);

// Admin order management
router.patch("/:id/status", protect, admin, updateStatus);
router.patch("/:id/delivery-status", protect, delivery, updateStatus);
router.patch("/:id/payment", protect, admin, updatePaymentStatus);

module.exports = router;
