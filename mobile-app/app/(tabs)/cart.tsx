import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { WardaButton, WardaCard, WardaIconButton, WardaText } from "../../components/ui";
import CatalogImage from "../../components/catalog/CatalogImage";

export default function CartScreen() {
  const router = useRouter();
  const { theme } = useTheme();
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
    if (res.success) setPromoInput("");
  };

  const confirmClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure you want to remove all items?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: clearCart },
    ]);
  };

  if (items.length === 0) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]} edges={["top", "left", "right"]}>
          <View style={styles.header}>
            <WardaIconButton icon="arrow-left" onPress={() => router.back()} />
            <WardaText variant="h2">Shopping Bag</WardaText>
            <View style={{ width: 44 }} />
          </View>
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconCircle, { backgroundColor: theme.colors.background }]}>
              <MaterialCommunityIcons name="gift-open-outline" size={64} color={theme.colors.brand} />
            </View>
            <WardaText variant="h2" style={{ marginBottom: 6 }}>
              Your Bag is Empty
            </WardaText>
            <WardaText variant="body" color={theme.colors.textMuted} align="center" style={{ marginBottom: 28 }}>
              Explore our curated flower bouquets and luxury gift collections to send love today.
            </WardaText>
            <WardaButton title="Discover Gifts" iconRight="arrow-right" onPress={() => router.push("/(tabs)/menu")} />
          </View>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <WardaIconButton icon="arrow-left" onPress={() => router.back()} />
          <View style={styles.headerTitleContainer}>
            <WardaText variant="h2">Shopping Bag</WardaText>
            <View style={[styles.countBadge, { backgroundColor: theme.colors.brandLight }]}>
              <WardaText variant="caption" weight="bold" color={theme.colors.brand}>
                {itemsCount} {itemsCount === 1 ? "item" : "items"}
              </WardaText>
            </View>
          </View>
          <WardaIconButton icon="trash-2" onPress={confirmClearCart} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push("/delivery-address")}>
            <View style={[styles.addressBanner, { backgroundColor: theme.colors.background, borderColor: theme.colors.borderSubtle }]}>
              <View style={[styles.addressIcon, { backgroundColor: theme.colors.brandLight }]}>
                <Ionicons name="location-sharp" size={18} color={theme.colors.brand} />
              </View>
              <View style={styles.addressTextGroup}>
                <WardaText variant="caption" weight="bold" color={theme.colors.textMuted} style={styles.addressLabel}>
                  DELIVERING TO
                </WardaText>
                <WardaText variant="body" weight="bold" numberOfLines={1} style={styles.addressMain}>
                  King Fahd Road, Al Olaya, Riyadh
                </WardaText>
              </View>
              <Feather name="chevron-right" size={18} color={theme.colors.textMuted} />
            </View>
          </TouchableOpacity>

          <View style={styles.itemsList}>
            {items.map((item) => (
              <WardaCard key={item.id} padding="md" radius="lg" shadow="md" style={styles.itemCard}>
                <View style={styles.cardTop}>
                  <View style={[styles.imageBox, { backgroundColor: theme.colors.background }]}>
                    <CatalogImage
                      item={item}
                      style={styles.productImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.infoBox}>
                    <View style={styles.titleRow}>
                      <WardaText variant="body" weight="bold" numberOfLines={1} style={{ flex: 1, marginRight: 8 }}>
                        {item.title}
                      </WardaText>
                      <TouchableOpacity onPress={() => removeFromCart(item.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Feather name="x" size={18} color={theme.colors.textMuted} />
                      </TouchableOpacity>
                    </View>
                    {item.wrappingColor && (
                      <View style={[styles.wrappingBadge, { backgroundColor: theme.colors.background }]}>
                        <View style={[styles.colorDot, { backgroundColor: item.wrappingColor }]} />
                        <WardaText variant="caption">{item.wrappingName || "Silk Wrap"}</WardaText>
                      </View>
                    )}
                    {item.recipientName && (
                      <WardaText variant="caption" color={theme.colors.brand}>
                        For: {item.recipientName}
                      </WardaText>
                    )}
                    <View style={styles.bottomRow}>
                      <WardaText variant="body" weight="extrabold" color={theme.colors.brand}>
                        ${item.price}
                      </WardaText>
                      <View style={[styles.qtyContainer, { backgroundColor: theme.colors.background }]}>
                        <TouchableOpacity
                          style={[styles.qtyBtn, { backgroundColor: theme.colors.surface }]}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Feather name="minus" size={14} color={theme.colors.text} />
                        </TouchableOpacity>
                        <WardaText variant="body" weight="bold">
                          {item.quantity}
                        </WardaText>
                        <TouchableOpacity
                          style={[styles.qtyBtn, { backgroundColor: theme.colors.surface }]}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Feather name="plus" size={14} color={theme.colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                {item.giftMessage && (
                  <View style={[styles.messageBox, { backgroundColor: theme.colors.background }]}>
                    <Feather name="message-square" size={13} color={theme.colors.brand} />
                    <WardaText variant="caption" style={{ flex: 1, fontStyle: "italic" }} numberOfLines={1}>
                      "{item.giftMessage}"
                    </WardaText>
                  </View>
                )}
              </WardaCard>
            ))}
          </View>

          <WardaCard style={styles.promoSection}>
            <WardaText variant="h3" style={{ marginBottom: 10 }}>
              Promo Voucher
            </WardaText>
            <View style={styles.promoInputRow}>
              <View style={[styles.inputContainer, { backgroundColor: theme.colors.background }]}>
                <Feather name="tag" size={18} color={theme.colors.textMuted} />
                <TextInput
                  placeholder="Enter promo code"
                  placeholderTextColor={theme.colors.textPlaceholder}
                  value={promoInput}
                  onChangeText={setPromoInput}
                  autoCapitalize="characters"
                  style={[styles.promoInput, { color: theme.colors.text }]}
                />
              </View>
              <WardaButton title="Apply" size="sm" onPress={() => handleApplyPromo()} />
            </View>

            <View style={styles.quickPromos}>
              {["WARDA20", "WELCOME"].map((code) => (
                <TouchableOpacity
                  key={code}
                  style={[styles.quickChip, { backgroundColor: theme.colors.background }]}
                  onPress={() => handleApplyPromo(code)}
                >
                  <WardaText variant="caption" color={theme.colors.brand}>
                    {code}
                  </WardaText>
                </TouchableOpacity>
              ))}
            </View>

            {appliedPromo && (
              <View style={[styles.appliedPromoBadge, { backgroundColor: theme.colors.successSurface, borderColor: theme.colors.success }]}>
                <View style={styles.appliedPromoLeft}>
                  <Feather name="check-circle" size={16} color={theme.colors.success} />
                  <WardaText variant="caption" color={theme.colors.success}>
                    Code <WardaText variant="caption" weight="bold">{appliedPromo.code}</WardaText> applied
                  </WardaText>
                </View>
                <TouchableOpacity onPress={removePromo}>
                  <Feather name="x" size={16} color={theme.colors.textMuted} />
                </TouchableOpacity>
              </View>
            )}
            {promoFeedback && !appliedPromo && (
              <WardaText variant="caption" color={theme.colors.error} style={{ marginTop: 6 }}>
                {promoFeedback}
              </WardaText>
            )}
          </WardaCard>

          <WardaCard style={styles.summaryCard}>
            <WardaText variant="h3" style={{ marginBottom: 14 }}>
              Price Summary
            </WardaText>
            <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} theme={theme} />
            <SummaryRow label="Luxury Gift Packaging" value={`$${wrappingTotal.toFixed(2)}`} theme={theme} />
            <SummaryRow
              label="Delivery Fee"
              value={deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
              theme={theme}
            />
            {discount > 0 && (
              <SummaryRow
                label="Promo Discount"
                value={`-$${discount.toFixed(2)}`}
                theme={theme}
                valueColor={theme.colors.success}
              />
            )}
            <View style={[styles.summaryDivider, { backgroundColor: theme.colors.borderSubtle }]} />
            <View style={styles.summaryRowTotal}>
              <WardaText variant="body" weight="extrabold">
                Total Amount
              </WardaText>
              <WardaText variant="h2" color={theme.colors.brand}>
                ${total.toFixed(2)}
              </WardaText>
            </View>
          </WardaCard>

          <WardaButton style={{ display: "none" }}
            title="Proceed to Checkout"
            subtitle={`${itemsCount} ${itemsCount === 1 ? "Item" : "Items"} · Express Delivery`}
            iconRight="arrow-right"
            onPress={() => router.push("/checkout")}
          />
        </ScrollView>
        <View style={[styles.checkoutBar, { backgroundColor: theme.colors.surface }]}>
          <WardaButton
            title="Proceed to Checkout"
            subtitle={`${itemsCount} ${itemsCount === 1 ? "Item" : "Items"} · Express Delivery`}
            iconRight="arrow-right"
            onPress={() => router.push("/checkout")}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

function SummaryRow({
  label,
  value,
  theme,
  valueColor,
}: {
  label: string;
  value: string;
  theme: any;
  valueColor?: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <WardaText variant="body" color={theme.colors.textMuted}>
        {label}
      </WardaText>
      <WardaText variant="body" weight="bold" color={valueColor || theme.colors.text}>
        {value}
      </WardaText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 150,
    paddingTop: 8,
  },
  checkoutBar: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 96,
    paddingVertical: 8,
    zIndex: 20,
  },
  addressBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  addressIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  addressTextGroup: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  addressLabel: {
    fontSize: 10,
    letterSpacing: 0.6,
  },
  addressMain: {
    fontSize: 14,
    marginTop: 2,
  },
  itemsList: {
    gap: 14,
    marginBottom: 20,
  },
  itemCard: {
    marginBottom: 0,
  },
  cardTop: {
    flexDirection: "row",
  },
  imageBox: {
    width: 90,
    height: 90,
    borderRadius: 16,
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
  wrappingBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: 100,
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
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 8,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
    gap: 6,
  },
  promoSection: {
    marginBottom: 20,
  },
  promoInputRow: {
    flexDirection: "row",
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  promoInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  quickPromos: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },
  quickChip: {
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  appliedPromoBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 1,
  },
  appliedPromoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  summaryCard: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryDivider: {
    height: 1,
    marginVertical: 12,
  },
  summaryRowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
