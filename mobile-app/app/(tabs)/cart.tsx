import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCart } from "../../context/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const {
    items,
    itemsCount,
    subtotal,
    discount,
    deliveryFee,
    wrappingTotal,
    total,
    appliedPromo,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  const handleApplyPromo = async (codeToApply?: string) => {
    const code = codeToApply || promoInput;
    if (!code.trim()) return;
    const res = await applyPromo(code);
    setPromoFeedback(res.message);
    if (res.success) {
      setPromoInput("");
    }
  };

  const confirmClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure you want to remove all items?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: clearCart },
    ]);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#1E1E2D" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Shopping Bag</Text>
            <Text style={styles.headerSubtitle}>
              {itemsCount} {itemsCount === 1 ? "item" : "items"}
            </Text>
          </View>

          {items.length > 0 ? (
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={confirmClearCart}
            >
              <Feather name="trash-2" size={18} color="#E53935" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </View>

        {items.length === 0 ? (
          /* Empty State */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <MaterialCommunityIcons
                name="gift-open-outline"
                size={64}
                color="#D4588A"
              />
            </View>
            <Text style={styles.emptyTitle}>Your Bag is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Explore our curated flower bouquets and luxury gift collections to send love today.
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              activeOpacity={0.85}
              onPress={() => router.push("/(tabs)/menu")}
            >
              <Text style={styles.exploreBtnText}>Discover Gifts</Text>
              <Feather name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Delivery address banner */}
            <TouchableOpacity
              style={styles.addressBanner}
              activeOpacity={0.8}
              onPress={() => router.push("/delivery-address")}
            >
              <View style={styles.addressLeft}>
                <Ionicons name="location" size={20} color="#D4588A" />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.addressTitle}>Delivering to</Text>
                  <Text style={styles.addressText} numberOfLines={1}>
                    King Fahd Road, Al Olaya, Riyadh
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={18} color="#999" />
            </TouchableOpacity>

            {/* Cart Items List */}
            <View style={styles.itemsList}>
              {items.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardTop}>
                    {/* Item Image */}
                    <View style={styles.imageBox}>
                      <Image
                        source={item.image}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                    </View>

                    {/* Item Info */}
                    <View style={styles.infoBox}>
                      <View style={styles.titleRow}>
                        <Text numberOfLines={1} style={styles.itemTitle}>
                          {item.title}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeFromCart(item.id)}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <Feather name="x" size={18} color="#999" />
                        </TouchableOpacity>
                      </View>

                      {/* Wrapping badge */}
                      {item.wrappingColor && (
                        <View style={styles.wrappingBadge}>
                          <View
                            style={[
                              styles.colorDot,
                              { backgroundColor: item.wrappingColor },
                            ]}
                          />
                          <Text style={styles.wrappingText}>
                            {item.wrappingName || "Silk Wrap"}
                          </Text>
                        </View>
                      )}

                      {/* Recipient info if present */}
                      {item.recipientName && (
                        <Text style={styles.recipientTag} numberOfLines={1}>
                          For: {item.recipientName}
                        </Text>
                      )}

                      {/* Price & Quantity Controls */}
                      <View style={styles.bottomRow}>
                        <Text style={styles.price}>${item.price}</Text>

                        <View style={styles.qtyContainer}>
                          <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Feather name="minus" size={14} color="#333" />
                          </TouchableOpacity>
                          <Text style={styles.qtyText}>{item.quantity}</Text>
                          <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Feather name="plus" size={14} color="#333" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Gift message snippet if present */}
                  {item.giftMessage && (
                    <View style={styles.messageBox}>
                      <Feather name="message-square" size={13} color="#D4588A" />
                      <Text style={styles.messageText} numberOfLines={1}>
                        "{item.giftMessage}"
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>

            {/* Voucher Promo Code */}
            <View style={styles.promoSection}>
              <Text style={styles.sectionHeader}>Promo Voucher</Text>
              <View style={styles.promoInputRow}>
                <View style={styles.inputContainer}>
                  <Feather name="tag" size={18} color="#999" />
                  <TextInput
                    placeholder="Enter promo code"
                    placeholderTextColor="#A0A0A0"
                    value={promoInput}
                    onChangeText={setPromoInput}
                    autoCapitalize="characters"
                    style={styles.promoInput}
                  />
                </View>
                <TouchableOpacity
                  style={styles.applyBtn}
                  onPress={() => handleApplyPromo()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.applyBtnText}>Apply</Text>
                </TouchableOpacity>
              </View>

              {/* Quick Promo Chips */}
              <View style={styles.quickPromos}>
                <TouchableOpacity
                  style={styles.quickChip}
                  onPress={() => handleApplyPromo("WARDA20")}
                >
                  <Text style={styles.quickChipText}>✨ WARDA20 (20% OFF)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.quickChip}
                  onPress={() => handleApplyPromo("WELCOME")}
                >
                  <Text style={styles.quickChipText}>🎁 WELCOME ($15 OFF)</Text>
                </TouchableOpacity>
              </View>

              {appliedPromo && (
                <View style={styles.appliedPromoBadge}>
                  <View style={styles.appliedPromoLeft}>
                    <Feather name="check-circle" size={16} color="#10B981" />
                    <Text style={styles.appliedPromoText}>
                      Code <Text style={{ fontWeight: "700" }}>{appliedPromo.code}</Text> applied ({appliedPromo.description})
                    </Text>
                  </View>
                  <TouchableOpacity onPress={removePromo}>
                    <Feather name="x" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              )}

              {promoFeedback && !appliedPromo && (
                <Text style={styles.feedbackError}>{promoFeedback}</Text>
              )}
            </View>

            {/* Order Price Breakdown */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Price Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Luxury Gift Packaging</Text>
                <Text style={styles.summaryValue}>
                  ${wrappingTotal.toFixed(2)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>
                  {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                </Text>
              </View>

              {discount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: "#10B981" }]}>
                    Promo Discount
                  </Text>
                  <Text style={[styles.summaryValue, { color: "#10B981" }]}>
                    -${discount.toFixed(2)}
                  </Text>
                </View>
              )}

              <View style={styles.summaryDivider} />

              <View style={styles.summaryRowTotal}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            {/* Checkout Action Button */}
            <TouchableOpacity
              style={styles.checkoutBtn}
              activeOpacity={0.9}
              onPress={() => router.push("/checkout")}
            >
              <View>
                <Text style={styles.checkoutBtnSub}>
                  {itemsCount} {itemsCount === 1 ? "Item" : "Items"} · Express Delivery
                </Text>
                <Text style={styles.checkoutBtnTitle}>Proceed to Checkout</Text>
              </View>
              <View style={styles.checkoutBtnRight}>
                <Text style={styles.checkoutBtnPrice}>${total.toFixed(2)}</Text>
                <Feather name="arrow-right" size={20} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </ScrollView>
        )}
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FDF6F9",
  },
  backBtn: {
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
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  clearBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 130,
    paddingTop: 8,
  },
  addressBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  addressLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  addressTitle: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1E2D",
    marginTop: 2,
  },
  itemsList: {
    gap: 14,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTop: {
    flexDirection: "row",
  },
  imageBox: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#FCF6F8",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 78,
    height: 78,
  },
  infoBox: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E2D",
    flex: 1,
    marginRight: 8,
  },
  wrappingBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F8F8FA",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
    gap: 5,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  wrappingText: {
    fontSize: 11.5,
    color: "#666",
    fontWeight: "600",
  },
  recipientTag: {
    fontSize: 12,
    color: "#D4588A",
    fontWeight: "600",
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#D4588A",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F7",
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 8,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1E2D",
    minWidth: 16,
    textAlign: "center",
  },
  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8FB",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: "#FCE4EC",
  },
  messageText: {
    fontSize: 12,
    color: "#B03A72",
    fontStyle: "italic",
    flex: 1,
  },
  promoSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E2D",
    marginBottom: 10,
  },
  promoInputRow: {
    flexDirection: "row",
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8FA",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    gap: 10,
  },
  promoInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1E1E2D",
  },
  applyBtn: {
    backgroundColor: "#D4588A",
    borderRadius: 14,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  applyBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  quickPromos: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },
  quickChip: {
    backgroundColor: "#FFF0F5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#F8D7E8",
  },
  quickChipText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#D4588A",
  },
  appliedPromoBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },
  appliedPromoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  appliedPromoText: {
    fontSize: 12.5,
    color: "#065F46",
  },
  feedbackError: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 6,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E1E2D",
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#7E7E8F",
  },
  summaryValue: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#1E1E2D",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#F0F0F2",
    marginVertical: 12,
  },
  summaryRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#D4588A",
  },
  checkoutBtn: {
    backgroundColor: "#D4588A",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  checkoutBtnSub: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  checkoutBtnTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 2,
  },
  checkoutBtnRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkoutBtnPrice: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingBottom: 60,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E1E2D",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D4588A",
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 24,
    gap: 10,
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  exploreBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
