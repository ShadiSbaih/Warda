import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function DeliverySummaryCard() {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.logoBadge}>
            <Ionicons name="sparkles" size={18} color={RainbowColors.tangerine} />
          </View>

          <Text style={styles.store}>Warda Luxury Gifts</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>#ORD-8452</Text>
        </View>
      </View>

      <Text style={styles.label}>Total paid: $23.00</Text>

      <Text style={styles.status}>Order Delivered</Text>

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
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 24,
    padding: 20,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
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
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  store: {
    fontSize: 16,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  badge: {
    backgroundColor: RainbowColors.cloudSurface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeText: {
    color: RainbowColors.tangerine,
    fontSize: 12,
    fontWeight: "700",
  },
  label: {
    marginTop: 18,
    color: RainbowColors.stone,
    fontSize: 14,
    fontWeight: "500",
  },
  status: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  gift: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 76,
    height: 76,
  },
});