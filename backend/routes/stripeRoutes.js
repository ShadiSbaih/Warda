const express = require("express");
const router = express.Router();

const {
  createPaymentIntent,
  retrievePaymentIntent,
  confirmPaymentIntent,
  refundPaymentIntent,
  cancelPaymentIntent,
} = require("../controllers/stripeController");

// POST   /api/stripe/payment-intent              → create
router.post("/payment-intent", createPaymentIntent);

// GET    /api/stripe/payment-intent/:id          → retrieve
router.get("/payment-intent/:id", retrievePaymentIntent);

// POST   /api/stripe/payment-intent/:id/confirm  → confirm (charge card)
router.post("/payment-intent/:id/confirm", confirmPaymentIntent);

// POST   /api/stripe/payment-intent/:id/refund   → refund
router.post("/payment-intent/:id/refund", refundPaymentIntent);

// POST   /api/stripe/payment-intent/:id/cancel   → cancel
router.post("/payment-intent/:id/cancel", cancelPaymentIntent);

module.exports = router;