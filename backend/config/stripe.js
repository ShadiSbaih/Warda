/**
 * Mock Stripe Service
 *
 * Replaces the real Stripe SDK with an in-process mock that mimics
 * the Stripe PaymentIntents API surface end-to-end.
 * No external network calls are made.
 */

const crypto = require("crypto");

// ── Helpers ──────────────────────────────────────────────────────────────────

const uid = (prefix = "mock") =>
  `${prefix}_${crypto.randomBytes(12).toString("hex")}`;

// In-memory store (survives only for the process lifetime;
// replace with a DB collection if you need persistence across restarts)
const _store = new Map();

// ── Payment Intents ───────────────────────────────────────────────────────────

const paymentIntents = {
  /**
   * Create a PaymentIntent.
   * @param {{ amount: number, currency: string, metadata?: object }} params
   */
  create: async (params = {}) => {
    const { amount, currency = "usd", metadata = {} } = params;
    if (!amount || amount <= 0) {
      throw new Error("Amount must be a positive integer (cents).");
    }

    const id = uid("pi");
    const clientSecret = `${id}_secret_${uid("")}`;

    const intent = {
      id,
      object: "payment_intent",
      amount,
      currency,
      status: "requires_payment_method",
      client_secret: clientSecret,
      metadata,
      created: Math.floor(Date.now() / 1000),
      livemode: false,
      last_payment_error: null,
      charges: [],
    };

    _store.set(id, intent);
    return intent;
  },

  /**
   * Retrieve a PaymentIntent.
   */
  retrieve: async (id) => {
    const intent = _store.get(id);
    if (!intent) {
      throw new Error(`No PaymentIntent found with id '${id}'.`);
    }
    return { ...intent };
  },

  /**
   * Confirm a PaymentIntent (attach a payment method and transition to succeeded).
   * Simulates realistic decline logic based on last-4 digits of the card number.
   */
  confirm: async (id, params = {}) => {
    const intent = _store.get(id);
    if (!intent) {
      throw new Error(`No PaymentIntent found with id '${id}'.`);
    }

    const { payment_method_data } = params;
    const last4 = payment_method_data?.card?.number?.slice(-4) ?? "0000";
    const expMonth = payment_method_data?.card?.exp_month ?? 12;
    const expYear = payment_method_data?.card?.exp_year ?? 2030;
    const cvc = payment_method_data?.card?.cvc ?? "000";

    // Simulate test-card decline scenarios
    if (last4 === "0002") {
      intent.status = "requires_payment_method";
      intent.last_payment_error = {
        code: "card_declined",
        message: "Your card was declined.",
        decline_code: "generic_decline",
      };
      _store.set(id, intent);
      throw new Error("Your card was declined.");
    }

    if (last4 === "0341") {
      intent.status = "requires_payment_method";
      intent.last_payment_error = {
        code: "insufficient_funds",
        message: "Your card has insufficient funds.",
      };
      _store.set(id, intent);
      throw new Error("Your card has insufficient funds.");
    }

    // Attach payment method
    const pmId = uid("pm");
    intent.status = "succeeded";
    intent.last_payment_error = null;
    intent.payment_method = {
      id: pmId,
      object: "payment_method",
      type: "card",
      card: {
        last4,
        exp_month: expMonth,
        exp_year: expYear,
        brand: _detectBrand(last4),
      },
    };
    intent.charges = [
      {
        id: uid("ch"),
        amount: intent.amount,
        currency: intent.currency,
        paid: true,
        refunded: false,
        status: "succeeded",
      },
    ];

    _store.set(id, intent);
    return { ...intent };
  },

  /**
   * Refund a PaymentIntent's charge (full or partial).
   */
  refund: async (id, params = {}) => {
    const intent = _store.get(id);
    if (!intent) {
      throw new Error(`No PaymentIntent found with id '${id}'.`);
    }
    if (intent.status !== "succeeded") {
      throw new Error(
        "Only succeeded PaymentIntents can be refunded."
      );
    }

    const refundAmount = params.amount ?? intent.amount;
    const charge = intent.charges[0];
    charge.refunded = true;
    charge.amount_refunded = refundAmount;
    intent.status = "canceled";
    _store.set(id, intent);

    return {
      id: uid("re"),
      object: "refund",
      amount: refundAmount,
      currency: intent.currency,
      payment_intent: id,
      status: "succeeded",
    };
  },

  /**
   * Cancel a PaymentIntent.
   */
  cancel: async (id) => {
    const intent = _store.get(id);
    if (!intent) {
      throw new Error(`No PaymentIntent found with id '${id}'.`);
    }
    intent.status = "canceled";
    _store.set(id, intent);
    return { ...intent };
  },

  /**
   * Update metadata on a PaymentIntent.
   */
  update: async (id, params = {}) => {
    const intent = _store.get(id);
    if (!intent) {
      throw new Error(`No PaymentIntent found with id '${id}'.`);
    }
    Object.assign(intent, params);
    _store.set(id, intent);
    return { ...intent };
  },
};

// ── Brand detection ───────────────────────────────────────────────────────────
function _detectBrand(last4) {
  // Trivial heuristic; replace with BIN-range detection if needed.
  const n = parseInt(last4, 10);
  if (n >= 0 && n <= 2499) return "visa";
  if (n >= 2500 && n <= 4999) return "mastercard";
  if (n >= 5000 && n <= 7499) return "amex";
  return "unknown";
}

// ── Export (same surface as the Stripe SDK object) ────────────────────────────
module.exports = {
  paymentIntents,
  // Expose store for admin/debug endpoints if needed
  _store,
};