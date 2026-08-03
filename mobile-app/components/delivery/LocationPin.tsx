import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
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
          <Ionicons name="location-sharp" size={26} color={RainbowColors.pureWhite} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    // Adjust slightly so the *bottom* tip of the pin hits the exact center of the map
    marginTop: -34,
  },
  tooltip: {
    backgroundColor: RainbowColors.inkBlack,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
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
    backgroundColor: RainbowColors.inkBlack,
    transform: [{ rotate: "45deg" }],
  },
  tooltipText: {
    color: RainbowColors.pureWhite,
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
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: RainbowColors.pureWhite,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
});