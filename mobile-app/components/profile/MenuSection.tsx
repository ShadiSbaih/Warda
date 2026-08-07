import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

interface MenuSectionProps {
  title?: string;
  children: React.ReactNode;
}

export default function MenuSection({ title, children }: MenuSectionProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {title && (
        <WardaText variant="label" color={theme.colors.textMuted} style={styles.sectionTitle}>
          {title}
        </WardaText>
      )}
      <View style={[styles.card, { backgroundColor: theme.colors.surface, borderRadius: theme.radii.xl, ...theme.shadows.md }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    overflow: "hidden",
  },
});
