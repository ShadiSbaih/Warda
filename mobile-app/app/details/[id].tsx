import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { productsAPI } from "../../services/api";
import { WardaButton, WardaCard, WardaIconButton, WardaText } from "../../components/ui";

const { width } = Dimensions.get("window");

const DEFAULT_WRAPPING = [
  { color: "#E53935", name: "Velvet Red" },
  { color: "#F48FB1", name: "Rose Pink" },
  { color: "#FFFFFF", name: "Silk White" },
  { color: "#FFD700", name: "Champagne Gold" },
  { color: "#4A235A", name: "Royal Purple" },
];

export default function DynamicDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [recipientName, setRecipientName] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState(DEFAULT_WRAPPING[0].color);
  const [selectedWrappingName, setSelectedWrappingName] = useState(DEFAULT_WRAPPING[0].name);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await productsAPI.getProductById(id as string);
        if (res.success && res.product) {
          setProduct(res.product);
          const allRes = await productsAPI.getProducts();
          if (allRes.success && allRes.products) {
            setRelated(
              allRes.products
                .filter((p: any) => p._id !== id && p._id !== (res.product as any)._id)
                .slice(0, 4)
            );
          }
          if (res.product.wrappingColors?.length > 0) {
            setSelectedColor(res.product.wrappingColors[0]);
            setSelectedWrappingName("Luxury Silk");
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const fav = product ? isFavorite(product._id || product.id) : false;
  const unitPrice = product ? product.numericPrice || product.price : 0;
  const totalPrice = unitPrice * quantity;

  const wrappingOptions = product?.wrappingColors?.length
    ? product.wrappingColors.map((color: string) => ({
        color,
        name: DEFAULT_WRAPPING.find((w) => w.color === color)?.name || "Custom Wrap",
      }))
    : DEFAULT_WRAPPING;

  const handleColorPick = (color: string, name: string) => {
    setSelectedColor(color);
    setSelectedWrappingName(name);
  };

  const add = () => {
    addToCart(product, quantity, {
      wrappingColor: selectedColor,
      wrappingName: selectedWrappingName,
      recipientName: recipientName.trim() || undefined,
      giftMessage: giftMessage.trim() || undefined,
    });
    setToast(`Added ${quantity}x to bag`);
    setTimeout(() => setToast(null), 2000);
  };

  const instantBuy = () => {
    add();
    router.push("/checkout");
  };

  if (loading || !product) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.brand} />
      </View>
    );
  }

  const imageSource =
    typeof product.image === "string" ? { uri: product.image } : product.image;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top", "left", "right"]}>
        {toast && (
          <View style={[styles.toast, { backgroundColor: theme.colors.text }]}>
            <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
            <Text style={[styles.toastText, { color: theme.colors.surface }]}>{toast}</Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          <View style={styles.topNav}>
            <WardaIconButton icon="arrow-left" onPress={() => router.back()} />
            <View style={styles.navRight}>
              <WardaIconButton
                icon={fav ? "heart" : "heart"}
                variant={fav ? "secondary" : "default"}
                onPress={() => toggleFavorite(product)}
              />
              <WardaIconButton icon="shopping-bag" onPress={() => router.push("/(tabs)/cart")} />
            </View>
          </View>

          <View style={[styles.heroBox, { backgroundColor: theme.colors.surface }]}>
            <Image source={imageSource} style={styles.heroImage} resizeMode="contain" />
            <View style={[styles.categoryBadge, { backgroundColor: theme.colors.surface }]}>
              <WardaText variant="label" color={theme.colors.brand} weight="bold">
                {product.category}
              </WardaText>
            </View>
          </View>

          <WardaCard radius="xl" shadow="lg" padding="lg" style={styles.infoCard}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <WardaText variant="h2">{product.name}</WardaText>
                <WardaText variant="h2" color={theme.colors.brand}>
                  ${product.price}
                </WardaText>
              </View>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={[styles.qtyBtn, { backgroundColor: theme.colors.background }]}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Feather name="minus" size={16} color={theme.colors.text} />
                </TouchableOpacity>
                <WardaText variant="body" weight="bold">
                  {quantity}
                </WardaText>
                <TouchableOpacity
                  style={[styles.qtyBtn, { backgroundColor: theme.colors.background }]}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Feather name="plus" size={16} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.metaRow}>
              <View style={[styles.metaBadge, { backgroundColor: theme.colors.background }]}>
                <Ionicons name="star" size={13} color="#FFA726" />
                <WardaText variant="body" weight="bold">
                  {product.rating}
                </WardaText>
                <WardaText variant="caption">({product.reviews || 0})</WardaText>
              </View>
              <View style={[styles.metaBadge, { backgroundColor: theme.colors.background }]}>
                <Feather name="clock" size={13} color={theme.colors.brand} />
                <WardaText variant="body" weight="bold">
                  {product.time || "45 mins"}
                </WardaText>
              </View>
            </View>

            <WardaText variant="body" color={theme.colors.textMuted} style={{ marginTop: 4 }}>
              {product.description}
            </WardaText>

            {product.tags?.length > 0 && (
              <View style={styles.tagsRow}>
                {product.tags.map((tag: string, idx: number) => (
                  <View key={idx} style={[styles.tag, { backgroundColor: theme.colors.background }]}>
                    <WardaText variant="caption" color={theme.colors.brand}>
                      #{tag}
                    </WardaText>
                  </View>
                ))}
              </View>
            )}
          </WardaCard>

          <WardaCard radius="xl" shadow="md" padding="lg" style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <WardaText variant="h3">Luxury Gift Wrapping</WardaText>
              <WardaText variant="body" weight="bold" color={theme.colors.brand}>
                {selectedWrappingName}
              </WardaText>
            </View>
            <WardaText variant="caption" color={theme.colors.textMuted}>
              Hand-wrapped with signature silk paper & gold foil stamp
            </WardaText>

            <View style={styles.colorsRow}>
              {wrappingOptions.map((opt: any) => {
                const isSelected = selectedColor === opt.color;
                return (
                  <TouchableOpacity
                    key={opt.color}
                    activeOpacity={0.85}
                    style={[
                      styles.colorOption,
                      isSelected && { backgroundColor: theme.colors.background },
                    ]}
                    onPress={() => handleColorPick(opt.color, opt.name)}
                  >
                    <View
                      style={[
                        styles.colorCircle,
                        { backgroundColor: opt.color },
                        opt.color === "#FFFFFF" && { borderWidth: 1, borderColor: theme.colors.border },
                      ]}
                    >
                      {isSelected && (
                        <Feather
                          name="check"
                          size={16}
                          color={opt.color === "#FFFFFF" ? theme.colors.text : theme.colors.surface}
                        />
                      )}
                    </View>
                    <WardaText
                      variant="caption"
                      color={isSelected ? theme.colors.brand : theme.colors.textMuted}
                      weight={isSelected ? "bold" : "medium"}
                    >
                      {opt.name}
                    </WardaText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </WardaCard>

          <WardaCard radius="xl" shadow="md" padding="lg" style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <WardaText variant="h3">Free Greeting Card & Note</WardaText>
              <Feather name="edit-3" size={16} color={theme.colors.brand} />
            </View>
            <WardaText variant="caption" color={theme.colors.textMuted}>
              Printed on luxury embossed linen card stock
            </WardaText>

            <View style={styles.formGroup}>
              <WardaText variant="label">Recipient Name (Optional)</WardaText>
              <TextInput
                placeholder="e.g. Sarah / Mom / Dearest"
                placeholderTextColor={theme.colors.textPlaceholder}
                value={recipientName}
                onChangeText={setRecipientName}
                style={[
                  styles.textInput,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
              />
            </View>

            <View style={styles.formGroup}>
              <WardaText variant="label">Gift Message</WardaText>
              <TextInput
                placeholder="Write your heartfelt message here..."
                placeholderTextColor={theme.colors.textPlaceholder}
                value={giftMessage}
                onChangeText={setGiftMessage}
                multiline
                numberOfLines={3}
                style={[
                  styles.textInput,
                  styles.textArea,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
              />
            </View>
          </WardaCard>

          <View style={styles.relatedSection}>
            <View style={styles.relatedHeader}>
              <WardaText variant="h3">You May Also Love</WardaText>
              <TouchableOpacity onPress={() => router.push("/(tabs)/menu")}>
                <WardaText variant="body" weight="bold" color={theme.colors.brand}>
                  Explore All
                </WardaText>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedList}>
              {related.map((item: any) => (
                <TouchableOpacity
                  key={item._id || item.id}
                  style={[styles.relatedCard, { backgroundColor: theme.colors.surface }]}
                  activeOpacity={0.88}
                  onPress={() => router.push(`/details/${item._id || item.id}` as any)}
                >
                  <View style={[styles.relatedImageBox, { backgroundColor: theme.colors.background }]}>
                    <Image
                      source={typeof item.image === "string" ? { uri: item.image } : item.image}
                      style={styles.relatedImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text numberOfLines={1} style={[styles.relatedCardTitle, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                  <WardaText variant="body" weight="bold" color={theme.colors.brand}>
                    ${item.price}
                  </WardaText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        <View style={[styles.bottomBar, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.borderSubtle }]}>
          <View>
            <WardaText variant="caption" color={theme.colors.textMuted}>
              Total Price
            </WardaText>
            <WardaText variant="h2">${totalPrice.toFixed(2)}</WardaText>
          </View>
          <View style={styles.actionButtons}>
            <WardaIconButton icon="shopping-bag" variant="secondary" onPress={add} />
            <WardaButton title="Send as Gift" iconRight="arrow-right" onPress={instantBuy} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 140,
  },
  toast: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    zIndex: 99,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  toastText: {
    fontSize: 13.5,
    fontWeight: "700",
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
    gap: 8,
  },
  heroBox: {
    width: width,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: -20,
  },
  heroImage: {
    width: 240,
    height: 240,
  },
  categoryBadge: {
    position: "absolute",
    bottom: 24,
    left: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  infoCard: {
    marginHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
    gap: 10,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    marginBottom: 8,
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 5,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  colorOption: {
    alignItems: "center",
    padding: 8,
    borderRadius: 16,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formGroup: {
    marginTop: 14,
  },
  textInput: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  textArea: {
    height: 80,
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
  relatedList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  relatedCard: {
    width: 140,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  relatedImageBox: {
    width: "100%",
    height: 100,
    borderRadius: 12,
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
    marginTop: 8,
    marginBottom: 2,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingBottom: 28,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
