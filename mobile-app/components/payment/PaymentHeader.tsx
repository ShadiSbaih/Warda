import { useTheme } from "@/context/ThemeContext";
import { WardaIconButton, WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

export default function PaymentHeader() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <WardaIconButton icon="arrow-left" onPress={() => router.back()} />

      {/* Title */}
      <WardaText style={styles.title}>Payment</WardaText>

      {/* Empty View for Center Alignment */}
      <View style={styles.placeholder} />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
});