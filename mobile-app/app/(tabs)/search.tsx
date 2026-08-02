import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ALL_PRODUCTS, Product } from "../../data/productsData";
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
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const [query, setQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<"popular" | "low" | "high" | "rating">("popular");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const results = useMemo(() => {
    let filtered = ALL_PRODUCTS.filter((item) => {
      const matchQuery =
        !query.trim() ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        item.description.toLowerCase().includes(query.toLowerCase());

      const matchPrice = maxPrice ? item.numericPrice <= maxPrice : true;

      return matchQuery && matchPrice;
    });

    if (selectedSort === "low") {
      filtered = [...filtered].sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (selectedSort === "high") {
      filtered = [...filtered].sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (selectedSort === "rating") {
      filtered = [...filtered].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    return filtered;
  }, [query, selectedSort, maxPrice]);

  const handleQuickAdd = (item: Product) => {
    addToCart(item, 1);
    setToast(`Added ${item.name} to bag! 🛍️`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header Search Bar */}
        <View style={styles.searchHeader}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#1E1E2D" />
          </TouchableOpacity>

          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#999" />
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
                <Feather name="x-circle" size={18} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Toast */}
        {toast && (
          <View style={styles.toast}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.toastText}>{toast}</Text>
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
                <Text
                  style={[
                    styles.tagChipText,
                    (query === item || (item === "Under $100" && maxPrice === 100)) &&
                      styles.activeTagChipText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Results Bar */}
        <View style={styles.sortBar}>
          <Text style={styles.resultsCount}>
            {results.length} {results.length === 1 ? "gift found" : "gifts found"}
          </Text>

          {/* Quick Sort Filter Buttons */}
          <View style={styles.sortGroup}>
            <TouchableOpacity
              style={[
                styles.sortBtn,
                selectedSort === "popular" && styles.activeSortBtn,
              ]}
              onPress={() => setSelectedSort("popular")}
            >
              <Text
                style={[
                  styles.sortBtnText,
                  selectedSort === "popular" && styles.activeSortBtnText,
                ]}
              >
                Popular
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortBtn,
                selectedSort === "low" && styles.activeSortBtn,
              ]}
              onPress={() => setSelectedSort("low")}
            >
              <Text
                style={[
                  styles.sortBtnText,
                  selectedSort === "low" && styles.activeSortBtnText,
                ]}
              >
                Price ↓
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sortBtn,
                selectedSort === "rating" && styles.activeSortBtn,
              ]}
              onPress={() => setSelectedSort("rating")}
            >
              <Text
                style={[
                  styles.sortBtnText,
                  selectedSort === "rating" && styles.activeSortBtnText,
                ]}
              >
                Rating ★
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results Grid */}
        {results.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="search" size={56} color="#F48FB1" />
            <Text style={styles.emptyTitle}>No Gifts Found</Text>
            <Text style={styles.emptySubtitle}>
              We couldn't find anything matching "{query}". Try checking your spelling or search for popular categories like Roses or Chocolate.
            </Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
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
                  onPress={() => router.push(`/details/${item.id}` as any)}
                >
                  {/* Image */}
                  <View style={styles.imageBox}>
                    <Image
                      source={item.image}
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
                        color={fav ? "#D4588A" : "#666"}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Title */}
                  <Text numberOfLines={1} style={styles.cardTitle}>
                    {item.name}
                  </Text>

                  {/* Meta */}
                  <View style={styles.metaRow}>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={12} color="#FFA726" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>

                  {/* Price & Add */}
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>${item.price}</Text>
                    <TouchableOpacity
                      style={styles.addBtn}
                      activeOpacity={0.85}
                      onPress={() => handleQuickAdd(item)}
                    >
                      <Feather name="plus" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6F9",
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 10,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 14.5,
    color: "#1E1E2D",
    fontWeight: "500",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#1E1E2D",
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
    color: "#FFFFFF",
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
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  activeTagChip: {
    backgroundColor: "#D4588A",
    borderColor: "#D4588A",
  },
  tagChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#666",
  },
  activeTagChipText: {
    color: "#FFFFFF",
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
    color: "#666",
  },
  sortGroup: {
    flexDirection: "row",
    gap: 6,
  },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  activeSortBtn: {
    backgroundColor: "#FFF0F5",
    borderWidth: 1,
    borderColor: "#F8D7E8",
  },
  sortBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#777",
  },
  activeSortBtnText: {
    color: "#D4588A",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageBox: {
    width: "100%",
    height: 130,
    borderRadius: 16,
    backgroundColor: "#FCF6F8",
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
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#1E1E2D",
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
    color: "#999",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    color: "#D4588A",
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
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
    color: "#1E1E2D",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14.5,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 22,
  },
});
