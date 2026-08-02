import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import MockStripe from "../../services/mockStripe";

interface Props {
  /** Total order amount in dollars */
  amount?: number;
  /** Selected payment method key */
  paymentMethod?: "apple" | "card_saved" | "card_new";
  /** For non-card methods that don't open a modal, call MockStripe directly */
  paymentIntentId?: string;
}

export default function BottomPlaceOrder({
  amount = 23.0,
  paymentMethod = "apple",
  paymentIntentId,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    // If paying by card via new-card flow, the CardInputForm already handled
    // the confirm step. Just navigate to tracking.
    if (paymentMethod === "card_new") {
      router.push("/tracking");
      return;
    }

    // For Apple Pay / saved card: simulate a quick mock charge
    setLoading(true);
    try {
      const { paymentIntentId: piId } = await MockStripe.createPaymentIntent(amount);

      // Simulate a generic stored card confirm (no real card details needed for Apple Pay mock)
      await MockStripe.confirmPaymentIntent(piId, {
        number: "4242424242424242", // Visa test card (always succeeds)
        exp_month: 12,
        exp_year: new Date().getFullYear() + 2,
        cvc: "123",
        holder_name: "Mock Wallet",
      });

      router.push("/tracking");
    } catch (err: any) {
      Alert.alert(
        "Payment Failed",
        err?.message ?? "Unable to process payment. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Total */}
      <View style={styles.priceContainer}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.price}>${amount.toFixed(2)}</Text>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.button, loading && styles.buttonLoading]}
        onPress={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <Text style={styles.buttonText}>Place Order</Text>
            <Feather name="arrow-right" size={22} color="#FFFFFF" />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 40,
  },

  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },

  price: {
    fontSize: 30,
    fontWeight: "800",
    color: "#D4588A",
  },

  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D4588A",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  buttonLoading: {
    opacity: 0.75,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 10,
  },
});