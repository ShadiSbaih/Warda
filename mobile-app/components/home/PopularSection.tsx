import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { productsAPI } from "../../services/api";
import GiftCard from "./GiftCard";
import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";
import { ALL_PRODUCTS } from "../../data/productsData";

interface Props {
  selectedCategoryName?: string | null;
}

const FALLBACK_PRODUCTS = ALL_PRODUCTS.filter((product) => product.isPopular);

export default function PopularSection({ selectedCategoryName }: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  // Keep the home screen useful while the API is unavailable or has not been seeded yet.
  const [products, setProducts] = useState<any[]>(FALLBACK_PRODUCTS);

  useEffect(() => {
    productsAPI
      .getProducts()
      .then((res) => {
        if (res.success && Array.isArray(res.products) && res.products.length > 0) {
          // Prefer products explicitly marked popular, but do not leave the section
          // empty when an older backend has not added that flag yet.
          const popularProducts = res.products.filter((product: any) => product.isPopular);
          setProducts(popularProducts.length > 0 ? popularProducts : res.products);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
      })
      .catch(() => setProducts(FALLBACK_PRODUCTS));
  }, []);

  const filteredProducts =
    selectedCategoryName && selectedCategoryName !== "All"
      ? products.filter((p) => p.category === selectedCategoryName)
      : products;

  // If live data does not contain the selected category, use the matching local
  // collection instead of showing a dead-end empty state on the home screen.
  const displayedGifts = filteredProducts.length > 0
    ? filteredProducts
    : selectedCategoryName && selectedCategoryName !== "All"
      ? ALL_PRODUCTS.filter((p) => p.category === selectedCategoryName && p.isPopular)
      : FALLBACK_PRODUCTS;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <WardaText variant="h2">
          {selectedCategoryName && selectedCategoryName !== "All"
            ? selectedCategoryName
            : "Popular Gifts"}
        </WardaText>

        <TouchableOpacity onPress={() => router.push("/(tabs)/menu")}>
          <WardaText variant="body" weight="bold" color={theme.colors.brand}>
            See All
          </WardaText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedGifts}
        keyExtractor={(item) => (item._id || item.id).toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View style={styles.empty}>
            <WardaText variant="caption" align="center" color={theme.colors.textMuted}>
              We’re refreshing our collection. Explore all gifts to see more.
            </WardaText>
          </View>
        }
        renderItem={({ item }) => (
          <GiftCard
            item={item}
            onPress={() =>
              router.push(`/details/${item._id || item.id}` as any)
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 6,
  },
  empty: {
    paddingVertical: 40,
    alignItems: "center",
  },
});
