import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 54) / 2;

interface Props {
  item: any;
  onPress?: () => void;
}

export default function MenuCard({ item, onPress }: Props) {
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const id = item._id || item.id;
  const fav = isFavorite(id);

  const getImageSource = () => {
    if (typeof item.image === "string" && item.image) return { uri: item.image };
    return item.image;
  };

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <TouchableOpacity
        style={[styles.favorite, { backgroundColor: theme.colors.surface }]}
        activeOpacity={0.8}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name={fav ? "heart" : "heart-outline"}
          size={18}
          color={fav ? theme.colors.brand : theme.colors.textMuted}
        />
      </TouchableOpacity>

      <View style={[styles.imageBox, { backgroundColor: theme.colors.background }]}>
        <Image source={getImageSource()} resizeMode="contain" style={styles.image} />
      </View>

      <Text style={[styles.category, { color: theme.colors.textMuted }]} numberOfLines={1}>
        {item.category}
      </Text>
      <Text numberOfLines={2} style={[styles.title, { color: theme.colors.text }]}>
        {item.name || item.title}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={[styles.price, { color: theme.colors.brand }]}>${item.price}</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.brand }]}
          activeOpacity={0.8}
          onPress={() => addToCart(item, 1)}
        >
          <Feather name="plus" size={18} color={theme.colors.textInverse} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  favorite: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  imageBox: {
    width: "100%",
    height: 120,
    borderRadius: 16,
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
    fontWeight: "600",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
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
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
