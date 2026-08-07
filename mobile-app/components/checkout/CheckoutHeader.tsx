import { useTheme } from "@/context/ThemeContext";
import { WardaIconButton, WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";

export default function CheckoutHeader() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}

      <WardaIconButton icon="arrow-left" onPress={() => router.back()} />

      {/* Title */}

      <WardaText style={styles.title}>
        Checkout
      </WardaText>

      {/* Edit Button */}

      <WardaIconButton icon="edit-2" />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginTop: 12,
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