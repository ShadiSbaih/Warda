import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  price: number;
  onAddToCart?: () => void;
}

export default function BottomCheckout({
  price,
  onAddToCart,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [quantity, setQuantity] = useState(1);

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const total = price * quantity;

  return (
    <View style={styles.container}>
      {/* Quantity */}

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={decrease}
        >
          <Ionicons
            name="remove"
            size={22}
            color={theme.colors.brand}
          />
        </TouchableOpacity>

        <WardaText style={styles.quantity}>
          {quantity}
        </WardaText>

        <TouchableOpacity
          style={styles.button}
          onPress={increase}
        >
          <Ionicons
            name="add"
            size={22}
            color={theme.colors.brand}
          />
        </TouchableOpacity>
      </View>

      {/* Add To Cart */}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={onAddToCart}
      >
        <WardaText style={styles.cartText}>
          Add To Cart • ${total.toFixed(2)}
        </WardaText>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 18,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    paddingHorizontal: 8,
    height: 52,
  },

  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 2,
  },

  quantity: {
    marginHorizontal: 16,
    fontSize: 17,
    fontWeight: "800",
    color: theme.colors.text,
  },

  cartButton: {
    flex: 1,
    marginLeft: 14,
    height: 52,
    borderRadius: 20,
    backgroundColor: theme.colors.brand,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },

  cartText: {
    color: theme.colors.textInverse,
    fontSize: 16,
    fontWeight: "700",
  },
});