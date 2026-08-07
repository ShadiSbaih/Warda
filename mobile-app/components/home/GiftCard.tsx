import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

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

  const getImageSource = () => {
    if (typeof item.image === "string" && item.image) return { uri: item.image };
    return item.image;
  };

  const handleAdd = () => {
    if (onAddToCart) onAddToCart();
    else addToCart(item, 1);
  };

  return (
    <TouchableOpacity activeOpacity={0.88} style={styles.card} onPress={onPress}>
      <View style={[styles.imageWrapper, { backgroundColor: theme.colors.background }]}>
        <Image source={getImageSource()} resizeMode="cover" style={styles.image} />

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
          <View style={[styles.ratingBadge, { backgroundColor: theme.colors.background }]}>
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
          <Text style={[styles.oldPrice, { color: theme.colors.textMuted }]}>
            ${Math.floor((item.price || 0) * 1.5)}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.cartButton, { backgroundColor: theme.colors.brandLight }]}
          activeOpacity={0.8}
          onPress={handleAdd}
        >
          <Text style={[styles.cartButtonText, { color: theme.colors.brand }]}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 24,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  imageWrapper: {
    width: "100%",
    height: 150,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    lineHeight: 18,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
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
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  cartButton: {
    width: "100%",
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cartButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
