import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function OrderSummaryCard() {
  const [qty, setQty] = useState(1);

  return (
    <View style={styles.container}>
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
              color="#555"
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
              color="#555"
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
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 16,
    backgroundColor: "#FCF6F8",
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1E2D",
  },

  description: {
    marginTop: 4,
    color: "#8E8292",
    lineHeight: 18,
    fontSize: 13,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#D4588A",
  },

  quantityRow: {
    alignItems: "flex-end",
    marginTop: 12,
  },

  quantity: {
    width: 96,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF0F5",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  qty: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E2D",
  },

  line: {
    marginVertical: 16,
    height: 1,
    backgroundColor: "#F3E5ED",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  items: {
    color: "#8E8292",
    fontSize: 14,
    fontWeight: "500",
  },

  total: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1E2D",
  },

  button: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});