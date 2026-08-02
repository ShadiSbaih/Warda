import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OrderStatusCard() {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.logoBadge}>
            <Ionicons name="sparkles" size={18} color="#D4588A" />
          </View>

          <Text style={styles.store}>Warda Luxury Gifts</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Preparing Order</Text>
        </View>
      </View>

      <Text style={styles.label}>Estimated arrival</Text>

      <Text style={styles.time}>30-45 mins</Text>

      <Image
        source={require("../../assets/gifts/custom-hamper.png")}
        style={styles.gift}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    position: "relative",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#F8D7E8",
  },
  store: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  badge: {
    backgroundColor: "#FFF0F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    color: "#D4588A",
    fontSize: 12,
    fontWeight: "700",
  },
  label: {
    marginTop: 18,
    color: "#8E8292",
    fontSize: 13,
    fontWeight: "500",
  },
  time: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  gift: {
    position: "absolute",
    right: 20,
    bottom: 16,
    width: 76,
    height: 76,
  },
});