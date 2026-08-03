import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  price: number;
  onAddToCart?: () => void;
}

export default function BottomCheckout({
  price,
  onAddToCart,
}: Props) {
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
            color={RainbowColors.tangerine}
          />
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {quantity}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={increase}
        >
          <Ionicons
            name="add"
            size={22}
            color={RainbowColors.tangerine}
          />
        </TouchableOpacity>
      </View>

      {/* Add To Cart */}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={onAddToCart}
      >
        <Text style={styles.cartText}>
          Add To Cart • ${total.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: RainbowColors.pureWhite,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: RainbowColors.tangerine,
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
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: 20,
    paddingHorizontal: 8,
    height: 52,
  },

  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: RainbowColors.pureWhite,
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
    color: RainbowColors.inkBlack,
  },

  cartButton: {
    flex: 1,
    marginLeft: 14,
    height: 52,
    borderRadius: 20,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },

  cartText: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});