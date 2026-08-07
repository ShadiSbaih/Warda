import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.logoBadge}>
        <MaterialCommunityIcons name="flower-tulip" size={28} color={theme.colors.brand} />
      </View>
      <WardaText style={styles.title}>{title}</WardaText>
      <WardaText style={styles.subtitle}>{subtitle}</WardaText>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 10,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: theme.colors.borderSubtle,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14.5,
    lineHeight: 22,
    color: theme.colors.textMuted,
  },
});