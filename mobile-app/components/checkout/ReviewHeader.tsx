import React from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaIconButton, WardaText } from "../ui";

interface ReviewHeaderProps {
  title?: string;
}

export default function ReviewHeader({ title = "Review & Checkout" }: ReviewHeaderProps) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <WardaIconButton icon="arrow-left" onPress={() => router.back()} />
      <WardaText variant="h2" color={theme.colors.text}>
        {title}
      </WardaText>
      <View style={{ width: 44 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
