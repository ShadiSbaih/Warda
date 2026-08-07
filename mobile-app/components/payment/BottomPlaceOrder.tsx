import { useTheme } from "@/context/ThemeContext";
import { WardaButton, WardaText } from "@/components/ui";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";

interface Props {
  checkoutState?: {
    recipientName?: string;
    recipientPhone?: string;
    giftNote?: string;
    isAnonymous?: boolean;
    selectedSlot?: string;
    deliveryAddress?: string;
  };
}

export default function BottomPlaceOrder({ checkoutState = {} }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { items, total, subtotal, discount, deliveryFee, wrappingTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [loading, setLoading] = useState(false);

  const finalAmount = total > 0 ? total : 0;

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      Alert.alert("Empty Bag", "Add at least one gift before placing the order.");
      return;
    }

    setLoading(true);
    try {
      const newOrder = await placeOrder({
        items,
        subtotal,
        discount,
        deliveryFee,
        wrappingTotal,
        total: finalAmount,
        deliveryAddress: {
          address: checkoutState.deliveryAddress || "King Fahd Road, Al Olaya, Riyadh",
        },
        deliveryTimeSlot: checkoutState.selectedSlot || "Express Now",
        recipientName: checkoutState.recipientName,
        giftMessage: checkoutState.giftNote,
        isAnonymous: checkoutState.isAnonymous,
      });

      clearCart();

      router.replace({
        pathname: "/tracking",
        params: { orderId: newOrder.id },
      });
    } catch (err: any) {
      Alert.alert(
        "Order Failed",
        err?.message ?? "Unable to place order. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <WardaText style={styles.label}>Total Amount</WardaText>
        <WardaText style={styles.price}>${finalAmount.toFixed(2)}</WardaText>
      </View>

      <WardaButton
        title="Confirm & Place Order"
        iconRight="arrow-right"
        size="lg"
        loading={loading}
        disabled={loading}
        onPress={handlePlaceOrder}
      />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
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
    color: theme.colors.brand,
  },
});
