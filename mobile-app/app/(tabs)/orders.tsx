import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaBadge, WardaButton, WardaCard, WardaIconButton, WardaText } from "../../components/ui";
import { Order, useOrders } from "../../context/OrdersContext";
import { useCart } from "../../context/CartContext";

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; variant: "info" | "warning" | "success" | "brand" | "error"; icon: keyof typeof Feather.glyphMap }
> = {
  confirmed: { label: "Order Confirmed", variant: "info", icon: "check-circle" },
  preparing: { label: "Arranging Bouquet", variant: "warning", icon: "package" },
  on_the_way: { label: "Out for Delivery", variant: "success", icon: "truck" },
  delivered: { label: "Delivered", variant: "brand", icon: "gift" },
  cancelled: { label: "Cancelled", variant: "error", icon: "x-circle" },
};

export default function OrdersScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { orders, cancelOrder } = useOrders();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const activeOrders = orders.filter((o) => o.status === "on_the_way" || o.status === "preparing" || o.status === "confirmed");
  const pastOrders = orders.filter((o) => o.status === "delivered" || o.status === "cancelled");
  const displayedOrders = activeTab === "active" ? activeOrders : pastOrders;

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(
        { id: item.product, name: item.title, price: item.unitPrice, image: item.image },
        item.quantity,
        { wrappingColor: item.wrappingColor, wrappingName: item.wrappingName, giftMessage: item.giftMessage }
      );
    });
    Alert.alert(
      "Added to Bag",
      `Items from order #${order.id.slice(-4)} were added to your gift bag!`,
      [
        { text: "View Bag", onPress: () => router.push("/(tabs)/cart") },
        { text: "Continue Shopping" },
      ]
    );
  };

  const handleCancel = (orderId: string) => {
    Alert.alert(
      "Cancel Order",
      "Are you sure you want to cancel this order? A full refund will be processed immediately.",
      [
        { text: "No", style: "cancel" },
        { text: "Yes, Cancel", style: "destructive", onPress: () => cancelOrder(orderId) },
      ]
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <View>
            <WardaText variant="h1">My Gift Orders</WardaText>
            <WardaText variant="caption" color={theme.colors.textMuted}>
              Live tracking & delivery receipts
            </WardaText>
          </View>
          <WardaIconButton icon="bell" onPress={() => router.push("/notifications")} />
        </View>

        <View style={[styles.tabBar, { backgroundColor: theme.colors.background }]}>
          <TabButton active={activeTab === "active"} label={`Active Orders (${activeOrders.length})`} onPress={() => setActiveTab("active")} />
          <TabButton active={activeTab === "history"} label={`Order History (${pastOrders.length})`} onPress={() => setActiveTab("history")} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {displayedOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={[styles.emptyIconCircle, { backgroundColor: theme.colors.brandLight }]}>
                <Ionicons
                  name={activeTab === "active" ? "gift-outline" : "file-tray-outline"}
                  size={42}
                  color={theme.colors.brand}
                />
              </View>
              <WardaText variant="h2" style={{ marginBottom: 6 }}>
                {activeTab === "active" ? "No active gift deliveries" : "No past orders yet"}
              </WardaText>
              <WardaText variant="body" align="center" color={theme.colors.textMuted} style={{ marginBottom: 24, paddingHorizontal: 24 }}>
                {activeTab === "active"
                  ? "Surprise someone special today with a luxury flower arrangement."
                  : "Your completed orders and receipts will appear here."}
              </WardaText>
              <WardaButton title="Explore Gift Catalog" iconRight="arrow-right" onPress={() => router.push("/(tabs)/menu")} />
            </View>
          ) : (
            <View style={styles.list}>
              {displayedOrders.map((order) => (
                <OrderCard key={order.id} order={order} theme={theme} router={router} onReorder={handleReorder} onCancel={handleCancel} />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function TabButton({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.tabBtn,
        { backgroundColor: active ? theme.colors.brand : "transparent" },
      ]}
    >
      <WardaText variant="caption" weight={active ? "bold" : "semibold"} color={active ? theme.colors.textInverse : theme.colors.textMuted}>
        {label}
      </WardaText>
    </TouchableOpacity>
  );
}

function OrderCard({
  order,
  theme,
  router,
  onReorder,
  onCancel,
}: {
  order: Order;
  theme: any;
  router: any;
  onReorder: (o: Order) => void;
  onCancel: (id: string) => void;
}) {
  const statusCfg = STATUS_CONFIG[order.status];

  return (
    <WardaCard radius="xl" padding="md" shadow="md" style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View>
          <WardaText variant="body" weight="extrabold">
            Order #{order.id.slice(-6).toUpperCase()}
          </WardaText>
          <WardaText variant="caption" color={theme.colors.textMuted}>
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </WardaText>
        </View>
        <WardaBadge
          text={statusCfg.label}
          variant={statusCfg.variant}
          icon={statusCfg.icon as any}
        />
      </View>

      {order.status === "on_the_way" && (
        <View style={[styles.etaBanner, { backgroundColor: theme.colors.successSurface, borderColor: theme.colors.success + "30" }]}>
          <MaterialCommunityIcons name="moped" size={22} color={theme.colors.success} />
          <View style={styles.etaTextGroup}>
            <WardaText variant="caption" weight="bold" color={theme.colors.success} numberOfLines={1}>
              Driver Tariq is on the way
            </WardaText>
            <WardaText variant="caption" color={theme.colors.success} numberOfLines={1} style={{ opacity: 0.85 }}>
              ~18 mins away
            </WardaText>
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.liveMapBtn, { backgroundColor: theme.colors.success }]}
            onPress={() => router.push({ pathname: "/live-tracking", params: { orderId: order.id } })}
          >
            <Feather name="navigation" size={12} color="#FFF" />
            <WardaText variant="caption" weight="bold" color="#FFF">
              Live Map
            </WardaText>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.itemsList, { borderColor: theme.colors.borderSubtle }]}>
        {order.items.map((item, idx) => {
          const unitPrice = Number(item.unitPrice ?? (item as any).price ?? 0);
          const quantity = Number(item.quantity || 1);
          const itemTotal = isNaN(unitPrice) ? 0 : unitPrice * quantity;

          return (
            <View key={idx} style={styles.itemRow}>
              <Image
                source={
                  typeof item.image === "string" && item.image
                    ? { uri: item.image }
                    : (item.image as any) || require("../../assets/gifts/red-roses.png")
                }
                style={styles.itemImage}
                resizeMode="contain"
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <WardaText variant="body" weight="semibold" numberOfLines={1}>
                  {item.title}
                </WardaText>
                <WardaText variant="caption" color={theme.colors.textMuted}>
                  Qty: {quantity} {item.wrappingName ? `• ${item.wrappingName}` : ""}
                </WardaText>
              </View>
              <WardaText variant="body" weight="bold" color={theme.colors.brand}>
                ${itemTotal.toFixed(2)}
              </WardaText>
            </View>
          );
        })}
      </View>

      <View style={styles.destRow}>
        <Ionicons name="location-outline" size={15} color={theme.colors.textMuted} />
        <WardaText variant="caption" color={theme.colors.textMuted} numberOfLines={1} style={{ flex: 1, marginLeft: 4 }}>
          {order.address}
        </WardaText>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <WardaText variant="caption" color={theme.colors.textMuted}>
            Total Paid
          </WardaText>
          <WardaText variant="h2" color={theme.colors.brand}>
            ${(Number(order.total) || 0).toFixed(2)}
          </WardaText>
        </View>

        <View style={styles.actionsRow}>
          {order.status === "on_the_way" || order.status === "preparing" ? (
            <>
              <WardaButton
                title="Track GPS"
                icon="navigation"
                size="sm"
                onPress={() => router.push({ pathname: "/live-tracking", params: { orderId: order.id } })}
              />
              <WardaIconButton icon="message-circle" onPress={() => router.push({ pathname: "/chat", params: { orderId: order.id } })} />
            </>
          ) : order.status === "delivered" ? (
            <>
              <WardaButton
                title="Re-order"
                variant="outline"
                icon="repeat"
                size="sm"
                onPress={() => onReorder(order)}
              />
              <WardaButton title="Review" icon="star" size="sm" onPress={() => router.push({ pathname: "/review", params: { orderId: order.id } })} />
            </>
          ) : (
            <WardaButton title="Re-order" variant="outline" icon="repeat" size="sm" onPress={() => onReorder(order)} />
          )}
        </View>
      </View>

      {(order.status === "confirmed" || order.status === "preparing") && (
        <TouchableOpacity activeOpacity={0.75} onPress={() => onCancel(order.id)} style={[styles.cancelLink, { borderTopColor: theme.colors.borderSubtle }]}>
          <WardaText variant="caption" weight="bold" color={theme.colors.error}>
            Cancel Order
          </WardaText>
        </TouchableOpacity>
      )}
    </WardaCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tabBar: {
    flexDirection: "row",
    borderRadius: 999,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 14,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 999,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyState: {
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },
  list: {
    gap: 16,
  },
  orderCard: {
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  etaBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    borderWidth: 1,
  },
  etaTextGroup: {
    flex: 1,
    marginLeft: 8,
    marginRight: 6,
  },
  liveMapBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  itemsList: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 14,
    marginBottom: 12,
    gap: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  destRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cancelLink: {
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
  },
});
