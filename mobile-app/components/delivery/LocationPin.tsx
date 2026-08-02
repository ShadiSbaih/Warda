import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LocationPin() {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>
          Your gift will be delivered here 🌸
        </Text>
        <View style={styles.tooltipArrow} />
      </View>

      <View style={styles.pinWrapper}>
        <View style={styles.pinGlow} />
        <View style={styles.pin}>
          <Ionicons name="location-sharp" size={26} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "35%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: {
    backgroundColor: "#1E1E2D",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  tooltipArrow: {
    position: "absolute",
    bottom: -6,
    width: 12,
    height: 12,
    backgroundColor: "#1E1E2D",
    transform: [{ rotate: "45deg" }],
  },
  tooltipText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  pinWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  pinGlow: {
    position: "absolute",
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(212, 88, 138, 0.25)",
  },
  pin: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#D4588A",
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
});