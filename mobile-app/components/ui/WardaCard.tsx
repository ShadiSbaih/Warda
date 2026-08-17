import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
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
          backgroundColor: "transparent",
          borderRadius: 0,
          padding: padding === "none" ? 0 : theme.spacing[padding === "sm" ? 3 : padding === "lg" ? 5 : 4],
        },
        // Cards are now flat sections. Keep the props for compatibility while
        // allowing existing screens to migrate without a visual regression.
        bordered && { borderBottomWidth: 1, borderBottomColor: theme.colors.borderSubtle },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
