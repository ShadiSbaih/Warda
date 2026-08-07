import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaIconButton, WardaText } from "../ui";

export default function LiveTrackingHeader() {
  const router = useRouter();
  const { theme } = useTheme();

  const handleHelp = () => {
    Alert.alert(
      "Customer Support",
      "Need help with your gift delivery? Our 24/7 concierge is here to assist you.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call Concierge", onPress: () => {} },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <WardaIconButton icon="x" onPress={() => router.back()} />

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleHelp}
        style={[styles.helpButton, { backgroundColor: theme.colors.surface }, theme.shadows.md]}
      >
        <Feather name="headphones" size={15} color={theme.colors.brand} />
        <WardaText variant="caption" weight="bold" color={theme.colors.text}>
          Help
        </WardaText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 999,
    justifyContent: "center",
  },
});
