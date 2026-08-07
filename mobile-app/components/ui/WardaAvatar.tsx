import React from "react";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
}

export default function WardaAvatar({ name, image, size = "md", style }: Props) {
  const { theme } = useTheme();
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };
  const s = sizeMap[size];

  return (
    <View
      style={[
        styles.container,
        {
          width: s,
          height: s,
          borderRadius: s / 2,
          backgroundColor: theme.colors.brandLight,
        },
        style,
      ]}
    >
      {image ? (
        <Image source={{ uri: image }} style={{ width: s, height: s, borderRadius: s / 2 }} />
      ) : (
        <Text style={[styles.letter, { fontSize: s * 0.4, color: theme.colors.brand }]}>
          {name?.charAt(0)?.toUpperCase?.() || "U"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  letter: {
    fontWeight: "800",
  },
});
