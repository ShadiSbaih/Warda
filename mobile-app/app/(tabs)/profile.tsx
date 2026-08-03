import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
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
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import UserCard from "../../components/profile/UserCard";
import StatsCard from "../../components/profile/StatsCard";
import MenuSection from "../../components/profile/MenuSection";
import MenuItem from "../../components/profile/MenuItem";
import HelpCard from "../../components/profile/HelpCard";

import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { useReminders } from "../../context/RemindersContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const VOUCHERS = [
  { code: "WARDA20", discount: "20% OFF", desc: "Valid on all rose bouquets & chocolate boxes" },
  { code: "WELCOME", discount: "$15 OFF", desc: "First order welcome gift discount" },
  { code: "VIP50", discount: "50% OFF", desc: "VIP exclusive special reward" },
  { code: "GIFT10", discount: "$10 OFF", desc: "Express delivery special credit" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, loginDemoUser } = useAuth();
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
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.pureWhite} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => router.push("/notifications")}
          >
            <Feather name="bell" size={20} color={RainbowColors.inkBlack} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* User Card */}
          <UserCard
            name={user?.name || "Sarah Al-Ghamdi"}
            email={user?.email || "sarah@warda.app"}
            onEditPress={() => router.push("/edit-profile")}
          />

          {/* Stats Bar */}
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

          {/* Activity Section */}
          <MenuSection title="My Activity">
            <MenuItem
              icon="package"
              title="My Orders"
              subtitle="Track active & past gift orders"
              badge={orders.filter((o) => o.status === "on_the_way").length > 0 ? "Active" : undefined}
              badgeColor="#10B981"
              onPress={() => router.push("/(tabs)/orders")}
            />
            <MenuItem
              icon="heart"
              title="Saved Wishlist"
              subtitle="View your favorite flower arrangements"
              badge={`${favoritesCount}`}
              badgeColor={RainbowColors.tangerine}
              iconColor="#EF4444"
              iconBgColor="#FEF2F2"
              onPress={() => router.push("/(tabs)/favorites")}
            />
            <MenuItem
              icon="bell"
              title="Occasion Reminders"
              subtitle="Birthdays, anniversaries & milestones"
              badge={`${reminders.length}`}
              badgeColor="#3B82F6"
              iconColor="#3B82F6"
              iconBgColor="#EFF6FF"
              onPress={() => router.push("/reminders")}
            />
            <MenuItem
              icon="gift"
              title="Promo Vouchers"
              subtitle="Special discounts & gift vouchers"
              badge="4 Active"
              badgeColor="#10B981"
              iconColor="#10B981"
              iconBgColor="#ECFDF5"
              onPress={() => setVouchersModalVisible(true)}
            />
          </MenuSection>

          {/* Preferences Section */}
          <MenuSection title="Preferences & Account">
            <MenuItem
              icon="map-pin"
              title="Delivery Addresses"
              subtitle="Home, Office & Recipient addresses"
              onPress={() => router.push("/delivery-address")}
            />
            <MenuItem
              icon="credit-card"
              title="Payment Methods"
              subtitle="Apple Pay, Saved Cards, Mada"
              onPress={() => router.push("/payment")}
            />
            <MenuItem
              icon="globe"
              title="Language & Currency"
              subtitle="English · SAR (Saudi Riyal)"
              onPress={() =>
                Alert.alert(
                  "Language & Currency",
                  "Currently set to English & SAR. Multi-currency support is enabled for the MVP."
                )
              }
            />
          </MenuSection>

          {/* Help & Support */}
          <HelpCard
            onContactSupport={() => router.push("/chat")}
            onFAQPress={() =>
              Alert.alert(
                "Warda FAQ",
                "• Delivery: 1-hour express within Riyadh & Jeddah.\n• Packaging: Complimentary satin wrapping & card.\n• Freshness Guarantee: 100% Dutch fresh roses."
              )
            }
          />

          {/* Account Actions */}
          <MenuSection title="Account Actions">
            <MenuItem
              icon="refresh-cw"
              title="Quick Switch Demo Account"
              subtitle="Reset session as VIP customer"
              iconColor="#8B5CF6"
              iconBgColor="#F3E8FF"
              onPress={async () => {
                await loginDemoUser();
                Alert.alert("Demo Account Ready", "Logged in as Sarah (VIP Customer)");
              }}
            />
            <MenuItem
              icon="log-out"
              title="Sign Out"
              isDestructive={true}
              onPress={handleLogout}
            />
          </MenuSection>
        </ScrollView>

        {/* Vouchers Modal */}
        <Modal
          visible={vouchersModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setVouchersModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Available Vouchers</Text>
                  <Text style={styles.modalSubtitle}>Tap any voucher to apply to your bag</Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setVouchersModalVisible(false)}
                >
                  <Feather name="x" size={20} color={RainbowColors.inkBlack} />
                </TouchableOpacity>
              </View>

              <View style={styles.vouchersList}>
                {VOUCHERS.map((v) => (
                  <TouchableOpacity
                    key={v.code}
                    style={[
                      styles.voucherCard,
                      copiedCode === v.code && styles.voucherCardActive,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => handleApplyVoucher(v.code)}
                  >
                    <View style={styles.voucherLeft}>
                      <View style={styles.voucherBadge}>
                        <Text style={styles.voucherDiscount}>{v.discount}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.voucherCode}>{v.code}</Text>
                        <Text style={styles.voucherDesc}>{v.desc}</Text>
                      </View>
                    </View>

                    <View style={styles.voucherApplyBtn}>
                      <Text style={styles.voucherApplyText}>
                        {copiedCode === v.code ? "Applied!" : "Apply"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
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
    fontSize: 28,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    letterSpacing: -0.5,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.inkBlack,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    backgroundColor: RainbowColors.pureWhite,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  modalSubtitle: {
    fontSize: 13,
    color: RainbowColors.stone,
    marginTop: 3,
  },
  version: {
    textAlign: "center",
    fontSize: 13,
    color: RainbowColors.stone,
    marginTop: 20,
    marginBottom: 40,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  vouchersList: {
    gap: 12,
  },
  voucherCard: {
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    flexDirection: "row",
    alignItems: "center",
  },
  voucherCardActive: {
    borderColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  voucherLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  voucherBadge: {
    backgroundColor: RainbowColors.tangerine,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RainbowRadii.pills,
  },
  voucherDiscount: {
    fontSize: 17,
    fontWeight: "800",
    color: RainbowColors.pureWhite,
  },
  voucherCode: {
    fontSize: 15,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  voucherDesc: {
    fontSize: 12.5,
    color: RainbowColors.stone,
    lineHeight: 18,
  },
  voucherApplyBtn: {
    backgroundColor: RainbowColors.pureWhite,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RainbowRadii.pills,
    borderWidth: 1,
    borderColor: RainbowColors.tangerine,
    marginLeft: 8,
  },
  voucherApplyText: {
    color: RainbowColors.tangerine,
    fontWeight: "700",
    fontSize: 13,
  },
});