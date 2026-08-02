/**
 * Mock Stripe Controller
 *
 * Exposes a Stripe-compatible PaymentIntents lifecycle over HTTP:
 *   POST   /stripe/payment-intent          → create
 *   GET    /stripe/payment-intent/:id      → retrieve
 *   POST   /stripe/payment-intent/:id/confirm  → confirm (attach card + charge)
 *   POST   /stripe/payment-intent/:id/refund   → refund
 *   POST   /stripe/payment-intent/:id/cancel   → cancel
 *
 * No real Stripe account or key is required.
 */

const mockStripe = require("../config/stripe");

// ── Create ────────────────────────────────────────────────────────────────────

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = "usd", metadata } = req.body;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount. Must be a positive number (in dollars).",
      });
    }

    // Convert dollars → cents (same as real Stripe)
    const paymentIntent = await mockStripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      metadata,
    });

    res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Retrieve ──────────────────────────────────────────────────────────────────

exports.retrievePaymentIntent = async (req, res) => {
  try {
    const intent = await mockStripe.paymentIntents.retrieve(req.params.id);
    res.json({ success: true, paymentIntent: intent });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// ── Confirm ───────────────────────────────────────────────────────────────────

exports.confirmPaymentIntent = async (req, res) => {
  try {
    const { card } = req.body; // { number, exp_month, exp_year, cvc, holder_name }

    if (!card || !card.number || !card.exp_month || !card.exp_year || !card.cvc) {
      return res.status(400).json({
        success: false,
        message: "Card details are required: number, exp_month, exp_year, cvc.",
      });
    }

    // Basic card validation
    const sanitizedNumber = card.number.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(sanitizedNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid card number.",
      });
    }

    if (card.exp_month < 1 || card.exp_month > 12) {
      return res.status(400).json({
        success: false,
        message: "Invalid expiry month.",
      });
    }

    const currentYear = new Date().getFullYear();
    if (card.exp_year < currentYear) {
      return res.status(400).json({
        success: false,
        message: "Card is expired.",
      });
    }

    const intent = await mockStripe.paymentIntents.confirm(req.params.id, {
      payment_method_data: {
        card: {
          number: sanitizedNumber,
          exp_month: card.exp_month,
          exp_year: card.exp_year,
          cvc: card.cvc,
        },
      },
    });

    res.json({
      success: true,
      paymentIntent: intent,
      transactionId: intent.charges[0]?.id,
      last4: intent.payment_method?.card?.last4,
      brand: intent.payment_method?.card?.brand,
      status: intent.status,
    });
  } catch (error) {
    // Card declined or similar
    res.status(402).json({ success: false, message: error.message });
  }
};

// ── Refund ────────────────────────────────────────────────────────────────────

exports.refundPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // optional partial refund in cents
    const refund = await mockStripe.paymentIntents.refund(req.params.id, {
      amount: amount ? Math.round(Number(amount) * 100) : undefined,
    });

    res.json({ success: true, refund });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ── Cancel ────────────────────────────────────────────────────────────────────

exports.cancelPaymentIntent = async (req, res) => {
  try {
    const intent = await mockStripe.paymentIntents.cancel(req.params.id);
    res.json({ success: true, paymentIntent: intent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};