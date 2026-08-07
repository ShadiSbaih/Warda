import { useTheme } from "@/context/ThemeContext";
import { WardaBadge, WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { adminAPI } from "../../services/api";

const STATUS_OPTIONS = ["confirmed", "preparing", "on_the_way", "delivered", "cancelled"];

const STATUS_VARIANTS: Record<string, "info" | "warning" | "brand" | "success" | "error" | "default"> = {
  confirmed: "info",
  preparing: "warning",
  on_the_way: "brand",
  delivered: "success",
  cancelled: "error",
};

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmed",
  preparing: "Preparing",
  on_the_way: "On The Way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function ManageOrdersScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await adminAPI.updateOrderStatus(id, status);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status } : o))
        );
      } else {
        Alert.alert("Error", res.message || "Failed to update status");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const markPayment = async (id: string, current: string) => {
    const next = current === "paid" ? "pending" : "paid";
    try {
      const res = await adminAPI.updateOrderPaymentStatus(id, next);
      if (res.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, paymentStatus: next } : o))
        );
      } else {
        Alert.alert("Error", res.message || "Failed to update payment");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const promptStatus = (order: any) => {
    const buttons: { text: string; onPress: () => void; style?: "destructive" | "cancel" }[] =
      STATUS_OPTIONS.map((status) => ({
        text: STATUS_LABELS[status],
        onPress: () => updateStatus(order._id, status),
        style: status === "cancelled" ? "destructive" : undefined,
      }));
    Alert.alert(
      "Update Order Status",
      `Order ${order.orderNumber || order._id.substring(0, 8)}`,
      [...buttons, { text: "Close", style: "cancel" }]
    );
  };

  const openDriverLocation = (order: any) => {
    router.push({
      pathname: "/admin/driver-location",
      params: { orderId: order._id },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <WardaIconButton icon="arrow-left" onPress={() => router.back()} variant="ghost" />
        <WardaText style={styles.headerTitle}>Manage Orders</WardaText>
        <View style={{ width: 44 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.brand} />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <WardaText style={styles.orderId}>#{item.orderNumber || item._id.substring(0, 8).toUpperCase()}</WardaText>
                <WardaText style={styles.date}>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </WardaText>
              </View>

              <View style={styles.customerInfo}>
                <Feather name="user" size={14} color={theme.colors.textMuted} />
                <WardaText style={styles.customerName}>{item.user?.name || "Unknown User"}</WardaText>
              </View>

              <View style={styles.detailsRow}>
                <WardaText style={styles.total}>${item.total?.toFixed(2)}</WardaText>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => promptStatus(item)}
                >
                  <WardaBadge
                    text={STATUS_LABELS[item.status] || item.status}
                    variant={STATUS_VARIANTS[item.status] || "default"}
                    icon="chevron-down"
                    style={{ alignSelf: "center" }}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.actionsRow}>
                <WardaButton
                  title={item.paymentStatus === "paid" ? "Paid" : "Mark Paid"}
                  icon={item.paymentStatus === "paid" ? "check-circle" : "clock"}
                  variant="secondary"
                  size="sm"
                  onPress={() => markPayment(item._id, item.paymentStatus)}
                />

                <WardaButton
                  title="Set Driver"
                  icon="map-pin"
                  variant="secondary"
                  size="sm"
                  onPress={() => openDriverLocation(item)}
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
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
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    shadowColor: theme.colors.text,
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
    color: theme.colors.text,
  },
  date: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  customerName: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: "500",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle,
    marginBottom: 12,
  },
  total: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
});
