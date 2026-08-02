import React, { useState } from "react";
import {
  Dimensions,
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
import { useLocalSearchParams, useRouter } from "expo-router";
import { ALL_PRODUCTS, Product } from "../../data/productsData";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const { width } = Dimensions.get("window");

const WRAPPING_OPTIONS = [
  { color: "#E53935", name: "Velvet Red" },
  { color: "#F48FB1", name: "Rose Pink" },
  { color: "#FFFFFF", name: "Silk White" },
  { color: "#FFD700", name: "Champagne Gold" },
  { color: "#4A235A", name: "Royal Purple" },
];

export default function DynamicDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const productId = parseInt(id as string, 10) || 1;
  const product: Product =
    ALL_PRODUCTS.find((p) => p.id === productId) || ALL_PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState(
    product.wrappingColors[0] || WRAPPING_OPTIONS[0].color
  );
  const [selectedWrappingName, setSelectedWrappingName] = useState(
    WRAPPING_OPTIONS[0].name
  );
  const [quantity, setQuantity] = useState(1);
  const [recipientName, setRecipientName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [showGiftMessageModal, setShowGiftMessageModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fav = isFavorite(product.id);
  const unitPrice = product.numericPrice;
  const totalPrice = unitPrice * quantity;

  const handleColorPick = (opt: { color: string; name: string }) => {
    setSelectedColor(opt.color);
    setSelectedWrappingName(opt.name);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      wrappingColor: selectedColor,
      wrappingName: selectedWrappingName,
      recipientName: recipientName.trim() || undefined,
      giftMessage: giftMessage.trim() || undefined,
    });
    setToast(`Added ${quantity}x "${product.name}" to bag! 🛍️`);
    setTimeout(() => setToast(null), 2400);
  };

  const handleInstantBuy = () => {
    addToCart(product, quantity, {
      wrappingColor: selectedColor,
      wrappingName: selectedWrappingName,
      recipientName: recipientName.trim() || undefined,
      giftMessage: giftMessage.trim() || undefined,
    });
    router.push("/checkout");
  };

  const related = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Floating Top Nav */}
        <View style={styles.topNav}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#1E1E2D" />
          </TouchableOpacity>

          <View style={styles.navRight}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={() => toggleFavorite(product)}
            >
              <Ionicons
                name={fav ? "heart" : "heart-outline"}
                size={22}
                color={fav ? "#D4588A" : "#1E1E2D"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navBtn, { marginLeft: 8 }]}
              onPress={() => router.push("/(tabs)/cart")}
            >
              <Feather name="shopping-bag" size={20} color="#1E1E2D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Toast Alert */}
        {toast && (
          <View style={styles.toast}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.toastText}>{toast}</Text>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Product Image */}
          <View style={styles.heroBox}>
            <Image
              source={product.image}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{product.category}</Text>
            </View>
          </View>

          {/* Product Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.unitPrice}>${product.price}</Text>
              </View>

              {/* Quantity Stepper */}
              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Feather name="minus" size={16} color="#1E1E2D" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Feather name="plus" size={16} color="#1E1E2D" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Badges: Rating & Time */}
            <View style={styles.metaRow}>
              <View style={styles.metaBadge}>
                <Ionicons name="star" size={14} color="#FFA726" />
                <Text style={styles.metaBadgeBold}>{product.rating}</Text>
                <Text style={styles.metaBadgeLight}>({product.reviews} reviews)</Text>
              </View>

              <View style={styles.metaBadge}>
                <Feather name="clock" size={14} color="#D4588A" />
                <Text style={styles.metaBadgeBold}>{product.time}</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>{product.description}</Text>

            {/* Tags */}
            <View style={styles.tagsRow}>
              {product.tags.map((tag, idx) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Luxury Gift Wrapping Selector */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Luxury Gift Wrapping</Text>
              <Text style={styles.selectedColorName}>{selectedWrappingName}</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Hand-wrapped with signature silk paper & gold foil stamp
            </Text>

            <View style={styles.colorsRow}>
              {WRAPPING_OPTIONS.map((opt) => {
                const isSelected = selectedColor === opt.color;
                return (
                  <TouchableOpacity
                    key={opt.color}
                    activeOpacity={0.85}
                    style={[
                      styles.colorOption,
                      isSelected && styles.colorOptionSelected,
                    ]}
                    onPress={() => handleColorPick(opt)}
                  >
                    <View
                      style={[
                        styles.colorCircle,
                        { backgroundColor: opt.color },
                        opt.color === "#FFFFFF" && { borderWidth: 1, borderColor: "#DDD" },
                      ]}
                    >
                      {isSelected && (
                        <Feather
                          name="check"
                          size={16}
                          color={opt.color === "#FFFFFF" ? "#1E1E2D" : "#FFFFFF"}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.colorLabel,
                        isSelected && styles.colorLabelSelected,
                      ]}
                      numberOfLines={1}
                    >
                      {opt.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Personalized Gift Message Card */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>Free Greeting Card & Note</Text>
              <Feather name="edit-3" size={16} color="#D4588A" />
            </View>
            <Text style={styles.sectionSubtitle}>
              Printed on luxury embossed linen card stock
            </Text>

            <View style={styles.cardForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Recipient Name (Optional)</Text>
                <TextInput
                  placeholder="e.g. Sarah / Mom / Dearest"
                  placeholderTextColor="#AAA"
                  value={recipientName}
                  onChangeText={setRecipientName}
                  style={styles.textInput}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Gift Message</Text>
                <TextInput
                  placeholder="Write your heartfelt message here... 🌹"
                  placeholderTextColor="#AAA"
                  value={giftMessage}
                  onChangeText={setGiftMessage}
                  multiline
                  numberOfLines={3}
                  style={[styles.textInput, styles.textArea]}
                />
              </View>
            </View>
          </View>

          {/* Related Gifts Section */}
          <View style={styles.relatedSection}>
            <View style={styles.relatedHeader}>
              <Text style={styles.relatedTitle}>You May Also Love</Text>
              <TouchableOpacity onPress={() => router.push("/(tabs)/menu")}>
                <Text style={styles.seeAll}>Explore All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedList}
            >
              {related.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.relatedCard}
                  activeOpacity={0.88}
                  onPress={() => router.push(`/details/${item.id}` as any)}
                >
                  <View style={styles.relatedImageBox}>
                    <Image
                      source={item.image}
                      style={styles.relatedImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.relatedCardTitle}>
                    {item.name}
                  </Text>
                  <Text style={styles.relatedPrice}>${item.price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Sticky Bottom Checkout Bar */}
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.totalPriceLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.addToCartBtn}
              activeOpacity={0.85}
              onPress={handleAddToCart}
            >
              <Feather name="shopping-bag" size={18} color="#D4588A" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buyNowBtn}
              activeOpacity={0.9}
              onPress={handleInstantBuy}
            >
              <Text style={styles.buyNowText}>Send as Gift</Text>
              <Feather name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6F9",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  toast: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    zIndex: 99,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E2D",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "700",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroBox: {
    width: width,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF6F8",
    position: "relative",
  },
  heroImage: {
    width: 240,
    height: 240,
  },
  categoryBadge: {
    position: "absolute",
    bottom: 16,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  categoryBadgeText: {
    color: "#D4588A",
    fontSize: 12.5,
    fontWeight: "700",
  },
  infoCard: {
    marginHorizontal: 20,
    marginTop: -20,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E1E2D",
    marginBottom: 4,
  },
  unitPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: "#D4588A",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F7",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 10,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E2D",
    minWidth: 18,
    textAlign: "center",
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
    marginBottom: 12,
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9FB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  metaBadgeBold: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1E2D",
  },
  metaBadgeLight: {
    fontSize: 12,
    color: "#888",
  },
  description: {
    fontSize: 14.5,
    color: "#6B6B7B",
    lineHeight: 22,
    marginTop: 4,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  tag: {
    backgroundColor: "#FFF0F5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  tagText: {
    color: "#D4588A",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E2D",
  },
  selectedColorName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#D4588A",
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: "#888",
    marginTop: 3,
    marginBottom: 14,
  },
  colorsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorOption: {
    alignItems: "center",
    padding: 6,
    borderRadius: 14,
  },
  colorOptionSelected: {
    backgroundColor: "#FFF0F5",
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  colorLabel: {
    fontSize: 11,
    color: "#888",
    marginTop: 6,
    fontWeight: "500",
  },
  colorLabelSelected: {
    color: "#D4588A",
    fontWeight: "700",
  },
  cardForm: {
    gap: 12,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#444",
  },
  textInput: {
    backgroundColor: "#F9F9FB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1E1E2D",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  textArea: {
    height: 70,
    textAlignVertical: "top",
  },
  relatedSection: {
    marginTop: 24,
  },
  relatedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D4588A",
  },
  relatedList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  relatedCard: {
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 10,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  relatedImageBox: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    backgroundColor: "#FCF6F8",
    justifyContent: "center",
    alignItems: "center",
  },
  relatedImage: {
    width: 80,
    height: 80,
  },
  relatedCardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1E2D",
    marginTop: 8,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: "#D4588A",
    marginTop: 2,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 16,
  },
  totalPriceLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addToCartBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#F8D7E8",
  },
  buyNowBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D4588A",
    paddingHorizontal: 22,
    height: 50,
    borderRadius: 25,
    gap: 8,
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  buyNowText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
