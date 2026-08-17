import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

interface StatsCardProps {
  ordersCount: number;
  favoritesCount: number;
  remindersCount: number;
  vouchersCount: number;
  onOrdersPress?: () => void;
  onFavoritesPress?: () => void;
  onRemindersPress?: () => void;
  onVouchersPress?: () => void;
}

const Stat = ({
  icon,
  count,
  label,
  color,
  onPress,
  theme,
}: {
  icon: React.ReactNode;
  count: number;
  label: string;
  color: string;
  onPress?: () => void;
  theme: any;
}) => (
  <TouchableOpacity activeOpacity={0.75} style={styles.statItem} onPress={onPress}>
    <View style={[styles.iconCircle, { backgroundColor: theme.colors.background }]}>{icon}</View>
    <WardaText variant="h3" weight="extrabold" color={theme.colors.text}>
      {count}
    </WardaText>
    <WardaText variant="caption" color={theme.colors.textMuted}>
      {label}
    </WardaText>
  </TouchableOpacity>
);

export default function StatsCard({
  ordersCount,
  favoritesCount,
  remindersCount,
  vouchersCount,
  onOrdersPress,
  onFavoritesPress,
  onRemindersPress,
  onVouchersPress,
}: StatsCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme.colors.borderSubtle,
        },
      ]}
    >
      <Stat
        theme={theme}
        icon={<Feather name="package" size={20} color={theme.colors.brand} />}
        count={ordersCount}
        label="Orders"
        color={theme.colors.brand}
        onPress={onOrdersPress}
      />
      <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
      <Stat
        theme={theme}
        icon={<Ionicons name="heart" size={20} color={theme.colors.love} />}
        count={favoritesCount}
        label="Wishlist"
        color={theme.colors.love}
        onPress={onFavoritesPress}
      />
      <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
      <Stat
        theme={theme}
        icon={<Feather name="bell" size={20} color={theme.colors.info} />}
        count={remindersCount}
        label="Reminders"
        color={theme.colors.info}
        onPress={onRemindersPress}
      />
      <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
      <Stat
        theme={theme}
        icon={<MaterialCommunityIcons name="ticket-percent" size={20} color={theme.colors.success} />}
        count={vouchersCount}
        label="Vouchers"
        color={theme.colors.success}
        onPress={onVouchersPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  divider: {
    width: 1,
    height: 36,
  },
});
