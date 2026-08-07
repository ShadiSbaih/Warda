import React from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaIconButton, WardaText } from "../ui";

export default function TrackingHeader() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <WardaIconButton icon="x" onPress={() => router.replace("/(tabs)/home")} />
      <WardaText variant="h1" color={theme.colors.text} style={styles.title}>
        Hang in there, we're on it!
      </WardaText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    lineHeight: 42,
  },
});
