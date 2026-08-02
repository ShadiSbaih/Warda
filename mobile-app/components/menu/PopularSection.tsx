import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { ALL_PRODUCTS } from "../../data/productsData";
import MenuCard from "./MenuCard";

interface Props {
  selectedCategory?: string;
}

export default function PopularSection({ selectedCategory = "All" }: Props) {
  const router = useRouter();

  const filtered = selectedCategory === "All"
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedCategory === "All" ? "All Gifts" : selectedCategory}
        </Text>
        <Text style={styles.countText}>
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MenuCard
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
    marginTop: 20,
  },
  header: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  countText: {
    fontSize: 13,
    color: "#888",
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
});