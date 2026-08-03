import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { productsAPI } from "../../services/api";
import MenuCard from "./MenuCard";

interface Props {
  selectedCategory?: string;
}

export default function PopularSection({ selectedCategory = "All" }: Props) {
  const router = useRouter();

  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    productsAPI.getProducts().then((res) => {
      if (res.success && res.products) {
        setProducts(res.products);
      }
    }).catch(() => {});
  }, []);

  const filtered = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

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
        keyExtractor={(item) => (item._id || item.id).toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  countText: {
    fontSize: 13,
    color: RainbowColors.stone,
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