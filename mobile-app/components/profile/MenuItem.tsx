import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  iconBgColor?: string;
  iconColor?: string;
  isDestructive?: boolean;
  onPress: () => void;
  showDivider?: boolean;
}

export default function MenuItem({
  icon,
  title,
  subtitle,
  badge,
  badgeColor = RainbowColors.hotPink,
  iconBgColor = RainbowColors.cloudSurface,
  iconColor = RainbowColors.tangerine,
  isDestructive = false,
  onPress,
  showDivider = true,
}: MenuItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconBox,
          { backgroundColor: isDestructive ? "#FFF0F0" : iconBgColor },
        ]}
      >
        <Feather
          name={icon}
          size={18}
          color={isDestructive ? "#E53935" : iconColor}
        />
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            isDestructive && { color: "#E53935", fontWeight: "700" },
          ]}
        >
          {title}
        </Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {badge && (
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      {!isDestructive && (
        <Feather name="chevron-right" size={18} color="#C4C4C4" />
      )}
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
    width: 40,
    height: 40,
    borderRadius: RainbowRadii.pills,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: RainbowColors.inkBlack,
  },
  subtitle: {
    fontSize: 12,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    color: RainbowColors.pureWhite,
    fontSize: 11,
    fontWeight: "700",
  },
});