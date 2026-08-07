import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

type Variant = "default" | "brand" | "success" | "warning" | "error" | "info";

interface Props {
  text: string;
  variant?: Variant;
  icon?: keyof typeof Feather.glyphMap;
  style?: ViewStyle;
}

export default function WardaBadge({ text, variant = "default", icon, style }: Props) {
  const { theme } = useTheme();
  const config: Record<Variant, { bg: string; textColor: string }> = {
    default: { bg: theme.colors.background, textColor: theme.colors.text },
    brand: { bg: theme.colors.brandLight, textColor: theme.colors.brand },
    success: { bg: theme.colors.successSurface, textColor: theme.colors.success },
    warning: { bg: theme.colors.warningSurface, textColor: theme.colors.warning },
    error: { bg: theme.colors.errorSurface, textColor: theme.colors.error },
    info: { bg: theme.colors.infoSurface, textColor: theme.colors.info },
  };
  const { bg, textColor } = config[variant];

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      {icon && <Feather name={icon} size={11} color={textColor} style={{ marginRight: 4 }} />}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  text: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
