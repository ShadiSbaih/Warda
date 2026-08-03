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

interface Props {
  item: {
    image: any;
    title: string;
    description: string;
    price: string;
  };
}

export default function CheckoutProductCard({
  item,
}: Props) {
  const [quantity, setQuantity] = useState(1);

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
      {/* Product Image */}

      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Product Details */}

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {item.title}
          </Text>

          <Text style={styles.price}>
            {item.price}
          </Text>
        </View>

        <Text style={styles.description}>
          {item.description}
        </Text>

        {/* Quantity */}

        <View style={styles.quantityRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
            >
              <Feather
                name="minus"
                size={18}
                color={RainbowColors.stone}
              />
            </TouchableOpacity>

            <Text style={styles.quantity}>
              {quantity}
            </Text>

            <TouchableOpacity
              onPress={() =>
                setQuantity(quantity + 1)
              }
            >
              <Feather
                name="plus"
                size={18}
                color={RainbowColors.stone}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flexDirection: "row",

    padding: 16,

    backgroundColor: RainbowColors.pureWhite,
  },

  image: {
    width: 95,
    height: 95,
  },

  info: {
    flex: 1,

    marginLeft: 16,
  },

  topRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  title: {
    flex: 1,

    fontSize: 20,

    fontWeight: "700",

    color: RainbowColors.inkBlack,
  },

  price: {
    fontSize: 18,

    fontWeight: "700",

    color: RainbowColors.inkBlack,
  },

  description: {
    marginTop: 8,

    color: "#8B8B8B",

    fontSize: 15,

    lineHeight: 22,

    width: "92%",
  },

  quantityRow: {
    marginTop: 16,

    alignItems: "flex-end",
  },

  quantityContainer: {
    width: 95,

    height: 36,

    borderRadius: 18,

    backgroundColor: "#F3F3F3",

    flexDirection: "row",

    justifyContent: "space-evenly",

    alignItems: "center",
  },

  quantity: {
    fontSize: 17,

    fontWeight: "600",

    color: RainbowColors.inkBlack,
  },
});