import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaBadge, WardaText } from "../ui";

export default function OrderStatusCard() {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }, theme.shadows.md]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={[styles.logoBadge, { backgroundColor: theme.colors.brandLight }]}>
            <Ionicons name="sparkles" size={18} color={theme.colors.brand} />
          </View>
          <WardaText variant="body" weight="bold">
            Warda Luxury Gifts
          </WardaText>
        </View>
        <WardaBadge text="Preparing Order" variant="warning" />
      </View>

      <WardaText variant="caption" color={theme.colors.textMuted} style={{ marginTop: 18 }}>
        Estimated arrival
      </WardaText>
      <WardaText variant="h1" color={theme.colors.text}>
        30-45 mins
      </WardaText>

      <Image source={require("../../assets/gifts/custom-hamper.png")} style={styles.gift} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  gift: {
    position: "absolute",
    right: 20,
    bottom: 16,
    width: 76,
    height: 76,
  },
});
