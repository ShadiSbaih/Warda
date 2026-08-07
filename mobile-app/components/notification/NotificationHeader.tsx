import { useTheme } from "@/context/ThemeContext";
import { WardaIconButton, WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

export default function NotificationHeader() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <WardaIconButton icon="arrow-left" onPress={() => router.back()} />

      <WardaText style={styles.title}>
        Notifications
      </WardaText>

      <View style={{ width: 48 }} />
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
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text,
  },
});