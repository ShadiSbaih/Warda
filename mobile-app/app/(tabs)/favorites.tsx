import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 54) / 2;

const CATEGORY_FILTERS = ["All", "Rose Bouquets", "Chocolate", "Custom Boxes", "Graduation Gifts"];

export default function FavoritesScreen() {
  const router = useRouter();
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
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.pureWhite} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color={RainbowColors.inkBlack} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>My Wishlist</Text>
            <Text style={styles.headerSubtitle}>
              {favoritesCount} saved {favoritesCount === 1 ? "gift" : "gifts"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => router.push("/(tabs)/cart")}
          >
            <Feather name="shopping-bag" size={20} color={RainbowColors.tangerine} />
          </TouchableOpacity>
        </View>

        {/* Added Toast */}
        {addedToast && (
          <View style={styles.toast}>
            <Ionicons name="checkmark-circle" size={18} color="#10B981" />
            <Text style={styles.toastText}>{addedToast}</Text>
          </View>
        )}

        {/* Category Filters */}
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
                  style={[
                    styles.chip,
                    selectedCategory === item && styles.activeChip,
                  ]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedCategory === item && styles.activeChipText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="heart-dislike-outline" size={60} color={RainbowColors.tangerine} />
            </View>
            <Text style={styles.emptyTitle}>No Saved Gifts</Text>
            <Text style={styles.emptySubtitle}>
              {selectedCategory === "All"
                ? "Tap the heart icon on any bouquet or luxury gift box to save it here for later."
                : `No saved items in "${selectedCategory}".`}
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => router.push("/(tabs)/menu")}
              activeOpacity={0.85}
            >
              <Text style={styles.exploreBtnText}>Browse Gifts</Text>
              <Feather name="arrow-right" size={18} color={RainbowColors.pureWhite} />
            </TouchableOpacity>
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
                    <Ionicons name="heart" size={18} color={RainbowColors.hotPink} />
                  </TouchableOpacity>
                </View>

                {/* Details */}
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {item.title || item.name}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#FFA726" />
                    <Text style={styles.ratingText}>{item.rating || "4.9"}</Text>
                  </View>
                  <Text style={styles.timeText}>{item.time || "45 mins"}</Text>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.addBtn}
                    activeOpacity={0.85}
                    onPress={() => handleQuickAdd(item)}
                  >
                    <Feather name="plus" size={16} color={RainbowColors.pureWhite} />
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
    backgroundColor: RainbowColors.pureWhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.inkBlack,
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
    color: RainbowColors.inkBlack,
  },
  headerSubtitle: {
    fontSize: 13,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  cartBtn: {
    width: 42,
    height: 42,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: RainbowColors.inkBlack,
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
    color: RainbowColors.pureWhite,
    fontSize: 13,
    fontWeight: "600",
  },
  categoriesWrapper: {
    marginVertical: 10,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  activeChip: {
    backgroundColor: RainbowColors.tangerine,
    borderColor: RainbowColors.tangerine,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: RainbowColors.stone,
  },
  activeChipText: {
    color: RainbowColors.pureWhite,
    fontWeight: "700",
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
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 10,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageBox: {
    width: "100%",
    height: 130,
    borderRadius: 16, // inner radius
    backgroundColor: RainbowColors.cloudSurface,
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
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
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
    color: RainbowColors.stone,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    color: RainbowColors.tangerine,
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
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
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: RainbowColors.stone,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.tangerine,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: RainbowRadii.pills,
    gap: 10,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  exploreBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});
