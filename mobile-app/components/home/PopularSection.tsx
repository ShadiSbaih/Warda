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

interface Props {
  selectedCategoryName?: string | null;
}

export default function PopularSection({ selectedCategoryName }: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productsAPI
      .getProducts()
      .then((res) => {
        if (res.success && res.products) {
          setProducts(res.products);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayedGifts =
    selectedCategoryName && selectedCategoryName !== "All"
      ? products.filter((p) => p.category === selectedCategoryName)
      : products;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <WardaText variant="h2">
          {selectedCategoryName && selectedCategoryName !== "All"
            ? selectedCategoryName
            : "Popular Gifts"}
        </WardaText>

        {!loading && (
          <TouchableOpacity onPress={() => router.push("/(tabs)/menu")}>
            <WardaText variant="body" weight="bold" color={theme.colors.brand}>
              See All
            </WardaText>
          </TouchableOpacity>
        )}
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
              No gifts found for this category.
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
