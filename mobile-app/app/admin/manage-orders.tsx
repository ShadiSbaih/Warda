import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { adminAPI } from "../../services/api";

export default function ManageOrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await adminAPI.getAllOrders();
      if (res.success && res.orders) {
        setOrders(res.orders);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (order: any) => {
    Alert.alert(
      "Update Status",
      `Select a new status for order ${order._id.substring(0, 8)}`,
      [
        { text: "Arranging", onPress: () => updateStatus(order._id, "Arranging") },
        { text: "Picked Up", onPress: () => updateStatus(order._id, "Picked Up") },
        { text: "On The Way", onPress: () => updateStatus(order._id, "On The Way") },
        { text: "Delivered", onPress: () => updateStatus(order._id, "Delivered") },
        { text: "Cancelled", onPress: () => updateStatus(order._id, "Cancelled"), style: "destructive" },
        { text: "Close", style: "cancel" },
      ]
    );
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await adminAPI.updateOrderStatus(id, status);
      if (res.success) {
        setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
      } else {
        Alert.alert("Error", res.message || "Failed to update status");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={RainbowColors.inkBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Orders</Text>
        <View style={{ width: 44 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={RainbowColors.tangerine} />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>#{item._id.substring(0, 8).toUpperCase()}</Text>
                <Text style={styles.date}>
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : ""}
                </Text>
              </View>
              
              <View style={styles.customerInfo}>
                <Feather name="user" size={14} color={RainbowColors.stone} />
                <Text style={styles.customerName}>{item.user?.name || "Unknown User"}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.total}>${item.total?.toFixed(2)}</Text>
                <TouchableOpacity 
                  style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}
                  onPress={() => handleStatusChange(item)}
                  disabled={updating === item._id}
                >
                  {updating === item._id ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.statusText}>{item.status}</Text>
                      <Feather name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Arranging": return "#F59E0B";
    case "Picked Up": return "#3B82F6";
    case "On The Way": return "#8B5CF6";
    case "Delivered": return "#10B981";
    case "Cancelled": return "#EF4444";
    default: return "#94A3B8";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: RainbowColors.pureWhite,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  date: {
    fontSize: 13,
    color: RainbowColors.stone,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  customerName: {
    fontSize: 14,
    color: RainbowColors.inkBlack,
    fontWeight: "500",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: RainbowColors.cloudSurface,
  },
  total: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RainbowRadii.pills,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
});
