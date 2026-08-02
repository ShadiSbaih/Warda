import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

interface Props {
  item: any;
  onPress: () => void;
  onFavoriteToggle?: () => void;
  onAddToCart?: () => void;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 54) / 2;

export default function GiftCard({ item, onPress, onFavoriteToggle, onAddToCart }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const fav = isFavorite(item.id);

  const handleFav = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle();
    } else {
      toggleFavorite(item);
    }
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart();
    } else {
      addToCart(item, 1);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPress}
    >
      {/* Image Container */}
      <View style={styles.imageWrapper}>
        <Image
          source={item.image}
          resizeMode="contain"
          style={styles.image}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.favoriteButton}
          onPress={handleFav}
        >
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={18}
            color={fav ? "#D4588A" : "#888"}
          />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text numberOfLines={1} style={styles.title}>
        {item.name || item.title}
      </Text>

      {/* Details Row: Rating & Delivery Time */}
      <View style={styles.detailsRow}>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFA726" />
          <Text style={styles.ratingText}>{item.rating || "4.9"}</Text>
        </View>
        <Text style={styles.timeText}>{item.time || "45 mins"}</Text>
      </View>

      {/* Price Row */}
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.plusButton}
          activeOpacity={0.8}
          onPress={handleAdd}
        >
          <Feather name="plus" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageWrapper: {
    width: "100%",
    height: 125,
    borderRadius: 16,
    backgroundColor: "#FCF6F8",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: 105,
    height: 105,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#1E1E2D",
    marginTop: 10,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    color: "#4A4E69",
  },
  timeText: {
    fontSize: 11.5,
    color: "#9A9A9A",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    color: "#D4588A",
  },
  plusButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
});