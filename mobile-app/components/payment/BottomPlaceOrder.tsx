import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
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
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import MockStripe from "../../services/mockStripe";

interface Props {
  amount?: number;
  paymentMethod?: "apple" | "card_saved" | "card_new";
  paymentIntentId?: string;
  checkoutState?: any;
}

export default function BottomPlaceOrder({
  amount,
  paymentMethod = "apple",
  paymentIntentId,
  checkoutState = {},
}: Props) {
  const router = useRouter();
  const { items, total, clearCart, appliedPromo, deliveryFee } = useCart();
  const { createOrder } = useOrders();
  const [loading, setLoading] = useState(false);

  const finalAmount = amount !== undefined ? amount : (total > 0 ? total : 85.0);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      if (paymentMethod !== "card_new") {
        const { paymentIntentId: piId } = await MockStripe.createPaymentIntent(finalAmount);
        await MockStripe.confirmPaymentIntent(piId, {
          number: "4242424242424242",
          exp_month: 12,
          exp_year: new Date().getFullYear() + 2,
          cvc: "123",
          holder_name: "Warda VIP Customer",
        });
      }

      // Record order in OrdersContext
      const orderItems = items.length > 0 ? items : [
        {
          id: "fallback-item-1",
          productId: 1,
          title: "Velvet Red Roses Bouquet",
          price: 85.0,
          image: require("../../assets/gifts/red-roses.png"),
          quantity: 1,
          wrappingColor: "#E53935",
          wrappingName: "Velvet Red",
          category: "Rose Bouquets",
        },
      ];

      const newOrder = await createOrder({
        items: orderItems,
        total: finalAmount,
        address: checkoutState?.deliveryAddress || "King Fahd Branch Rd, Building 42, Apt 301, Riyadh",
        paymentMethod:
          paymentMethod === "apple"
            ? "Apple Pay"
            : paymentMethod === "card_saved"
            ? "Saved Visa (•••• 4242)"
            : "Credit Card (Mock Stripe)",
        recipientName: checkoutState?.recipientName || "Sarah Al-Otaibi",
        giftMessage: checkoutState?.giftMessage || checkoutState?.giftNote || "A special gift filled with love and elegance. 🌸",
        isAnonymous: checkoutState?.isAnonymous || false,
      });

      clearCart();

      // Navigate to tracking
      router.replace({
        pathname: "/tracking",
        params: { orderId: newOrder.id },
      });
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
        <Text style={styles.label}>Total Amount</Text>
        <Text style={styles.price}>${finalAmount.toFixed(2)}</Text>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.button, loading && styles.buttonLoading]}
        onPress={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={RainbowColors.pureWhite} />
        ) : (
          <>
            <Text style={styles.buttonText}>Confirm & Place Order</Text>
            <Feather name="arrow-right" size={22} color={RainbowColors.pureWhite} />
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
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  price: {
    fontSize: 28,
    fontWeight: "900",
    color: RainbowColors.tangerine,
  },
  button: {
    height: 58,
    borderRadius: 29,
    backgroundColor: RainbowColors.tangerine,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  buttonLoading: {
    opacity: 0.75,
  },
  buttonText: {
    color: RainbowColors.pureWhite,
    fontSize: 17,
    fontWeight: "700",
  },
});