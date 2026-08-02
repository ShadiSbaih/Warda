import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
      {/* Orders */}
      <TouchableOpacity
        style={styles.statItem}
        activeOpacity={0.75}
        onPress={onOrdersPress}
      >
        <View style={[styles.iconCircle, { backgroundColor: "#FFF0F5" }]}>
          <Feather name="package" size={20} color="#D4588A" />
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
        <View style={[styles.iconCircle, { backgroundColor: "#FEF2F2" }]}>
          <Ionicons name="heart" size={20} color="#EF4444" />
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
        <View style={[styles.iconCircle, { backgroundColor: "#EFF6FF" }]}>
          <Feather name="bell" size={20} color="#3B82F6" />
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
        <View style={[styles.iconCircle, { backgroundColor: "#ECFDF5" }]}>
          <MaterialCommunityIcons name="ticket-percent" size={20} color="#10B981" />
        </View>
        <Text style={styles.statValue}>{vouchersCount}</Text>
        <Text style={styles.statLabel}>Vouchers</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: "#F0F0F2",
  },
});