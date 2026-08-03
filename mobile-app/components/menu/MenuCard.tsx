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
import { Feather, Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 54) / 2;

interface Props {
  item: any;
  onPress?: () => void;
}

export default function MenuCard({ item, onPress }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const fav = isFavorite(item._id || item.id);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >
      {/* Favourite Button */}
      <TouchableOpacity
        style={styles.favorite}
        activeOpacity={0.8}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name={fav ? "heart" : "heart-outline"}
          size={18}
          color={fav ? RainbowColors.tangerine : RainbowColors.stone}
        />
      </TouchableOpacity>

      {/* Image */}
      <View style={styles.imageBox}>
        <Image
          source={{ uri: item.image }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>

      {/* Category */}
      <Text style={styles.category} numberOfLines={1}>
        {item.category}
      </Text>

      {/* Title */}
      <Text numberOfLines={2} style={styles.title}>
        {item.name || item.title}
      </Text>

      {/* Bottom */}
      <View style={styles.bottomRow}>
        <Text style={styles.price}>
          ${item.price}
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => addToCart(item, 1)}
        >
          <Feather
            name="plus"
            size={18}
            color={RainbowColors.pureWhite}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 22,
    padding: 12,
    marginBottom: 16,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  favorite: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  imageBox: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
  category: {
    marginTop: 10,
    fontSize: 11.5,
    color: "#999",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
    lineHeight: 20,
    minHeight: 40,
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    color: RainbowColors.tangerine,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
});