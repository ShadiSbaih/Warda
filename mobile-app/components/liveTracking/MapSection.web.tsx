import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

export default function MapSection() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <WardaText variant="body" color={theme.colors.textMuted}>
        Map is not supported on the web.
      </WardaText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
