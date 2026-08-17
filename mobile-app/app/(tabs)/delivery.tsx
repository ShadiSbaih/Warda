import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { WardaText } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { deliveryAPI } from "../../services/api";

const ACTIVE_STATUSES = ["confirmed", "preparing", "on_the_way"];

const statusLabel: Record<string, string> = {
  confirmed: "New order",
  preparing: "Being prepared",
  on_the_way: "On the way",
  delivered: "Delivered",
};

const nextStatus: Record<string, { status: string; label: string }> = {
  confirmed: { status: "preparing", label: "Start preparing" },
  preparing: { status: "on_the_way", label: "Start delivery" },
  on_the_way: { status: "delivered", label: "Mark delivered" },
};

const MOCK_DELIVERY_ORDERS = [
  {
    _id: "mock-delivery-1001",
    orderNumber: "WD-1042",
    status: "preparing",
    total: 95,
    recipientName: "Sarah Connor",
    recipientPhone: "+966 50 123 4567",
    deliveryAddress: { address: "King Fahd Road, Al Olaya", city: "Riyadh" },
    items: [{ title: "Red Roses Bouquet", quantity: 1 }],
  },
  {
    _id: "mock-delivery-1002",
    orderNumber: "WD-1043",
    status: "on_the_way",
    total: 120,
    recipientName: "Omar Al-Harbi",
    recipientPhone: "+966 55 987 2231",
    deliveryAddress: { address: "Prince Mohammed bin Abdulaziz St", city: "Riyadh" },
    items: [{ title: "Luxury Chocolate Box", quantity: 1 }],
  },
  {
    _id: "mock-delivery-1004",
    orderNumber: "WD-1038",
    status: "delivered",
    total: 150,
    recipientName: "Maha Khalid",
    recipientPhone: "+966 54 345 6612",
    deliveryAddress: { address: "Diplomatic Quarter", city: "Riyadh" },
    items: [{ title: "Graduation Gift Box", quantity: 1 }],
  },
];

export default function DeliveryScreen() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [tab, setTab] = useState<"queue" | "history">("queue");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    const response = await deliveryAPI.getOrders();
    if (response.success) {
      const serverOrders = response.orders || [];
      setOrders(serverOrders.length ? serverOrders : MOCK_DELIVERY_ORDERS);
    } else if (user?.email === "delivery@warda.app") {
      setOrders(MOCK_DELIVERY_ORDERS);
    } else if (!isRefresh) {
      Alert.alert("Could not load deliveries", response.message || "Please try again.");
    }
    setLoading(false);
    setRefreshing(false);
  }, [user?.email]);

  useFocusEffect(useCallback(() => { loadOrders(); }, [loadOrders]));

  const visibleOrders = useMemo(
    () => orders.filter((order) => tab === "queue" ? ACTIVE_STATUSES.includes(order.status) : order.status === "delivered"),
    [orders, tab]
  );

  const updateStatus = async (order: any) => {
    const action = nextStatus[order.status];
    if (!action) return;
    if (String(order._id).startsWith("mock-")) {
      setOrders((current) => current.map((item) => item._id === order._id ? { ...item, status: action.status } : item));
      return;
    }
    const response = await deliveryAPI.updateStatus(order._id, action.status, `Updated by ${user?.name || "delivery partner"}`);
    if (response.success) {
      setOrders((current) => current.map((item) => item._id === order._id ? { ...item, status: action.status } : item));
    } else {
      Alert.alert("Update failed", response.message || "Please try again.");
    }
  };

  const call = (phone?: string) => phone && Linking.openURL(`tel:${phone}`);
  const openMap = (address?: string) => address && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
  const signOut = () => Alert.alert("Sign out", "Sign out of the delivery account?", [
    { text: "Cancel", style: "cancel" },
    { text: "Sign out", style: "destructive", onPress: async () => { await logout(); router.replace("/(auth)/login"); } },
  ]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadOrders(true)} tintColor={theme.colors.brand} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <WardaText variant="caption" color={theme.colors.textMuted}>DELIVERY WORKSPACE</WardaText>
            <WardaText variant="h2" style={styles.title}>Good day, {user?.name?.split(" ")[0] || "Partner"}</WardaText>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => loadOrders(true)} style={styles.iconButton}>
              <Feather name="refresh-cw" size={19} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={signOut} style={styles.iconButton}>
              <Feather name="log-out" size={19} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.metrics, { borderColor: theme.colors.border }]}>
          <Metric label="Active" value={orders.filter((o) => ACTIVE_STATUSES.includes(o.status)).length} theme={theme} />
          <Metric label="Ready" value={orders.filter((o) => o.status === "preparing").length} theme={theme} />
          <Metric label="Delivered" value={orders.filter((o) => o.status === "delivered").length} theme={theme} />
        </View>

        <View style={[styles.tabs, { borderBottomColor: theme.colors.border }]}>
          {(["queue", "history"] as const).map((item) => (
            <TouchableOpacity key={item} onPress={() => setTab(item)} style={[styles.tab, tab === item && { borderBottomColor: theme.colors.brand }]}>
              <WardaText weight="bold" color={tab === item ? theme.colors.brand : theme.colors.textMuted}>{item === "queue" ? "Today’s queue" : "Completed"}</WardaText>
            </TouchableOpacity>
          ))}
        </View>

        {!loading && visibleOrders.length === 0 ? (
          <View style={styles.empty}>
            <Feather name={tab === "queue" ? "check-circle" : "archive"} size={28} color={theme.colors.textMuted} />
            <WardaText variant="h3" style={{ marginTop: 14 }}>{tab === "queue" ? "You’re all caught up" : "No completed deliveries yet"}</WardaText>
            <WardaText variant="body" color={theme.colors.textMuted} align="center" style={styles.emptyText}>
              {tab === "queue" ? "New orders will appear here when they are ready for delivery." : "Your delivered orders will be kept here for reference."}
            </WardaText>
          </View>
        ) : visibleOrders.map((order) => {
          const address = order.deliveryAddress?.address || order.deliveryAddress?.city || "Address not provided";
          const recipient = order.recipientName || order.deliveryAddress?.fullName || order.user?.name || "Customer";
          const phone = order.recipientPhone || order.deliveryAddress?.phone || order.user?.phone;
          const item = order.items?.[0];
          const action = nextStatus[order.status];
          return (
            <View key={order._id} style={[styles.order, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.orderTop}>
                <View>
                  <WardaText variant="caption" color={theme.colors.textMuted}>{order.orderNumber || "ORDER"}</WardaText>
                  <WardaText variant="h3" style={styles.recipient}>{recipient}</WardaText>
                </View>
                <WardaText weight="bold" color={order.status === "delivered" ? "#16845B" : theme.colors.brand}>{statusLabel[order.status] || order.status}</WardaText>
              </View>
              <WardaText variant="body" color={theme.colors.textMuted} numberOfLines={2} style={styles.address}>{address}</WardaText>
              <View style={styles.orderMeta}>
                <WardaText variant="caption" color={theme.colors.textMuted}>{order.items?.length || 0} item{order.items?.length === 1 ? "" : "s"} · {item?.title || "Gift order"}</WardaText>
                <WardaText weight="bold">${Number(order.total || 0).toFixed(2)}</WardaText>
              </View>
              <View style={styles.actions}>
                {phone && <TouchableOpacity onPress={() => call(phone)} style={[styles.secondary, { borderColor: theme.colors.border }]}><Feather name="phone" size={16} color={theme.colors.text} /><WardaText weight="bold" style={styles.actionText}>Call</WardaText></TouchableOpacity>}
                <TouchableOpacity onPress={() => openMap(address)} style={[styles.secondary, { borderColor: theme.colors.border }]}><Feather name="navigation" size={16} color={theme.colors.text} /><WardaText weight="bold" style={styles.actionText}>Navigate</WardaText></TouchableOpacity>
                {action && <TouchableOpacity
                  onPress={() => updateStatus(order)}
                  style={[styles.primary, { backgroundColor: action.status === "delivered" ? "#238B62" : "#3B82F6" }]}
                >
                  <WardaText weight="bold" color="#FFFFFF">{action.label}</WardaText>
                  <Feather name="arrow-right" size={16} color="#FFFFFF" />
                </TouchableOpacity>}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ label, value, theme }: any) {
  return <View style={styles.metric}><WardaText variant="h2">{value}</WardaText><WardaText variant="caption" color={theme.colors.textMuted}>{label}</WardaText></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 120 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  headerActions: { flexDirection: "row", gap: 8 },
  title: { marginTop: 5 },
  iconButton: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  metrics: { flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 16, marginBottom: 22 },
  metric: { flex: 1, paddingLeft: 4 },
  tabs: { flexDirection: "row", borderBottomWidth: 1, marginBottom: 4 },
  tab: { paddingVertical: 13, marginRight: 26, borderBottomWidth: 2, borderBottomColor: "transparent" },
  order: { paddingVertical: 20, borderBottomWidth: 1 },
  orderTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  recipient: { marginTop: 5 },
  address: { marginTop: 10, lineHeight: 20 },
  orderMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
  actions: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 16 },
  secondary: { height: 42, paddingHorizontal: 12, borderWidth: 1, borderRadius: 21, flexDirection: "row", alignItems: "center", gap: 6 },
  primary: { height: 42, paddingHorizontal: 14, borderRadius: 21, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  actionText: { fontSize: 12 },
  empty: { alignItems: "center", paddingTop: 90, paddingHorizontal: 30 },
  emptyText: { marginTop: 8, lineHeight: 21 },
});
