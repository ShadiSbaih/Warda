import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Order, useOrders } from "../../context/OrdersContext";
import { useCart } from "../../context/CartContext";

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; bg: string; text: string; icon: keyof typeof Feather.glyphMap }
> = {
  confirmed: {
    label: "Order Confirmed",
    bg: "#EFF6FF",
    text: "#2563EB",
    icon: "check-circle",
  },
  preparing: {
    label: "Arranging Bouquet",
    bg: "#FFFBEB",
    text: "#D97706",
    icon: "package",
  },
  on_the_way: {
    label: "Out for Delivery",
    bg: "#ECFDF5",
    text: "#059669",
    icon: "truck",
  },
  delivered: {
    label: "Delivered",
    bg: "#F3E8FF",
    text: "#7C3AED",
    icon: "gift",
  },
  cancelled: {
    label: "Cancelled",
    bg: "#FEF2F2",
    text: "#DC2626",
    icon: "x-circle",
  },
};

export default function OrdersScreen() {
  const router = useRouter();
  const { orders, cancelOrder } = useOrders();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const activeOrders = orders.filter(
    (o) => o.status === "on_the_way" || o.status === "preparing" || o.status === "confirmed"
  );
  const pastOrders = orders.filter(
    (o) => o.status === "delivered" || o.status === "cancelled"
  );

  const displayedOrders = activeTab === "active" ? activeOrders : pastOrders;

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(
        { id: item.productId, name: item.title, price: item.price, image: item.image },
        item.quantity,
        {
          wrappingColor: item.wrappingColor,
          wrappingName: item.wrappingName,
          giftMessage: item.giftMessage,
        }
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
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => cancelOrder(orderId),
        },
      ]
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.pureWhite} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My Gift Orders</Text>
            <Text style={styles.headerSub}>Live tracking & delivery receipts</Text>
          </View>

          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => router.push("/notifications")}
          >
            <Feather name="bell" size={20} color={RainbowColors.inkBlack} />
          </TouchableOpacity>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "active" && styles.tabBtnActive]}
            onPress={() => setActiveTab("active")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "active" && styles.tabTextActive,
              ]}
            >
              Active Orders ({activeOrders.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "history" && styles.tabBtnActive]}
            onPress={() => setActiveTab("history")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "history" && styles.tabTextActive,
              ]}
            >
              Order History ({pastOrders.length})
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {displayedOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconCircle}>
                <Ionicons
                  name={activeTab === "active" ? "gift-outline" : "file-tray-outline"}
                  size={42}
                  color={RainbowColors.tangerine}
                />
              </View>
              <Text style={styles.emptyTitle}>
                {activeTab === "active"
                  ? "No active gift deliveries"
                  : "No past orders yet"}
              </Text>
              <Text style={styles.emptyDesc}>
                {activeTab === "active"
                  ? "Surprise someone special today with a luxury flower arrangement."
                  : "Your completed orders and receipts will appear here."}
              </Text>
              <TouchableOpacity
                style={styles.browseBtn}
                activeOpacity={0.9}
                onPress={() => router.push("/(tabs)/menu")}
              >
                <Text style={styles.browseBtnText}>Explore Gift Catalog</Text>
                <Feather name="arrow-right" size={16} color={RainbowColors.pureWhite} />
              </TouchableOpacity>
            </View>
          ) : (
            displayedOrders.map((order) => {
              const statusCfg = STATUS_CONFIG[order.status];
              return (
                <View key={order.id} style={styles.orderCard}>
                  {/* Top Bar: ID + Status Pill */}
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={styles.orderId}>
                        Order #{order.id.slice(-6).toUpperCase()}
                      </Text>
                      <Text style={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusPill,
                        { backgroundColor: statusCfg.bg },
                      ]}
                    >
                      <Feather
                        name={statusCfg.icon}
                        size={12}
                        color={statusCfg.text}
                      />
                      <Text
                        style={[styles.statusText, { color: statusCfg.text }]}
                      >
                        {statusCfg.label}
                      </Text>
                    </View>
                  </View>

                  {/* ETA Banner for active orders */}
                  {order.status === "on_the_way" && (
                    <View style={styles.etaBanner}>
                      <View style={styles.etaLeft}>
                        <MaterialCommunityIcons
                          name="moped"
                          size={20}
                          color="#059669"
                        />
                        <Text style={styles.etaText}>
                          Driver Tariq is on the way · ~18 mins away
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          router.push({
                            pathname: "/live-tracking",
                            params: { orderId: order.id },
                          })
                        }
                      >
                        <Text style={styles.etaLink}>Live Map</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Items Preview */}
                  <View style={styles.itemsList}>
                    {order.items.map((item, idx) => (
                      <View key={idx} style={styles.itemRow}>
                        <Image
                          source={item.image}
                          style={styles.itemImage}
                          resizeMode="contain"
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                          <Text numberOfLines={1} style={styles.itemName}>
                            {item.title}
                          </Text>
                          <Text style={styles.itemMeta}>
                            Qty: {item.quantity}{" "}
                            {item.wrappingName ? `• ${item.wrappingName}` : ""}
                          </Text>
                        </View>
                        <Text style={styles.itemPrice}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Destination Info */}
                  <View style={styles.destRow}>
                    <Ionicons name="location-outline" size={15} color={RainbowColors.stone} />
                    <Text numberOfLines={1} style={styles.destText}>
                      {order.address}
                    </Text>
                  </View>

                  {/* Footer: Price & Actions */}
                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.totalLabel}>Total Paid</Text>
                      <Text style={styles.totalPrice}>${order.total.toFixed(2)}</Text>
                    </View>

                    <View style={styles.actionsRow}>
                      {order.status === "on_the_way" || order.status === "preparing" ? (
                        <>
                          <TouchableOpacity
                            style={styles.trackBtn}
                            activeOpacity={0.88}
                            onPress={() =>
                              router.push({
                                pathname: "/live-tracking",
                                params: { orderId: order.id },
                              })
                            }
                          >
                            <Feather name="navigation" size={14} color={RainbowColors.pureWhite} />
                            <Text style={styles.trackBtnText}>Track GPS</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.chatBtn}
                            activeOpacity={0.88}
                            onPress={() =>
                              router.push({
                                pathname: "/chat",
                                params: { orderId: order.id },
                              })
                            }
                          >
                            <Ionicons
                              name="chatbubble-ellipses-outline"
                              size={16}
                              color={RainbowColors.inkBlack}
                            />
                          </TouchableOpacity>
                        </>
                      ) : order.status === "delivered" ? (
                        <>
                          <TouchableOpacity
                            style={styles.reorderBtn}
                            activeOpacity={0.88}
                            onPress={() => handleReorder(order)}
                          >
                            <Feather name="repeat" size={14} color={RainbowColors.tangerine} />
                            <Text style={styles.reorderText}>Re-order</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.reviewBtn}
                            activeOpacity={0.88}
                            onPress={() =>
                              router.push({
                                pathname: "/review",
                                params: { orderId: order.id },
                              })
                            }
                          >
                            <Feather name="star" size={14} color={RainbowColors.pureWhite} />
                            <Text style={styles.reviewBtnText}>Review</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          style={styles.reorderBtn}
                          activeOpacity={0.88}
                          onPress={() => handleReorder(order)}
                        >
                          <Feather name="repeat" size={14} color={RainbowColors.tangerine} />
                          <Text style={styles.reorderText}>Re-order</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  headerSub: {
    fontSize: 13,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: RainbowRadii.cards,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 14,
    padding: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  tabBtnActive: {
    backgroundColor: RainbowColors.pureWhite,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: RainbowColors.stone,
  },
  tabTextActive: {
    color: RainbowColors.tangerine,
    fontWeight: "800",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 130,
    gap: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13.5,
    color: RainbowColors.stone,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  browseBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.tangerine,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RainbowRadii.pills,
    gap: 8,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  browseBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 14,
    fontWeight: "700",
  },
  orderCard: {
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 16,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: RainbowColors.cloudSurface,
    paddingBottom: 12,
  },
  orderId: {
    fontSize: 15,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  orderDate: {
    fontSize: 12,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 5,
  },
  statusText: {
    fontSize: 11.5,
    fontWeight: "700",
  },
  etaBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 10,
  },
  etaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  etaText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#059669",
    flex: 1,
  },
  etaLink: {
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
    textDecorationLine: "underline",
  },
  itemsList: {
    paddingVertical: 10,
    gap: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: RainbowColors.cloudSurface,
  },
  itemName: {
    fontSize: 13.5,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  itemMeta: {
    fontSize: 11.5,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 13.5,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  destRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.cloudSurface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RainbowRadii.cards,
    gap: 6,
    marginBottom: 12,
  },
  destText: {
    fontSize: 12,
    color: RainbowColors.stone,
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: RainbowColors.cloudSurface,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 11,
    color: RainbowColors.stone,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "900",
    color: RainbowColors.tangerine,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.tangerine,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RainbowRadii.pills,
    gap: 6,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  trackBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 12.5,
    fontWeight: "700",
  },
  chatBtn: {
    width: 36,
    height: 36,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  reorderBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.cloudSurface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RainbowRadii.pills,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    gap: 6,
  },
  reorderText: {
    color: RainbowColors.tangerine,
    fontSize: 12.5,
    fontWeight: "700",
  },
  reviewBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFA726",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RainbowRadii.pills,
    gap: 6,
  },
  reviewBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 12.5,
    fontWeight: "700",
  },
});