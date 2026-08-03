import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { useCart } from "../../context/CartContext";

interface PriceSummaryProps {
  customDeliveryFee?: number;
}

export default function PriceSummary({ customDeliveryFee }: PriceSummaryProps) {
  const { subtotal, discount, appliedPromo, wrappingTotal, total, deliveryFee } = useCart();
  const activeDeliveryFee = customDeliveryFee !== undefined ? customDeliveryFee : deliveryFee;
  const grandTotal = Math.max(0, subtotal - discount + activeDeliveryFee + wrappingTotal);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Price Summary</Text>
        <Text style={styles.time}>Express 30–45 mins</Text>
      </View>

      <View style={styles.divider} />

      {/* Subtotal */}
      <View style={styles.row}>
        <Text style={styles.label}>Items Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>

      {/* Wrapping */}
      {wrappingTotal > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Luxury Gift Wrapping</Text>
          <Text style={styles.value}>${wrappingTotal.toFixed(2)}</Text>
        </View>
      )}

      {/* Delivery Fee */}
      <View style={styles.row}>
        <Text style={styles.label}>Express Delivery</Text>
        <Text style={styles.value}>
          {activeDeliveryFee === 0 ? "FREE" : `$${activeDeliveryFee.toFixed(2)}`}
        </Text>
      </View>

      {/* Discount */}
      {discount > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, { color: "#10B981" }]}>
            Discount ({appliedPromo?.code})
          </Text>
          <Text style={styles.discount}>-${discount.toFixed(2)}</Text>
        </View>
      )}

      <View style={styles.divider} />

      {/* Total */}
      <View style={styles.row}>
        <Text style={styles.totalText}>Total Amount</Text>
        <Text style={styles.totalPrice}>${grandTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 20,
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  time: {
    fontSize: 13,
    color: RainbowColors.tangerine,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: RainbowColors.cloudSurface,
    marginVertical: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: RainbowColors.stone,
    fontWeight: "500",
  },
  value: {
    fontSize: 14.5,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  discount: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#10B981",
  },
  totalText: {
    fontSize: 17,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: RainbowColors.tangerine,
  },
});