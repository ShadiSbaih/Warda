import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { WardaCard, WardaText } from "../ui";
import { useCart } from "../../context/CartContext";

export default function PriceSummary({ customDeliveryFee }: { customDeliveryFee?: number }) {
  const { theme } = useTheme();
  const { subtotal, discount, appliedPromo, wrappingTotal, total, deliveryFee } = useCart();
  const activeDeliveryFee = customDeliveryFee !== undefined ? customDeliveryFee : deliveryFee;
  const grandTotal = Math.max(0, subtotal - discount + activeDeliveryFee + wrappingTotal);

  const Row = ({
    label,
    value,
    valueColor,
  }: {
    label: string;
    value: string;
    valueColor?: string;
  }) => (
    <View style={styles.row}>
      <WardaText variant="body" color={theme.colors.textMuted}>
        {label}
      </WardaText>
      <WardaText variant="body" weight="bold" color={valueColor || theme.colors.text}>
        {value}
      </WardaText>
    </View>
  );

  return (
    <WardaCard style={{ marginBottom: 20 }}>
      <View style={styles.header}>
        <WardaText variant="h3">Price Summary</WardaText>
        <WardaText variant="caption" weight="bold" color={theme.colors.brand}>
          Express 30–45 mins
        </WardaText>
      </View>
      <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
      <Row label="Items Subtotal" value={`$${subtotal.toFixed(2)}`} />
      {wrappingTotal > 0 && (
        <Row label="Luxury Gift Wrapping" value={`$${wrappingTotal.toFixed(2)}`} />
      )}
      <Row
        label="Express Delivery"
        value={activeDeliveryFee === 0 ? "FREE" : `$${activeDeliveryFee.toFixed(2)}`}
      />
      {discount > 0 && (
        <Row label={`Discount (${appliedPromo?.code})`} value={`-$${discount.toFixed(2)}`} valueColor={theme.colors.success} />
      )}
      <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
      <View style={styles.row}>
        <WardaText variant="body" weight="extrabold">
          Total Amount
        </WardaText>
        <WardaText variant="h2" color={theme.colors.brand}>
          ${grandTotal.toFixed(2)}
        </WardaText>
      </View>
    </WardaCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});
