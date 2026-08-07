import { useTheme } from "@/context/ThemeContext";
import { WardaIconButton, WardaText } from "@/components/ui";
import React, { useMemo, useState, useEffect } from "react";

import { Dimensions, FlatList, Image, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { productsAPI } from "../../services/api";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 54) / 2;

const POPULAR_TAGS = [
  "Red Roses",
  "Luxury Chocolate",
  "Graduation",
  "White Roses",
  "Anniversary",
  "Under $100",
];

export default function SearchScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const [query, setQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<"popular" | "low" | "high" | "rating">("popular");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    productsAPI.getProducts().then((res) => {
      if (res.success && res.products) {
        setAllProducts(res.products);
      }
    }).catch(() => {});
  }, []);

  const results = useMemo(() => {
    let filtered = allProducts.filter((item) => {
      const matchQuery =
        !query.trim() ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        (item.tags || []).some((t: string) => t.toLowerCase().includes(query.toLowerCase())) ||
        (item.description || "").toLowerCase().includes(query.toLowerCase());

      const matchPrice = maxPrice ? item.price <= maxPrice : true;

      return matchQuery && matchPrice;
    });

    if (selectedSort === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (selectedSort === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating") {
      filtered = [...filtered].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    return filtered;
  }, [query, selectedSort, maxPrice, allProducts]);

  const handleQuickAdd = (item: any) => {
    addToCart(item, 1);
    setToast(`Added ${item.name} to bag! 🛍️`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header Search Bar */}
        <View style={styles.searchHeader}>
          <WardaIconButton icon="arrow-left" onPress={() => router.back()} />

          <View style={styles.searchBar}>
            <Feather name="search" size={20} color={theme.colors.textMuted} />
            <TextInput
              placeholder="Search flowers, chocolates, gifts..."
              placeholderTextColor="#A0A0A0"
              value={query}
              onChangeText={setQuery}
              autoFocus={true}
              style={styles.searchInput}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Feather name="x-circle" size={18} color={theme.colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Toast */}
        {toast && (
          <View style={styles.toast}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <WardaText style={styles.toastText}>{toast}</WardaText>
          </View>
        )}

        {/* Popular Search Tags */}
        <View style={styles.tagsWrapper}>
          <FlatList
            horizontal
            data={POPULAR_TAGS}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.tagChip,
                  query === item && styles.activeTagChip,
                ]}
                onPress={() => {
                  if (item === "Under $100") {
                    setMaxPrice(maxPrice === 100 ? null : 100);
                  } else {
                    setQuery(query === item ? "" : item);
                  }
                }}
              >
                <WardaText
                  style={[
                    styles.tagChipText,
                    (query === item || (item === "Under $100" && maxPrice === 100)) &&
                      styles.activeTagChipText,
                  ]}
                >
                  {item}
                </WardaText>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Results Bar */}
        <View style={styles.sortBar}>
          <WardaText style={styles.resultsCount}>
            {results.length} {results.length === 1 ? "gift found" : "gifts found"}
          </WardaText>

          {/* Quick Sort Filter Buttons */}
          <View style={styles.sortGroup}>
            <TouchableOpacity
              style={[
                styles.sortBtn,
                selectedSort === "popular" && styles.activeSortBtn,
              ]}
              onPress={() => setSelectedSort("popular")}
            >
              <WardaText
                style={[
                  styles.sortBtnText,
                  selectedSort === "popular" && styles.activeSortBtnText,
                ]}
              >
                Popular
              </WardaText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortBtn,
                selectedSort === "low" && styles.activeSortBtn,
              ]}
              onPress={() => setSelectedSort("low")}
            >
              <WardaText
                style={[
                  styles.sortBtnText,
                  selectedSort === "low" && styles.activeSortBtnText,
                ]}
              >
                Price ↓
              </WardaText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortBtn,
                selectedSort === "rating" && styles.activeSortBtn,
              ]}
              onPress={() => setSelectedSort("rating")}
            >
              <WardaText
                style={[
                  styles.sortBtnText,
                  selectedSort === "rating" && styles.activeSortBtnText,
                ]}
              >
                Rating ★
              </WardaText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results Grid */}
        {results.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="search" size={56} color="#F48FB1" />
            <WardaText style={styles.emptyTitle}>No Gifts Found</WardaText>
            <WardaText style={styles.emptySubtitle}>
              We couldn't find anything matching "{query}". Try checking your spelling or search for popular categories like Roses or Chocolate.
            </WardaText>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => (item._id || item.id).toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const fav = isFavorite(item.id);
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.card}
                  onPress={() => router.push(`/details/${item._id || item.id}` as any)}
                >
                  {/* Image */}
                  <View style={styles.imageBox}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.productImage}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      style={styles.favBtn}
                      onPress={() => toggleFavorite(item)}
                    >
                      <Ionicons
                        name={fav ? "heart" : "heart-outline"}
                        size={18}
                        color={fav ? theme.colors.brand : theme.colors.textMuted}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Title */}
                  <WardaText numberOfLines={1} style={styles.cardTitle}>
                    {item.name}
                  </WardaText>

                  {/* Meta */}
                  <View style={styles.metaRow}>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={12} color="#FFA726" />
                      <WardaText style={styles.ratingText}>{item.rating}</WardaText>
                    </View>
                    <WardaText style={styles.timeText}>{item.time}</WardaText>
                  </View>

                  {/* Price & Add */}
                  <View style={styles.priceRow}>
                    <WardaText style={styles.price}>${item.price}</WardaText>
                    <WardaIconButton
                      icon="plus"
                      variant="primary"
                      size="sm"
                      onPress={() => handleQuickAdd(item)}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.full,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 14.5,
    color: theme.colors.text,
    fontWeight: "500",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: theme.colors.text,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    color: theme.colors.textInverse,
    fontSize: 13,
    fontWeight: "600",
  },
  tagsWrapper: {
    marginVertical: 6,
  },
  tagsList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  activeTagChip: {
    backgroundColor: theme.colors.brand,
    borderColor: theme.colors.brand,
  },
  tagChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  activeTagChipText: {
    color: theme.colors.textInverse,
  },
  sortBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  resultsCount: {
    fontSize: 13.5,
    fontWeight: "700",
    color: theme.colors.textMuted,
  },
  sortGroup: {
    flexDirection: "row",
    gap: 6,
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
  },
  activeSortBtn: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  sortBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  activeSortBtnText: {
    color: theme.colors.brand,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    paddingTop: 6,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    padding: 10,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageBox: {
    width: "100%",
    height: 130,
    borderRadius: 16, // inner radius
    backgroundColor: theme.colors.background,
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
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: theme.colors.text,
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
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
  },
  timeText: {
    fontSize: 11.5,
    color: theme.colors.textMuted,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    color: theme.colors.brand,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14.5,
    color: theme.colors.textMuted,
    textAlign: "center",
    lineHeight: 22,
  },
});
