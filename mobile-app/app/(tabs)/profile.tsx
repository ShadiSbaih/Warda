import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaIconButton, WardaText } from "../../components/ui";

import UserCard from "../../components/profile/UserCard";
import StatsCard from "../../components/profile/StatsCard";
import MenuSection from "../../components/profile/MenuSection";
import MenuItem from "../../components/profile/MenuItem";
import HelpCard from "../../components/profile/HelpCard";

import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { useReminders } from "../../context/RemindersContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

const VOUCHERS = [
  { code: "WARDA20", discount: "20% OFF", desc: "Valid on all rose bouquets & chocolate boxes" },
  { code: "WELCOME", discount: "$15 OFF", desc: "First order welcome gift discount" },
  { code: "VIP50", discount: "50% OFF", desc: "VIP exclusive special reward" },
  { code: "GIFT10", discount: "$10 OFF", desc: "Express delivery special credit" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const { favoritesCount } = useFavorites();
  const { reminders } = useReminders();
  const { applyPromo } = useCart();

  const [vouchersModalVisible, setVouchersModalVisible] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const handleApplyVoucher = async (code: string) => {
    await applyPromo(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
      setVouchersModalVisible(false);
      Alert.alert("Voucher Applied!", `Code "${code}" has been applied to your shopping bag.`, [
        { text: "View Bag", onPress: () => router.push("/(tabs)/cart") },
        { text: "OK" },
      ]);
    }, 800);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <WardaText variant="h1">My Profile</WardaText>
          <WardaIconButton icon="bell" onPress={() => router.push("/notifications")} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <UserCard
            name={user?.name || "Sarah Al-Ghamdi"}
            email={user?.email || "sarah@warda.app"}
            onEditPress={() => router.push("/edit-profile")}
          />

          <StatsCard
            ordersCount={orders.length}
            favoritesCount={favoritesCount}
            remindersCount={reminders.length}
            vouchersCount={VOUCHERS.length}
            onOrdersPress={() => router.push("/(tabs)/orders")}
            onFavoritesPress={() => router.push("/(tabs)/favorites")}
            onRemindersPress={() => router.push("/reminders")}
            onVouchersPress={() => setVouchersModalVisible(true)}
          />

          <MenuSection title="My Activity">
            <MenuItem
              icon="package"
              title="My Orders"
              subtitle="Track active & past gift orders"
              badge={orders.filter((o) => o.status === "on_the_way").length > 0 ? "Active" : undefined}
              badgeVariant="success"
              onPress={() => router.push("/(tabs)/orders")}
            />
            <MenuItem
              icon="heart"
              title="Saved Wishlist"
              subtitle="View your favorite flower arrangements"
              badge={`${favoritesCount}`}
              badgeVariant="error"
              iconColor={theme.colors.love}
              iconBgColor={theme.colors.errorSurface}
              onPress={() => router.push("/(tabs)/favorites")}
            />
            <MenuItem
              icon="bell"
              title="Occasion Reminders"
              subtitle="Birthdays, anniversaries & milestones"
              badge={`${reminders.length}`}
              badgeVariant="info"
              iconColor={theme.colors.info}
              iconBgColor={theme.colors.infoSurface}
              onPress={() => router.push("/reminders")}
            />
            <MenuItem
              icon="gift"
              title="Promo Vouchers"
              subtitle="Special discounts & gift vouchers"
              badge="4 Active"
              badgeVariant="success"
              iconColor={theme.colors.success}
              iconBgColor={theme.colors.successSurface}
              onPress={() => setVouchersModalVisible(true)}
            />
          </MenuSection>

          <MenuSection title="Preferences & Account">
            <MenuItem
              icon="map-pin"
              title="Delivery Addresses"
              subtitle="Home, Office & Recipient addresses"
              iconColor={theme.colors.brand}
              iconBgColor={theme.colors.brandLight}
              onPress={() => router.push("/delivery-address")}
            />
            <MenuItem
              icon="globe"
              title="Language & Currency"
              subtitle="English · SAR (Saudi Riyal)"
              iconColor={theme.colors.info}
              iconBgColor={theme.colors.infoSurface}
              onPress={() =>
                Alert.alert(
                  "Language & Currency",
                  "Currently set to English & SAR. Multi-currency support is enabled for the MVP."
                )
              }
            />
          </MenuSection>

          <HelpCard
            onContactSupport={() => router.push("/chat")}
            onFAQPress={() =>
              Alert.alert(
                "Warda FAQ",
                "• Delivery: 1-hour express within Riyadh & Jeddah.\n• Packaging: Complimentary satin wrapping & card.\n• Freshness Guarantee: 100% Dutch fresh roses."
              )
            }
          />

          <MenuSection title="Account Actions">
            <MenuItem
              icon="log-out"
              title="Sign Out"
              isDestructive
              onPress={handleLogout}
            />
          </MenuSection>

          <WardaText variant="caption" align="center" color={theme.colors.textMuted} style={styles.version}>
            Warda Luxury Gifts v1.0
          </WardaText>
        </ScrollView>

        <Modal
          visible={vouchersModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setVouchersModalVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalOverlay}
            onPress={() => setVouchersModalVisible(false)}
          >
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: theme.colors.surface,
                  borderTopLeftRadius: theme.radii.xl,
                  borderTopRightRadius: theme.radii.xl,
                },
              ]}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.modalHeader}>
                <View>
                  <WardaText variant="h2">Available Vouchers</WardaText>
                  <WardaText variant="caption" color={theme.colors.textMuted}>
                    Tap any voucher to apply to your bag
                  </WardaText>
                </View>
                <WardaIconButton icon="x" size="md" onPress={() => setVouchersModalVisible(false)} />
              </View>

              <View style={styles.vouchersList}>
                {VOUCHERS.map((v) => (
                  <TouchableOpacity
                    key={v.code}
                    activeOpacity={0.85}
                    onPress={() => handleApplyVoucher(v.code)}
                    style={[
                      styles.voucherCard,
                      { backgroundColor: theme.colors.background, borderColor: theme.colors.borderSubtle },
                      copiedCode === v.code && {
                        backgroundColor: theme.colors.successSurface,
                        borderColor: theme.colors.success,
                      },
                    ]}
                  >
                    <View style={styles.voucherLeft}>
                      <View style={[styles.voucherBadge, { backgroundColor: theme.colors.brand }]}>
                        <Text style={[styles.voucherDiscount, { color: theme.colors.textInverse }]}>{v.discount}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <WardaText variant="body" weight="bold">
                          {v.code}
                        </WardaText>
                        <WardaText variant="caption" color={theme.colors.textMuted}>
                          {v.desc}
                        </WardaText>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.voucherApplyBtn,
                        {
                          backgroundColor: copiedCode === v.code ? theme.colors.success : theme.colors.surface,
                          borderColor: copiedCode === v.code ? theme.colors.success : theme.colors.brand,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.voucherApplyText,
                          { color: copiedCode === v.code ? theme.colors.textInverse : theme.colors.brand },
                        ]}
                      >
                        {copiedCode === v.code ? "Applied!" : "Apply"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </>
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
    paddingBottom: 40,
  },
  version: {
    marginTop: 16,
    marginBottom: 28,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    padding: 24,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  vouchersList: {
    gap: 10,
  },
  voucherCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  voucherLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  voucherBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
  },
  voucherDiscount: {
    fontSize: 16,
    fontWeight: "800",
  },
  voucherApplyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    marginLeft: 8,
  },
  voucherApplyText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
