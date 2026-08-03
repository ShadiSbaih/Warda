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
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import UserCard from "../../components/profile/UserCard";
import StatsCard from "../../components/profile/StatsCard";
import MenuSection from "../../components/profile/MenuSection";
import MenuItem from "../../components/profile/MenuItem";
import HelpCard from "../../components/profile/HelpCard";

import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useReminders } from "../../context/RemindersContext";
import { useCart } from "../../context/CartContext";

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
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => router.push("/notifications")}
          >
            <Feather name="bell" size={20} color="#1E1E2D" />
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
              badgeColor="#D4588A"
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
                  <Feather name="x" size={20} color="#1E1E2D" />
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
    backgroundColor: "#FDF6F9",
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
    color: "#1E1E2D",
  },
  settingsBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
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
    color: "#1E1E2D",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 3,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F3F7",
    justifyContent: "center",
    alignItems: "center",
  },
  vouchersList: {
    gap: 12,
  },
  voucherCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF9FC",
    borderWidth: 1.5,
    borderColor: "#FCE4EC",
    borderStyle: "dashed",
    borderRadius: 18,
    padding: 14,
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
    backgroundColor: "#D4588A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  voucherDiscount: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },
  voucherCode: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  voucherDesc: {
    fontSize: 11.5,
    color: "#777",
    marginTop: 2,
  },
  voucherApplyBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D4588A",
    marginLeft: 8,
  },
  voucherApplyText: {
    color: "#D4588A",
    fontWeight: "700",
    fontSize: 13,
  },
});