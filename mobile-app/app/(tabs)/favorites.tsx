import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaButton, WardaIconButton, WardaText } from "../../components/ui";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 54) / 2;

const CATEGORY_FILTERS = ["All", "Rose Bouquets", "Chocolate", "Custom Boxes", "Graduation Gifts"];

export default function FavoritesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { favorites, favoritesCount, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const filtered = favorites.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const handleQuickAdd = (item: any) => {
    addToCart(item, 1);
    setAddedToast(`Added ${item.title || item.name} to bag! 🛍️`);
    setTimeout(() => setAddedToast(null), 2200);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <WardaIconButton icon="arrow-left" onPress={() => router.back()} />
          <View style={styles.headerCenter}>
            <WardaText variant="h2">My Wishlist</WardaText>
            <WardaText variant="caption" color={theme.colors.textMuted}>
              {favoritesCount} saved {favoritesCount === 1 ? "gift" : "gifts"}
            </WardaText>
          </View>
          <WardaIconButton icon="shopping-bag" onPress={() => router.push("/(tabs)/cart")} />
        </View>

        {addedToast && (
          <View style={[styles.toast, { backgroundColor: theme.colors.text }]}>
            <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
            <WardaText variant="caption" color={theme.colors.textInverse}>
              {addedToast}
            </WardaText>
          </View>
        )}

        {favorites.length > 0 && (
          <View style={styles.categoriesWrapper}>
            <FlatList
              horizontal
              data={CATEGORY_FILTERS}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setSelectedCategory(item)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: selectedCategory === item ? theme.colors.brand : theme.colors.surface,
                      borderColor: selectedCategory === item ? theme.colors.brand : theme.colors.borderSubtle,
                    },
                  ]}
                >
                  <WardaText
                    variant="caption"
                    weight={selectedCategory === item ? "bold" : "semibold"}
                    color={selectedCategory === item ? theme.colors.textInverse : theme.colors.textMuted}
                  >
                    {item}
                  </WardaText>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconBox, { backgroundColor: theme.colors.brandLight }]}>
              <Ionicons name="heart-dislike-outline" size={60} color={theme.colors.brand} />
            </View>
            <WardaText variant="h2" style={{ marginBottom: 6 }}>
              No Saved Gifts
            </WardaText>
            <WardaText variant="body" color={theme.colors.textMuted} align="center" style={{ marginBottom: 28 }}>
              {selectedCategory === "All"
                ? "Tap the heart icon on any bouquet or luxury gift box to save it here for later."
                : `No saved items in "${selectedCategory}".`}
            </WardaText>
            <WardaButton title="Browse Gifts" iconRight="arrow-right" onPress={() => router.push("/(tabs)/menu")} />
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.92}
                onPress={() => router.push(`/details/${item.id}` as any)}
                style={[
                  styles.card,
                  { backgroundColor: theme.colors.surface, borderRadius: theme.radii.lg },
                  theme.shadows.sm,
                ]}
              >
                <View style={[styles.imageBox, { backgroundColor: theme.colors.background }]}>
                  <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                  <TouchableOpacity
                    style={[styles.favBtn, { backgroundColor: theme.colors.surface }]}
                    onPress={() => toggleFavorite(item)}
                  >
                    <Ionicons name="heart" size={18} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>

                <WardaText variant="body" weight="bold" numberOfLines={1} style={styles.cardTitle}>
                  {item.title || item.name}
                </WardaText>

                <View style={styles.metaRow}>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color={theme.colors.warning} />
                    <WardaText variant="caption" weight="semibold" color={theme.colors.text}>
                      {item.rating || "4.9"}
                    </WardaText>
                  </View>
                  <WardaText variant="caption" color={theme.colors.textMuted}>
                    {item.time || "45 mins"}
                  </WardaText>
                </View>

                <View style={styles.priceRow}>
                  <WardaText variant="h3" color={theme.colors.brand}>
                    ${item.price}
                  </WardaText>
                  <TouchableOpacity
                    style={[styles.addBtn, { backgroundColor: theme.colors.brand }]}
                    activeOpacity={0.85}
                    onPress={() => handleQuickAdd(item)}
                  >
                    <Feather name="plus" size={16} color={theme.colors.textInverse} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerCenter: {
    alignItems: "center",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  categoriesWrapper: {
    marginVertical: 12,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 8,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    padding: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  imageBox: {
    width: "100%",
    height: 130,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  productImage: {
    width: 105,
    height: 105,
  },
  favBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    marginTop: 10,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingBottom: 60,
  },
  emptyIconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
