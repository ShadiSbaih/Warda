import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface Props extends ViewProps {
  shadow?: "none" | "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function WardaCard({
  shadow = "md",
  radius = "lg",
  padding = "md",
  bordered = false,
  children,
  style,
  ...rest
}: Props) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii[radius],
          padding: padding === "none" ? 0 : theme.spacing[padding === "sm" ? 3 : padding === "lg" ? 5 : 4],
        },
        theme.shadows[shadow],
        bordered && { borderWidth: 1, borderColor: theme.colors.borderSubtle },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
