/**
 * Mock Stripe API Service (Mobile)
 *
 * Mirrors the Stripe SDK's PaymentIntents surface but routes through
 * your own backend mock, so no Stripe account or publishable key is needed.
 *
 * Usage:
 *   const { clientSecret, paymentIntentId } = await MockStripe.createPaymentIntent(23.50);
 *   const result = await MockStripe.confirmPaymentIntent(paymentIntentId, cardDetails);
 */

const BASE_URL =
  (process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api") + "/stripe";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CardDetails {
  /** Full card number (digits only, spaces allowed) */
  number: string;
  exp_month: number;
  exp_year: number;
  /** 3–4 digit CVC */
  cvc: string;
  holder_name?: string;
}

export interface CreateIntentResult {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
}

export interface ConfirmResult {
  transactionId: string;
  last4: string;
  brand: string;
  status: "succeeded" | "requires_payment_method" | string;
}

export interface RefundResult {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function apiCall<T>(
  path: string,
  method: "GET" | "POST" = "GET",
  body?: object
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message ?? `Request failed (${res.status})`);
  }

  return data as T;
}

// ── Client validation (runs before network call) ──────────────────────────────

export function validateCard(card: CardDetails): string | null {
  const digits = card.number.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digits)) return "Invalid card number.";
  if (!luhnCheck(digits)) return "Card number is invalid.";
  if (card.exp_month < 1 || card.exp_month > 12) return "Invalid expiry month.";
  const now = new Date();
  if (
    card.exp_year < now.getFullYear() ||
    (card.exp_year === now.getFullYear() && card.exp_month < now.getMonth() + 1)
  ) {
    return "Your card is expired.";
  }
  if (!/^\d{3,4}$/.test(card.cvc)) return "Invalid CVC.";
  return null;
}

function luhnCheck(num: string): boolean {
  let sum = 0;
  let odd = true;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    if (!odd) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    odd = !odd;
  }
  return sum % 10 === 0;
}

/** Detect card brand from number prefix */
export function detectBrand(number: string): string {
  const n = number.replace(/\s/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-6]|7[01])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^6(?:011|5)/.test(n)) return "Discover";
  return "Unknown";
}

/** Format card number with spaces every 4 digits */
export function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

/** Format expiry as MM/YY */
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

// ── Public API ────────────────────────────────────────────────────────────────

const MockStripe = {
  /**
   * Step 1 — Create a PaymentIntent.
   * @param amount  Amount in dollars (e.g. 23.50)
   * @param currency  ISO currency code (default: "usd")
   */
  createPaymentIntent: async (
    amount: number,
    currency = "usd"
  ): Promise<CreateIntentResult> => {
    return apiCall<CreateIntentResult>("/payment-intent", "POST", {
      amount,
      currency,
    });
  },

  /**
   * Step 2 — Confirm the PaymentIntent with card details (charge the card).
   */
  confirmPaymentIntent: async (
    paymentIntentId: string,
    card: CardDetails
  ): Promise<ConfirmResult> => {
    // Client-side validation before hitting the network
    const err = validateCard(card);
    if (err) throw new Error(err);

    return apiCall<ConfirmResult>(
      `/payment-intent/${paymentIntentId}/confirm`,
      "POST",
      { card }
    );
  },

  /**
   * Retrieve the current state of a PaymentIntent.
   */
  retrievePaymentIntent: async (paymentIntentId: string) => {
    return apiCall(`/payment-intent/${paymentIntentId}`);
  },

  /**
   * Refund a succeeded PaymentIntent (full or partial).
   * @param amount  Optional partial refund in dollars.
   */
  refundPaymentIntent: async (
    paymentIntentId: string,
    amount?: number
  ): Promise<RefundResult> => {
    return apiCall<RefundResult>(
      `/payment-intent/${paymentIntentId}/refund`,
      "POST",
      { amount }
    );
  },

  /**
   * Cancel a PaymentIntent that hasn't been confirmed yet.
   */
  cancelPaymentIntent: async (paymentIntentId: string) => {
    return apiCall(`/payment-intent/${paymentIntentId}/cancel`, "POST");
  },
};

export default MockStripe;
