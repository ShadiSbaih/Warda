import React from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import { WardaIconButton, WardaText } from "../ui";

interface Props {
  onSearchPress?: () => void;
}

export default function MenuHeader({ onSearchPress }: Props) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <WardaText variant="h1">Gift Collections</WardaText>
        <WardaText variant="caption" color={theme.colors.textMuted}>
          Curated luxury flowers & sweet treats
        </WardaText>
      </View>

      <View style={styles.actions}>
        <WardaIconButton
          icon="search"
          variant="default"
          onPress={onSearchPress || (() => router.push("/(tabs)/search"))}
        />
        <WardaIconButton
          icon="shopping-bag"
          variant="secondary"
          onPress={() => router.push("/(tabs)/cart")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
});
