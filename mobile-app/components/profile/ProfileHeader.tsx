import { useTheme } from "@/context/ThemeContext";
import { WardaIconButton, WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";

export default function ProfileHeader() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <WardaText style={styles.title}>Profile</WardaText>

      <WardaIconButton icon="settings" />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: theme.colors.text,
  },
});