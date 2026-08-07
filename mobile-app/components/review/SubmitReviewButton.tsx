import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, TouchableOpacity } from "react-native";

export default function SubmitReviewButton() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity style={styles.button}>
      <WardaText style={styles.text}>
        Order Details
      </WardaText>
    </TouchableOpacity>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  button: {
    marginTop: 24,
    height: 58,
    borderRadius: 29,
    backgroundColor: theme.colors.brand,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: theme.colors.textInverse,
    fontSize: 18,
    fontWeight: "700",
  },
});