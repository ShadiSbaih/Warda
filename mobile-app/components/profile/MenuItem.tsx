import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaBadge, WardaText } from "../ui";

interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "default" | "brand" | "success" | "warning" | "error" | "info";
  iconBgColor?: string;
  iconColor?: string;
  isDestructive?: boolean;
  onPress: () => void;
}

export default function MenuItem({
  icon,
  title,
  subtitle,
  badge,
  badgeVariant = "brand",
  iconBgColor,
  iconColor,
  isDestructive = false,
  onPress,
}: MenuItemProps) {
  const { theme } = useTheme();

  const bg = isDestructive ? theme.colors.errorSurface : iconBgColor || theme.colors.background;
  const tint = isDestructive ? theme.colors.error : iconColor || theme.colors.textMuted;

  return (
    <TouchableOpacity activeOpacity={0.75} style={styles.container} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: bg }]}>
        <Feather name={icon} size={20} color={tint} />
      </View>

      <View style={styles.textContainer}>
        <WardaText variant="body" weight={isDestructive ? "bold" : "semibold"} color={isDestructive ? theme.colors.error : theme.colors.text}>
          {title}
        </WardaText>
        {subtitle && (
          <WardaText variant="caption" color={theme.colors.textMuted} numberOfLines={1}>
            {subtitle}
          </WardaText>
        )}
      </View>

      {badge && <WardaBadge text={badge} variant={badgeVariant} style={{ marginRight: 8 }} />}

      {!isDestructive && <Feather name="chevron-right" size={18} color={theme.colors.textMuted} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
});
