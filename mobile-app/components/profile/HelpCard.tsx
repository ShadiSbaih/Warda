import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaButton, WardaText } from "../ui";

interface HelpCardProps {
  onContactSupport?: () => void;
  onFAQPress?: () => void;
}

export default function HelpCard({ onContactSupport, onFAQPress }: HelpCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, borderRadius: theme.radii.xl, ...theme.shadows.md },
      ]}
    >
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: theme.colors.brandLight }]}>
          <MaterialCommunityIcons name="headset" size={26} color={theme.colors.brand} />
        </View>
        <View style={styles.textContainer}>
          <WardaText variant="h3" weight="bold">
            24/7 Luxury Concierge
          </WardaText>
          <WardaText variant="caption" color={theme.colors.textMuted}>
            Need assistance with special wrapping, custom notes, or express timing?
          </WardaText>
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <WardaButton
          title="Live Support"
          icon="message-circle"
          size="md"
          onPress={onContactSupport}
          style={{ flex: 1 }}
        />
        <WardaButton
          title="FAQ"
          variant="secondary"
          icon="help-circle"
          size="md"
          onPress={onFAQPress}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
});
