import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Feather } from "@expo/vector-icons";

export default function OrderSummaryCard() {
  const [qty, setQty] = useState(1);

  return (
    <View style={styles.container}>
      {/* 3D inset gloss — top-edge white shimmer, inflated-card effect */}
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      {/* Product */}

      <View style={styles.top}>
        <Image
          source={require("../../assets/gifts/red-roses.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.info}>
          <Text style={styles.title}>
            Red Roses Bouquet
          </Text>

          <Text style={styles.description}>
            Luxury bouquet of natural red roses
          </Text>
        </View>

        <Text style={styles.price}>
          $12.50
        </Text>
      </View>

      {/* Quantity */}

      <View style={styles.quantityRow}>
        <View style={styles.quantity}>
          <TouchableOpacity
            onPress={() =>
              qty > 1 && setQty(qty - 1)
            }
          >
            <Feather
              name="minus"
              size={18}
              color={RainbowColors.stone}
            />
          </TouchableOpacity>

          <Text style={styles.qty}>
            {qty}
          </Text>

          <TouchableOpacity
            onPress={() => setQty(qty + 1)}
          >
            <Feather
              name="plus"
              size={18}
              color={RainbowColors.stone}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}

      <View style={styles.line} />

      {/* Bottom */}

      <View style={styles.bottom}>
        <Text style={styles.items}>
          Total 2 items
        </Text>

        <Text style={styles.total}>
          $25.00
        </Text>
      </View>

      {/* Button */}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 18,
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 16,
    backgroundColor: RainbowColors.cloudSurface,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },

  description: {
    marginTop: 4,
    color: RainbowColors.stone,
    lineHeight: 18,
    fontSize: 13,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.tangerine,
  },

  quantityRow: {
    alignItems: "flex-end",
    marginTop: 12,
  },

  quantity: {
    width: 96,
    height: 36,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  qty: {
    fontSize: 15,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },

  line: {
    marginVertical: 16,
    height: 1,
    backgroundColor: RainbowColors.cloudSurface,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  items: {
    color: RainbowColors.stone,
    fontSize: 14,
    fontWeight: "500",
  },

  total: {
    fontSize: 20,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },

  button: {
    height: 50,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 5,
  },

  buttonText: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});