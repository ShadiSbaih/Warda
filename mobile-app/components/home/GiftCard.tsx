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
import { LinearGradient } from "expo-linear-gradient";
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
      {/* 3D Inset Gloss Highlight — top edge shimmer */}
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gloss}
        pointerEvents="none"
      />

      {/* Image Container */}
      <View style={styles.imageWrapper}>
        {/* Pastel radial atmosphere inside image well */}
        <LinearGradient
          colors={["#fff", RainbowColors.cloudSurface as string]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.image}
        />

        {/* Inner top-edge highlight for 3D depth */}
        <LinearGradient
          colors={["rgba(255,255,255,0.6)", "rgba(255,255,255,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.5 }}
          style={[StyleSheet.absoluteFillObject, { borderRadius: 22 }]}
          pointerEvents="none"
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.favoriteButton}
          onPress={handleFav}
        >
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={18}
            color={fav ? RainbowColors.tangerine : RainbowColors.stone}
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
          {/* 3D Button gloss */}
          <LinearGradient
            colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <Feather name="plus" size={16} color={RainbowColors.pureWhite} />
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
    padding: 10,
    marginBottom: 16,
    // Outer lift shadow
    shadowColor: "#7a7a8c",
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    overflow: "visible",
  },
  // Full-card top-edge white gloss — the "3D inflated pill" effect from Rainbow
  gloss: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "55%",
    borderRadius: RainbowRadii.cards,
    zIndex: 1,
  },
  imageWrapper: {
    width: "100%",
    height: 125,
    borderRadius: 22,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 105,
    height: 105,
    zIndex: 1,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    // Glazed glass look
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 14.5,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
    marginTop: 10,
    marginBottom: 4,
    zIndex: 2,
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
    color: RainbowColors.stone,
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
    color: RainbowColors.tangerine,
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // 3D raised shadow for the button
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.45,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
});