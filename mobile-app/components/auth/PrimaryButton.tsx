import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.surface} />
      ) : (
        <WardaText style={styles.text}>
          {title}
        </WardaText>
      )}
    </TouchableOpacity>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  button: {
    height: 54,
    backgroundColor: theme.colors.brand,
    borderRadius: theme.radii.lg,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  text: {
    color: theme.colors.textInverse,
    fontSize: 16,
    fontWeight: "700",
  },
});