import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
  return (
    <View style={styles.container}>
      {/* 3D inset gloss — top-edge white shimmer, inflated-card effect */}
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      {/* Orders */}
      <TouchableOpacity
        style={styles.statItem}
        activeOpacity={0.75}
        onPress={onOrdersPress}
      >
        <View style={[styles.iconCircle, { backgroundColor: RainbowColors.cloudSurface }]}>
          <Feather name="package" size={20} color={RainbowColors.tangerine} />
        </View>
        <Text style={styles.statValue}>{ordersCount}</Text>
        <Text style={styles.statLabel}>Orders</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Wishlist */}
      <TouchableOpacity
        style={styles.statItem}
        activeOpacity={0.75}
        onPress={onFavoritesPress}
      >
        <View style={[styles.iconCircle, { backgroundColor: RainbowColors.cloudSurface }]}>
          <Ionicons name="heart" size={20} color={RainbowColors.hotPink} />
        </View>
        <Text style={styles.statValue}>{favoritesCount}</Text>
        <Text style={styles.statLabel}>Wishlist</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Reminders */}
      <TouchableOpacity
        style={styles.statItem}
        activeOpacity={0.75}
        onPress={onRemindersPress}
      >
        <View style={[styles.iconCircle, { backgroundColor: RainbowColors.cloudSurface }]}>
          <Feather name="bell" size={20} color={RainbowColors.tangerine} />
        </View>
        <Text style={styles.statValue}>{remindersCount}</Text>
        <Text style={styles.statLabel}>Reminders</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Vouchers */}
      <TouchableOpacity
        style={styles.statItem}
        activeOpacity={0.75}
        onPress={onVouchersPress}
      >
        <View style={[styles.iconCircle, { backgroundColor: RainbowColors.cloudSurface }]}>
          <MaterialCommunityIcons name="ticket-percent" size={20} color={RainbowColors.hotPink} />
        </View>
        <Text style={styles.statValue}>{vouchersCount}</Text>
        <Text style={styles.statLabel}>Vouchers</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: RainbowRadii.pills,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  statLabel: {
    fontSize: 12,
    color: RainbowColors.stone,
    fontWeight: "600",
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: RainbowColors.cloudSurface,
  },
});