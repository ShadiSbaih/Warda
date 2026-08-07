import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type Variant = "h1" | "h2" | "h3" | "body" | "caption" | "label" | "button";

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
  weight?: "regular" | "medium" | "semibold" | "bold" | "extrabold";
  align?: "auto" | "left" | "right" | "center" | "justify";
  children: React.ReactNode;
}

export default function WardaText({
  variant = "body",
  color,
  weight,
  align,
  style,
  children,
  ...rest
}: Props) {
  const { theme } = useTheme();

  const weightMap: Record<string, TextStyle["fontWeight"]> = {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  };

  return (
    <Text
      style={[
        variantStyles(theme)[variant],
        {
          color: color || variantStyles(theme)[variant].color || theme.colors.text,
          textAlign: align,
          fontWeight: weight ? weightMap[weight] : variantStyles(theme)[variant].fontWeight,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

const variantStyles = (theme: any) =>
  StyleSheet.create<{ [k: string]: TextStyle }>({
    h1: {
      fontSize: theme.typography.sizes["2xl"],
      lineHeight: 34,
      fontWeight: "800",
      color: theme.colors.text,
    },
    h2: {
      fontSize: theme.typography.sizes.xl,
      lineHeight: 28,
      fontWeight: "800",
      color: theme.colors.text,
    },
    h3: {
      fontSize: theme.typography.sizes.lg,
      lineHeight: 24,
      fontWeight: "700",
      color: theme.colors.text,
    },
    body: {
      fontSize: theme.typography.sizes.base,
      lineHeight: theme.typography.lineHeights.normal,
      fontWeight: "400",
      color: theme.colors.text,
    },
    caption: {
      fontSize: theme.typography.sizes.sm,
      lineHeight: theme.typography.lineHeights.tight,
      fontWeight: "400",
      color: theme.colors.textMuted,
    },
    label: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: "600",
      color: theme.colors.textMuted,
    },
    button: {
      fontSize: theme.typography.sizes.md,
      fontWeight: "700",
      color: theme.colors.textInverse,
    },
  });
