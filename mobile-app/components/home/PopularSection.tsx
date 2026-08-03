import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { ALL_PRODUCTS, Product } from "../../data/productsData";
import { productsAPI } from "../../services/api";
import GiftCard from "./GiftCard";

interface Props {
  selectedCategoryName?: string | null;
}

export default function PopularSection({ selectedCategoryName }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);

  useEffect(() => {
    productsAPI.getProducts().then((res) => {
      if (res.success && res.data) {
        setProducts(res.data);
      }
    }).catch(() => {});
  }, []);

  const displayedGifts = selectedCategoryName && selectedCategoryName !== "All"
    ? products.filter((p) => p.category === selectedCategoryName)
    : products;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedCategoryName && selectedCategoryName !== "All"
            ? selectedCategoryName
            : "Popular Gifts"}
        </Text>

        <TouchableOpacity onPress={() => router.push("/(tabs)/menu")}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <FlatList
        data={displayedGifts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <GiftCard
            item={item}
            onPress={() => router.push(`/details/${item.id}` as any)}
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
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "700",
    color: "#D4588A",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 6,
  },
});