import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useTheme } from "../context/ThemeContext";
import { WardaButton, WardaCard, WardaIconButton, WardaText } from "../components/ui";
import { useOrders } from "../context/OrdersContext";

const STEPS = [
  { key: "confirmed", label: "Confirmed", icon: "check" as const },
  { key: "preparing", label: "Arranging", icon: "package" as const },
  { key: "on_the_way", label: "On the way", icon: undefined },
  { key: "delivered", label: "Delivered", icon: "home" as const },
];

export default function TrackingScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { orderId } = useLocalSearchParams();
  const { orders } = useOrders();

  const activeOrder =
    orders.find((o) => o.id === orderId) ||
    orders.find((o) => o.status === "on_the_way" || o.status === "preparing") ||
    orders[0];

  const statusIndex = STEPS.findIndex((s) => s.key === activeOrder?.status) ?? 0;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <WardaIconButton icon="x" onPress={() => router.replace("/(tabs)/home")} />
          <WardaText variant="h2">Order Status</WardaText>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <WardaCard radius="xl" shadow="md" style={{ marginBottom: 16 }}>
            <View style={[styles.badgeRow, { backgroundColor: theme.colors.successSurface }]}>
              <View style={[styles.pulseDot, { backgroundColor: theme.colors.success }]} />
              <WardaText variant="caption" weight="bold" color={theme.colors.success}>
                Live Order Tracking
              </WardaText>
            </View>

            <WardaText variant="h1" style={{ marginBottom: 6 }}>
              {activeOrder?.status === "on_the_way"
                ? "Your gift is on the way!"
                : activeOrder?.status === "preparing"
                ? "Florists are arranging your gift 🌸"
                : activeOrder?.status === "delivered"
                ? "Gift delivered with love! 🎁"
                : "Order received and confirmed 📋"}
            </WardaText>

            <WardaText variant="body" color={theme.colors.textMuted}>
              Estimated arrival in{" "}
              <WardaText variant="body" weight="extrabold" color={theme.colors.brand}>
                15–25 mins
              </WardaText>
            </WardaText>

            <View style={styles.stepperContainer}>
              {STEPS.map((step, idx) => {
                const isActive = idx <= statusIndex;
                const isLast = idx === STEPS.length - 1;
                return (
                  <React.Fragment key={step.key}>
                    <View
                      style={[
                        styles.stepCircle,
                        {
                          backgroundColor: isActive ? theme.colors.brand : theme.colors.background,
                          borderColor: isActive ? theme.colors.brand : theme.colors.borderSubtle,
                        },
                      ]}
                    >
                      {step.key === "on_the_way" ? (
                        <MaterialCommunityIcons
                          name="moped"
                          size={16}
                          color={isActive ? theme.colors.textInverse : theme.colors.brand}
                        />
                      ) : step.icon ? (
                        <Feather name={step.icon} size={14} color={isActive ? theme.colors.textInverse : theme.colors.brand} />
                      ) : null}
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.stepLine,
                          { backgroundColor: idx < statusIndex ? theme.colors.brand : theme.colors.borderSubtle },
                        ]}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </View>

            <View style={styles.stepLabelsRow}>
              {STEPS.map((step) => (
                <WardaText key={step.key} variant="caption" weight="semibold" color={theme.colors.textMuted} style={{ flex: 1, textAlign: "center" }}>
                  {step.label}
                </WardaText>
              ))}
            </View>
          </WardaCard>

          <WardaCard radius="xl" shadow="md" style={{ marginBottom: 16 }}>
            <View style={styles.courierInfo}>
              <View style={[styles.courierAvatar, { backgroundColor: theme.colors.brandLight }]}>
                <WardaText variant="h2" color={theme.colors.brand}>
                  T
                </WardaText>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <WardaText variant="body" weight="bold">
                  Tariq Al-Harbi
                </WardaText>
                <WardaText variant="caption" color={theme.colors.textMuted}>
                  VIP Express Delivery Partner
                </WardaText>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color={theme.colors.warning} />
                  <WardaText variant="caption" color={theme.colors.textMuted}>
                    4.9 · 1,420 deliveries
                  </WardaText>
                </View>
              </View>
            </View>

            <View style={styles.courierActions}>
              <WardaButton
                title="Open Live GPS Map"
                icon="navigation"
                size="md"
                onPress={() =>
                  router.push({
                    pathname: "/live-tracking",
                    params: { orderId: activeOrder?.id },
                  })
                }
                style={{ flex: 1 }}
              />
              <WardaIconButton
                icon="message-circle"
                onPress={() => router.push({ pathname: "/chat", params: { orderId: activeOrder?.id } })}
              />
            </View>
          </WardaCard>

          {activeOrder && (
            <WardaCard radius="xl" shadow="md" style={{ marginBottom: 16 }}>
              <WardaText variant="h3" style={{ marginBottom: 14 }}>
                Delivery Summary
              </WardaText>

              <InfoRow
                icon={<Ionicons name="location" size={18} color={theme.colors.brand} />}
                title="Destination"
                subtitle={activeOrder.address}
              />
              <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
              <InfoRow
                icon={<MaterialCommunityIcons name="card-text" size={18} color={theme.colors.brand} />}
                title="Recipient & Message"
                subtitle={`${activeOrder.recipientName || "Valued Recipient"} · "${activeOrder.giftMessage || "Enjoy your flowers! 🌸"}"`}
              />
              <View style={[styles.divider, { backgroundColor: theme.colors.borderSubtle }]} />
              <View style={styles.orderTotalRow}>
                <WardaText variant="body" color={theme.colors.textMuted}>
                  Total Paid ({activeOrder.items.length} items)
                </WardaText>
                <WardaText variant="h2" color={theme.colors.brand}>
                  ${activeOrder.total.toFixed(2)}
                </WardaText>
              </View>
            </WardaCard>
          )}

          <WardaButton
            title="Return to Home"
            variant="secondary"
            icon="arrow-left"
            onPress={() => router.replace("/(tabs)/home")}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function InfoRow({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <View style={styles.infoRow}>
      {icon}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <WardaText variant="caption" weight="bold" color={useTheme().theme.colors.textMuted}>
          {title}
        </WardaText>
        <WardaText variant="body" color={useTheme().theme.colors.text} numberOfLines={2}>
          {subtitle}
        </WardaText>
      </View>
    </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
    marginBottom: 10,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    marginTop: 22,
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  stepLine: {
    flex: 1,
    height: 3,
    marginHorizontal: 4,
  },
  stepLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  courierInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  courierAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 4,
  },
  courierActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  orderTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
});
