import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function OrderStatusCard() {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <Image
            source={require("../../assets/images/tracking/store.png")}
            style={styles.logo}
          />

          <Text style={styles.store}>
            Warda Gifts
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Preparing Order
          </Text>
        </View>
      </View>

      <Text style={styles.label}>
        Estimated arrival
      </Text>

      <Text style={styles.time}>
        30-49 minutes
      </Text>

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

  logo: {
    width: 38,
    height: 38,
    marginRight: 12,
  },

  store: {
    fontSize: 18,
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
    fontSize: 14,
    fontWeight: "500",
  },

  time: {
    marginTop: 4,
    fontSize: 32,
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