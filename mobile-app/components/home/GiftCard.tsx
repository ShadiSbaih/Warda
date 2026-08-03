import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
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

  const fav = isFavorite(item._id || item.id);

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
          source={{ uri: item.image }}
          resizeMode="cover"
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
            color={fav ? RainbowColors.tangerine : RainbowColors.inkBlack}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Name */}
        <Text numberOfLines={2} style={styles.title}>
          {item.name || item.title}
        </Text>

        {/* Details Row: Rating & Stock */}
        <View style={styles.detailsRow}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color={RainbowColors.tangerine} />
            <Text style={styles.ratingText}>{item.rating || "4.89"}</Text>
          </View>
          <Text style={styles.reviewsText}>14k reviews</Text>
        </View>

        <Text style={styles.stockText}>3 items left in stock</Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.oldPrice}>${Math.floor(item.price * 1.5)}</Text>
        </View>

        {/* Full width add to cart button */}
        <TouchableOpacity
          style={styles.cartButton}
          activeOpacity={0.8}
          onPress={handleAdd}
        >
          <Text style={styles.cartButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  imageWrapper: {
    width: "100%",
    height: 150,
    backgroundColor: "#eef1f4",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: RainbowColors.pureWhite,
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
    color: RainbowColors.inkBlack,
    marginBottom: 4,
    lineHeight: 18,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  reviewsText: {
    fontSize: 11,
    color: RainbowColors.stone,
    marginLeft: 4,
  },
  stockText: {
    fontSize: 11,
    color: RainbowColors.tangerine,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 12,
    color: RainbowColors.stone,
    textDecorationLine: "line-through",
  },
  cartButton: {
    width: "100%",
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  cartButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: RainbowColors.inkBlack,
  },
});