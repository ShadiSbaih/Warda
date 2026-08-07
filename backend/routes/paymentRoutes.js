const express = require("express");
const { body, param } = require("express-validator");
const { isMongoId } = require("mongoose").Types.ObjectId;

const router = express.Router();

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");
const handleValidationErrors = require("../middleware/validate");

const {
  createPayment,
  getPayments,
  getPayment,
  updatePaymentStatus,
} = require("../controllers/paymentController");

const createValidators = [
  body("order").isMongoId().withMessage("Valid order id is required"),
  body("amount").optional().isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
  body("paymentMethod").optional().isIn(["Card", "Cash", "Wallet"]).withMessage("Invalid payment method"),
];

const idParamValidator = [
  param("id").isMongoId().withMessage("Invalid payment id"),
];

const statusValidators = [
  param("id").isMongoId().withMessage("Invalid payment id"),
  body("status").isIn(["Pending", "Paid", "Failed", "Refunded"]).withMessage("Invalid payment status"),
];

router.post("/", protect, createValidators, handleValidationErrors, createPayment);
router.get("/", protect, getPayments);
router.get("/:id", protect, idParamValidator, handleValidationErrors, getPayment);
router.put("/:id/status", protect, admin, statusValidators, handleValidationErrors, updatePaymentStatus);

module.exports = router;
