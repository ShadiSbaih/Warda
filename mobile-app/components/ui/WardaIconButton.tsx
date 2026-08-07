import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

type Variant = "default" | "primary" | "secondary" | "ghost" | "danger";

interface Props {
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
}

export default function WardaIconButton({
  icon,
  onPress,
  variant = "default",
  size = "md",
  style,
}: Props) {
  const { theme } = useTheme();

  const sizeMap = {
    sm: { container: 36, icon: 18 },
    md: { container: 44, icon: 20 },
    lg: { container: 52, icon: 24 },
  };

  const variantMap: Record<Variant, { bg: string; iconColor: string; borderColor?: string }> = {
    default: { bg: theme.colors.background, iconColor: theme.colors.text },
    primary: { bg: theme.colors.brand, iconColor: theme.colors.textInverse },
    secondary: { bg: theme.colors.brandLight, iconColor: theme.colors.brand },
    ghost: { bg: "transparent", iconColor: theme.colors.text },
    danger: { bg: theme.colors.errorSurface, iconColor: theme.colors.error },
  };

  const { container, icon: iconSize } = sizeMap[size];
  const { bg, iconColor, borderColor } = variantMap[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        {
          width: container,
          height: container,
          borderRadius: container / 2,
          backgroundColor: bg,
          borderColor: borderColor || "transparent",
        },
        variant === "default" && theme.shadows.sm,
        style,
      ]}
    >
      <Feather name={icon} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
