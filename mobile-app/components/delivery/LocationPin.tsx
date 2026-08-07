import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LocationPin() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.tooltip}>
        <WardaText style={styles.tooltipText}>
          Your gift will be delivered here 🌸
        </WardaText>
        <View style={styles.tooltipArrow} />
      </View>

      <View style={styles.pinWrapper}>
        <View style={styles.pinGlow} />
        <View style={styles.pin}>
          <Ionicons name="location-sharp" size={26} color={theme.colors.surface} />
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
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
    backgroundColor: theme.colors.text,
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
    backgroundColor: theme.colors.text,
    transform: [{ rotate: "45deg" }],
  },
  tooltipText: {
    color: theme.colors.textInverse,
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
    backgroundColor: theme.colors.brand,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: theme.colors.surface,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
});