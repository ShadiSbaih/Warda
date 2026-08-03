import React from "react";
import { RainbowColors, RainbowRadii } from "../constants/Colors";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOrders } from "../context/OrdersContext";

export default function TrackingScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { orders } = useOrders();

  const activeOrder =
    orders.find((o) => o.id === orderId) ||
    orders.find((o) => o.status === "on_the_way" || o.status === "preparing") ||
    orders[0];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.pureWhite} />

      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Feather name="x" size={22} color={RainbowColors.inkBlack} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Order Status</Text>


        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Status Hero */}
          <View style={styles.statusHero}>
            <View style={styles.badgeRow}>
              <View style={styles.pulseDot} />
              <Text style={styles.badgeText}>Live Order Tracking</Text>
            </View>

            <Text style={styles.heroTitle}>
              {activeOrder?.status === "on_the_way"
                ? "Your gift is on the way!"
                : activeOrder?.status === "preparing"
                ? "Florists are arranging your gift 🌸"
                : activeOrder?.status === "delivered"
                ? "Gift delivered with love! 🎁"
                : "Order received and confirmed 📋"}
            </Text>

            <Text style={styles.etaText}>
              Estimated arrival in <Text style={styles.etaHighlight}>15–25 mins</Text>
            </Text>

            {/* Progress Stepper */}
            <View style={styles.stepperContainer}>
              <View style={styles.stepCircleActive}>
                <Feather name="check" size={14} color={RainbowColors.pureWhite} />
              </View>
              <View style={styles.stepLineActive} />

              <View style={styles.stepCircleActive}>
                <Feather name="package" size={14} color={RainbowColors.pureWhite} />
              </View>
              <View
                style={[
                  styles.stepLineActive,
                  activeOrder?.status === "confirmed" && styles.stepLineInactive,
                ]}
              />

              <View
                style={[
                  styles.stepCircleActive,
                  (activeOrder?.status === "confirmed" || activeOrder?.status === "preparing") &&
                    styles.stepCircleInactive,
                ]}
              >
                <MaterialCommunityIcons
                  name="moped"
                  size={16}
                  color={
                    activeOrder?.status === "on_the_way" || activeOrder?.status === "delivered"
                      ? RainbowColors.pureWhite
                      : RainbowColors.tangerine
                  }
                />
              </View>
              <View
                style={[
                  styles.stepLineActive,
                  activeOrder?.status !== "delivered" && styles.stepLineInactive,
                ]}
              />

              <View
                style={[
                  styles.stepCircleActive,
                  activeOrder?.status !== "delivered" && styles.stepCircleInactive,
                ]}
              >
                <Feather
                  name="home"
                  size={14}
                  color={activeOrder?.status === "delivered" ? RainbowColors.pureWhite : RainbowColors.tangerine}
                />
              </View>
            </View>

            <View style={styles.stepLabelsRow}>
              <Text style={styles.stepLabel}>Confirmed</Text>
              <Text style={styles.stepLabel}>Arranging</Text>
              <Text style={styles.stepLabel}>On the way</Text>
              <Text style={styles.stepLabel}>Delivered</Text>
            </View>
          </View>

          {/* Courier Card & Live Map Button */}
          <View style={styles.courierCard}>
            <View style={styles.courierInfo}>
              <View style={styles.courierAvatar}>
                <Text style={styles.avatarLetter}>T</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.courierName}>Tariq Al-Harbi</Text>
                <Text style={styles.courierRole}>VIP Express Delivery Partner</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFA726" />
                  <Text style={styles.ratingText}>4.9 · 1,420 deliveries</Text>
                </View>
              </View>
            </View>

            <View style={styles.courierActions}>
              <TouchableOpacity
                style={styles.gpsMapBtn}
                activeOpacity={0.88}
                onPress={() =>
                  router.push({
                    pathname: "/live-tracking",
                    params: { orderId: activeOrder?.id },
                  })
                }
              >
                <Feather name="navigation" size={16} color={RainbowColors.pureWhite} />
                <Text style={styles.gpsMapBtnText}>Open Live GPS Map</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.callCourierBtn}
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: "/chat",
                    params: { orderId: activeOrder?.id },
                  })
                }
              >
                <Ionicons name="chatbubbles" size={18} color={RainbowColors.tangerine} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Delivery Details Card */}
          {activeOrder && (
            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Delivery Summary</Text>

              <View style={styles.infoRow}>
                <Ionicons name="location" size={18} color={RainbowColors.tangerine} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.infoTitle}>Destination</Text>
                  <Text style={styles.infoSubtitle}>{activeOrder.address}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="card-text" size={18} color={RainbowColors.tangerine} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.infoTitle}>Recipient & Message</Text>
                  <Text style={styles.infoSubtitle}>
                    {activeOrder.recipientName || "Valued Recipient"} · "{activeOrder.giftMessage || "Enjoy your flowers! 🌸"}"
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.orderTotalRow}>
                <Text style={styles.orderTotalLabel}>
                  Total Paid ({activeOrder.items.length} items)
                </Text>
                <Text style={styles.orderTotalPrice}>${activeOrder.total.toFixed(2)}</Text>
              </View>
            </View>
          )}

          {/* Back Home Button */}
          <TouchableOpacity
            style={styles.homeBtn}
            activeOpacity={0.9}
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Feather name="arrow-left" size={18} color={RainbowColors.stone} />
            <Text style={styles.homeBtnText}>Return to Home</Text>
          </TouchableOpacity>
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
  closeBtn: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    marginInline:'auto'
  },
  chatBtn: {
    width: 42,
    height: 42,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  statusHero: {
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 20,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    marginBottom: 10,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    lineHeight: 28,
  },
  etaText: {
    fontSize: 14,
    color: RainbowColors.stone,
    marginTop: 6,
    marginBottom: 20,
  },
  etaHighlight: {
    fontWeight: "800",
    color: RainbowColors.tangerine,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  stepCircleActive: {
    width: 32,
    height: 32,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
  },
  stepCircleInactive: {
    backgroundColor: RainbowColors.cloudSurface,
    borderWidth: 1.5,
    borderColor: RainbowColors.cloudSurface,
  },
  stepLineActive: {
    flex: 1,
    height: 3,
    backgroundColor: RainbowColors.tangerine,
  },
  stepLineInactive: {
    backgroundColor: RainbowColors.cloudSurface,
  },
  stepLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 2,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: RainbowColors.stone,
  },
  courierCard: {
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 18,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  courierInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  courierAvatar: {
    width: 50,
    height: 50,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: RainbowColors.cloudSurface,
  },
  avatarLetter: {
    fontSize: 22,
    fontWeight: "800",
    color: RainbowColors.tangerine,
  },
  courierName: {
    fontSize: 16,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  courierRole: {
    fontSize: 12,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 11.5,
    color: RainbowColors.stone,
    fontWeight: "600",
  },
  courierActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  gpsMapBtn: {
    flex: 1,
    backgroundColor: RainbowColors.tangerine,
    height: 48,
    borderRadius: RainbowRadii.pills,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  gpsMapBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 14,
    fontWeight: "700",
  },
  callCourierBtn: {
    width: 48,
    height: 48,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  detailsCard: {
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 18,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  infoSubtitle: {
    fontSize: 12,
    color: RainbowColors.stone,
    marginTop: 2,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: RainbowColors.cloudSurface,
    marginVertical: 12,
  },
  orderTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  orderTotalLabel: {
    fontSize: 13.5,
    color: RainbowColors.stone,
    fontWeight: "600",
  },
  orderTotalPrice: {
    fontSize: 18,
    fontWeight: "900",
    color: RainbowColors.tangerine,
  },
  homeBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    gap: 6,
  },
  homeBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: RainbowColors.stone,
  },
});