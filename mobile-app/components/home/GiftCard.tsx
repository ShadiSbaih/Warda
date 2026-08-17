import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import CatalogImage from "../catalog/CatalogImage";

interface Props {
  item: any;
  onPress: () => void;
  onFavoriteToggle?: () => void;
  onAddToCart?: () => void;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 54) / 2;

export default function GiftCard({ item, onPress, onFavoriteToggle, onAddToCart }: Props) {
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const id = item._id || item.id;
  const fav = isFavorite(id);

  const handleAdd = () => {
    if (onAddToCart) onAddToCart();
    else addToCart(item, 1);
  };

  return (
    <TouchableOpacity activeOpacity={0.88} style={styles.card} onPress={onPress}>
      <View style={[styles.imageWrapper, { backgroundColor: theme.colors.background }]}>
        <CatalogImage item={item} resizeMode="contain" style={styles.image} />

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.favoriteButton,
            { backgroundColor: theme.colors.surface },
          ]}
          onPress={() => (onFavoriteToggle ? onFavoriteToggle() : toggleFavorite(item))}
        >
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={18}
            color={fav ? theme.colors.brand : theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={2} style={[styles.title, { color: theme.colors.text }]}>
          {item.name || item.title}
        </Text>

        <View style={styles.detailsRow}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color={theme.colors.brand} />
            <Text style={[styles.ratingText, { color: theme.colors.text }]}>
              {item.rating || "4.8"}
            </Text>
          </View>
          <Text style={[styles.reviewsText, { color: theme.colors.textMuted }]}>
            {item.reviews ? `${item.reviews} reviews` : "Fresh"}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: theme.colors.text }]}>${item.price}</Text>
          <TouchableOpacity
            accessibilityLabel="Add item to cart"
            style={[styles.cartButton, { backgroundColor: theme.colors.brand }]}
            activeOpacity={0.8}
            onPress={handleAdd}
          >
            <Ionicons name="add" size={18} color={theme.colors.textInverse} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  imageWrapper: {
    width: "100%",
    height: CARD_WIDTH,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  content: {
    paddingTop: 11,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
    lineHeight: 19,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
  },
  reviewsText: {
    fontSize: 11,
    marginLeft: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
  },
  cartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
