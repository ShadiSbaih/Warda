import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import GiftCard from "./GiftCard";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const { width } = Dimensions.get("window");

interface GiftGridProps {
  gifts: any[];
  onGiftPress?: (gift: any) => void;
}

export default function GiftGrid({ gifts, onGiftPress }: GiftGridProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  return (
    <View style={styles.grid}>
      {gifts.map((item) => (
        <View key={item.id} style={styles.itemWrapper}>
          <GiftCard
            item={{
              ...item,
              favorite: isFavorite(item.id),
            }}
            onPress={() => onGiftPress && onGiftPress(item)}
            onFavoriteToggle={() => toggleFavorite(item)}
            onAddToCart={() => addToCart(item, 1)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  itemWrapper: {
    width: (width - 54) / 2,
    marginBottom: 16,
  },
});
