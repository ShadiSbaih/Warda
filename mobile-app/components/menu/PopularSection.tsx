import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { productsAPI } from "../../services/api";
import MenuCard from "./MenuCard";
import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

import { ALL_PRODUCTS } from "../../data/productsData";

interface Props {
  selectedCategory?: string;
}

export default function PopularSection({ selectedCategory = "All" }: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  const [products, setProducts] = React.useState<any[]>(ALL_PRODUCTS);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    productsAPI
      .getProducts()
      .then((res) => {
        if (res.success && Array.isArray(res.products) && res.products.length > 0) {
          setProducts(res.products);
        } else {
          setProducts(ALL_PRODUCTS);
        }
      })
      .catch(() => setProducts(ALL_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    selectedCategory === "All" || selectedCategory === "All Gifts"
      ? products
      : products.filter(
          (p) =>
            p.category === selectedCategory ||
            p.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <WardaText variant="h2">
          {selectedCategory === "All" ? "All Gifts" : selectedCategory}
        </WardaText>
        {!loading && (
          <Text style={[styles.countText, { color: theme.colors.textMuted }]}>
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </Text>
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => (item._id || item.id).toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <WardaText variant="caption" color={theme.colors.textMuted} align="center">
              No gifts found in this collection.
            </WardaText>
          </View>
        }
        renderItem={({ item }) => (
          <MenuCard
            item={item}
            onPress={() => router.push(`/details/${item._id || item.id}` as any)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  countText: {
    fontSize: 13,
    fontWeight: "600",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
