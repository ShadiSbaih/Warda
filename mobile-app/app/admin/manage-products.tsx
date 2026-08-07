import { useTheme } from "@/context/ThemeContext";
import { WardaIconButton, WardaText } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { productsAPI } from "../../services/api";

export default function ManageProductsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productsAPI.getProducts();
      if (res.success) {
        setProducts(res.products);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const res = await productsAPI.deleteProduct(id);
            if (res.success) {
              setProducts((prev) => prev.filter((p) => p._id !== id));
            } else {
              Alert.alert("Error", res.message || "Could not delete product");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <WardaText style={styles.productName} numberOfLines={1}>{item.name}</WardaText>
        <WardaText style={styles.productPrice}>SR {item.price}</WardaText>
        <WardaText style={styles.productCategory}>{item.category}</WardaText>
      </View>
      <WardaIconButton
        icon="trash-2"
        variant="danger"
        onPress={() => handleDelete(item._id, item.name)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <WardaIconButton icon="arrow-left" onPress={() => router.back()} variant="ghost" />
        <WardaText style={styles.headerTitle}>Manage Products</WardaText>
        <View style={{ width: 44 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.brand} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <WardaText style={styles.emptyText}>No products found.</WardaText>
          }
        />
      )}

      <WardaIconButton
        icon="plus"
        variant="primary"
        size="lg"
        onPress={() => router.push("/admin/add-product")}
        style={{ position: "absolute", bottom: 30, right: 20 }}
      />
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  list: {
    padding: 20,
    gap: 12,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.brand,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: theme.colors.text,
    opacity: 0.5,
  },
});
