import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface Props {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  iconRight?: keyof typeof Feather.glyphMap;
  style?: ViewStyle;
}

export default function WardaButton({
  title,
  subtitle,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  iconRight,
  style,
}: Props) {
  const { theme } = useTheme();

  const containerStyles = [
    styles.base,
    sizeStyles[size],
    variantStyles(theme)[variant],
    (disabled || loading) && { opacity: 0.55 },
    style,
  ];

  const textColor =
    variant === "primary" || variant === "danger"
      ? theme.colors.textInverse
      : variant === "outline" || variant === "ghost"
      ? theme.colors.brand
      : theme.colors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && <Feather name={icon} size={size === "lg" ? 22 : 18} color={textColor} />}
          <View style={{ alignItems: "center" }}>
            <Text style={[styles.text, { color: textColor, fontSize: size === "lg" ? 17 : size === "sm" ? 13 : 15 }]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>
            )}
          </View>
          {iconRight && <Feather name={iconRight} size={size === "lg" ? 22 : 18} color={textColor} />}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 999,
  },
  text: {
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "500",
    opacity: 0.85,
    marginTop: 1,
  },
});

const sizeStyles: Record<string, ViewStyle> = {
  sm: { height: 38, paddingHorizontal: 16 },
  md: { height: 48, paddingHorizontal: 22 },
  lg: { height: 58, paddingHorizontal: 28 },
};

const variantStyles = (theme: any) =>
  StyleSheet.create({
    primary: {
      backgroundColor: theme.colors.brand,
      ...theme.shadows.brand,
    },
    secondary: {
      backgroundColor: theme.colors.brandLight,
    },
    outline: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1.5,
      borderColor: theme.colors.brand,
    },
    ghost: {
      backgroundColor: "transparent",
    },
    danger: {
      backgroundColor: theme.colors.error,
    },
  });
