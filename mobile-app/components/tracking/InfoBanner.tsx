import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

export default function InfoBanner() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.brandLight, borderColor: theme.colors.borderSubtle }]}>
      <WardaText variant="body" weight="semibold" color={theme.colors.brand}>
        Your gift is being carefully prepared. It will arrive soon!
      </WardaText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
  },
});
