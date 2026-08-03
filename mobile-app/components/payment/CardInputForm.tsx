import React, {
  useRef,
  useState,

} from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import MockStripe, {
  CardDetails,
  detectBrand,
  formatCardNumber,
  formatExpiry,
  validateCard,
} from "../../services/mockStripe";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CardFormRef {
  /** Returns validated CardDetails or throws */
  getCardDetails: () => CardDetails;
}

interface Props {
  /** Called after a successful confirm — receives transactionId & last4 */
  onSuccess: (result: {
    transactionId: string;
    last4: string;
    brand: string;
    paymentIntentId: string;
  }) => void;
  onError?: (message: string) => void;
  /** Amount in dollars to display and charge */
  amount: number;
  currency?: string;
}

// ── Brand icon mapping ────────────────────────────────────────────────────────
function BrandIcon({ brand }: { brand: string }) {
  if (brand === "Visa")
    return <FontAwesome5 name="cc-visa" size={22} color="#1A1F71" />;
  if (brand === "Mastercard")
    return <FontAwesome5 name="cc-mastercard" size={22} color="#EB001B" />;
  if (brand === "Amex")
    return <FontAwesome5 name="cc-amex" size={22} color="#007BC1" />;
  if (brand === "Discover")
    return <FontAwesome5 name="cc-discover" size={22} color="#F76F20" />;
  return <MaterialCommunityIcons name="credit-card-outline" size={22} color="#BDBDBD" />;
}

// ── Field component ───────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  value: string;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "number-pad";
  maxLength?: number;
  error?: string;
  secureTextEntry?: boolean;
  onChangeText: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  inputRef?: React.RefObject<TextInput | null>;
  onSubmitEditing?: () => void;
  returnKeyType?: "next" | "done";
  autoFocus?: boolean;
}

function Field({
  label,
  value,
  placeholder,
  keyboardType = "default",
  maxLength,
  error,
  secureTextEntry,
  onChangeText,
  onFocus,
  onBlur,
  inputRef,
  onSubmitEditing,
  returnKeyType = "next",
  autoFocus,
}: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={fieldStyles.wrapper}>
      <Text style={fieldStyles.label}>{label}</Text>
      <View
        style={[
          fieldStyles.inputBox,
          focused && fieldStyles.inputBoxFocused,
          error ? fieldStyles.inputBoxError : null,
        ]}
      >
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#C0C0C0"
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          autoComplete="off"
          autoCorrect={false}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          style={fieldStyles.input}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />
      </View>
      {error ? <Text style={fieldStyles.error}>{error}</Text> : null}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  inputBox: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E8E8E8",
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  inputBoxFocused: {
    borderColor: RainbowColors.tangerine,
    backgroundColor: "#FFF5F9",
  },
  inputBoxError: {
    borderColor: "#FF4444",
    backgroundColor: "#FFF5F5",
  },
  input: {
    fontSize: 16,
    color: "#1A1A1A",
    fontWeight: "500",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "#FF4444",
    fontWeight: "500",
  },
});

// ── Main Card Form ────────────────────────────────────────────────────────────

export default function CardInputForm({ onSuccess, onError, amount, currency = "usd" }: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const expiryRef = useRef<TextInput>(null);
  const cvcRef = useRef<TextInput>(null);

  const brand = detectBrand(cardNumber);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): CardDetails | null => {
    const newErrors: Record<string, string> = {};
    const rawNumber = cardNumber.replace(/\s/g, "");

    if (!holderName.trim()) newErrors.holderName = "Cardholder name is required.";

    const [mm, yy] = expiry.split("/");
    const exp_month = parseInt(mm ?? "", 10);
    const exp_year = yy ? 2000 + parseInt(yy, 10) : 0;

    const card: CardDetails = {
      number: rawNumber,
      exp_month,
      exp_year,
      cvc: cvc.trim(),
      holder_name: holderName.trim(),
    };

    const cardErr = validateCard(card);
    if (cardErr) {
      // Map to field-level
      if (cardErr.toLowerCase().includes("number")) newErrors.cardNumber = cardErr;
      else if (cardErr.toLowerCase().includes("expir") || cardErr.toLowerCase().includes("month")) newErrors.expiry = cardErr;
      else if (cardErr.toLowerCase().includes("cvc")) newErrors.cvc = cardErr;
    }

    if (!expiry || expiry.length < 5) newErrors.expiry = "Enter a valid expiry date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? card : null;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handlePay = async () => {
    const card = validate();
    if (!card) return;

    setLoading(true);
    try {
      // 1. Create intent
      const { paymentIntentId } = await MockStripe.createPaymentIntent(amount, currency);

      // 2. Confirm (charge)
      const result = await MockStripe.confirmPaymentIntent(paymentIntentId, card);

      setSuccess(true);
      onSuccess({
        transactionId: result.transactionId,
        last4: result.last4,
        brand: result.brand,
        paymentIntentId,
      });
    } catch (err: any) {
      const msg = err?.message ?? "Payment failed. Please try again.";
      onError?.(msg);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  if (success) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Feather name="check-circle" size={48} color="#4CAF50" />
        </View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSub}>
          Your order has been placed and payment confirmed.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Card preview strip */}
      <View style={styles.cardPreview}>
        <BrandIcon brand={brand} />
        <Text style={styles.cardPreviewNumber}>
          {cardNumber || "•••• •••• •••• ••••"}
        </Text>
      </View>

      {/* Fields */}
      <Field
        label="Cardholder Name"
        value={holderName}
        placeholder="Jane Doe"
        onChangeText={setHolderName}
        error={errors.holderName}
        onSubmitEditing={() => expiryRef.current?.focus()}
        returnKeyType="next"
      />

      <Field
        label="Card Number"
        value={cardNumber}
        placeholder="1234 5678 9012 3456"
        keyboardType="number-pad"
        maxLength={23}
        onChangeText={(v) => {
          const formatted = formatCardNumber(v);
          setCardNumber(formatted);
          if (formatted.replace(/\s/g, "").length >= 16) {
            expiryRef.current?.focus();
          }
        }}
        error={errors.cardNumber}
        onSubmitEditing={() => expiryRef.current?.focus()}
      />

      {/* Expiry + CVC row */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Field
            label="Expiry Date"
            value={expiry}
            placeholder="MM/YY"
            keyboardType="number-pad"
            maxLength={5}
            inputRef={expiryRef}
            onChangeText={(v) => {
              setExpiry(formatExpiry(v));
              if (v.replace(/\D/g, "").length >= 4) {
                cvcRef.current?.focus();
              }
            }}
            error={errors.expiry}
            onSubmitEditing={() => cvcRef.current?.focus()}
          />
        </View>
        <View style={styles.half}>
          <Field
            label="CVC"
            value={cvc}
            placeholder="123"
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
            inputRef={cvcRef}
            onChangeText={setCvc}
            error={errors.cvc}
            returnKeyType="done"
            onSubmitEditing={handlePay}
          />
        </View>
      </View>

      {/* General error */}
      {errors.general ? (
        <View style={styles.errorBanner}>
          <Feather name="alert-circle" size={16} color="#FF4444" />
          <Text style={styles.errorBannerText}>{errors.general}</Text>
        </View>
      ) : null}

      {/* Pay Button */}
      <TouchableOpacity
        activeOpacity={0.88}
        style={[styles.payButton, loading && styles.payButtonLoading]}
        onPress={handlePay}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={RainbowColors.pureWhite} />
        ) : (
          <>
            <Feather name="lock" size={18} color={RainbowColors.pureWhite} style={{ marginRight: 8 }} />
            <Text style={styles.payButtonText}>
              Pay ${amount.toFixed(2)}
            </Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.secureNote}>
        🔒 Payments are processed securely on your server
      </Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },

  cardPreview: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A2E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  cardPreviewNumber: {
    flex: 1,
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },
  half: {
    flex: 1,
  },

  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF0F0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#FFD0D0",
  },
  errorBannerText: {
    flex: 1,
    color: "#CC0000",
    fontSize: 13,
    fontWeight: "500",
  },

  payButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: RainbowColors.tangerine,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  payButtonLoading: {
    opacity: 0.7,
  },
  payButtonText: {
    color: RainbowColors.pureWhite,
    fontSize: 18,
    fontWeight: "700",
  },

  secureNote: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 12,
    color: RainbowColors.stone,
    fontWeight: "500",
  },

  // Success
  successContainer: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 12,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F0FFF4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  successSub: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});
