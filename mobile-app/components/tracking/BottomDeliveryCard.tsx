import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

export default function BottomDeliveryCard() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }, theme.shadows.md]}>
      <View style={[styles.icon, { backgroundColor: theme.colors.brandLight }]}>
        <Feather name="home" size={20} color={theme.colors.brand} />
      </View>

      <View>
        <WardaText variant="caption" color={theme.colors.textMuted}>
          Delivering to
        </WardaText>
        <WardaText variant="h3" weight="extrabold" color={theme.colors.text}>
          Home, Expected in 25 mins
        </WardaText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 30,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
});
