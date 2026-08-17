import { useTheme } from "@/context/ThemeContext";
import { WardaIconButton, WardaText } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { productsAPI } from "../../services/api";
import CatalogImage from "../../components/catalog/CatalogImage";

export default function ManageProductsScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

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
    const removeProduct = async () => {
      setDeleting(id);
      try {
        const res = await productsAPI.deleteProduct(id);
        if (res.success) {
          setProducts((prev) => prev.filter((p) => p._id !== id));
        } else {
          Alert.alert("Delete failed", res.message || "Could not delete product");
        }
      } catch (error: any) {
        Alert.alert("Delete failed", error?.message || "Could not delete product");
      } finally {
        setDeleting(null);
      }
    };

    if (Platform.OS === "web") {
      if (typeof window !== "undefined" && window.confirm(`Delete "${name}"?`)) removeProduct();
      return;
    }

    Alert.alert("Delete Product", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: removeProduct },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <CatalogImage item={item} style={styles.productImage} resizeMode="contain" />
      <View style={styles.productInfo}>
        <WardaText style={styles.productName} numberOfLines={1}>{item.name}</WardaText>
        <WardaText style={styles.productPrice}>SR {item.price}</WardaText>
        <WardaText style={styles.productCategory}>{item.category}</WardaText>
      </View>
      <View style={styles.actions}>
        <WardaIconButton
          icon="edit-2"
          variant="primary"
          size="sm"
          onPress={() => router.push({ pathname: "/admin/add-product", params: { productId: item._id } } as any)}
        />
        <WardaIconButton
          icon="trash-2"
          variant="danger"
          size="sm"
          style={deleting === item._id ? { opacity: 0.45 } : undefined}
          onPress={() => handleDelete(item._id, item.name)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <WardaIconButton icon="arrow-left" onPress={() => router.back()} variant="ghost" />
        <WardaText style={styles.headerTitle}>Manage Products</WardaText>
        <WardaIconButton
          icon="plus"
          variant="primary"
          size="sm"
          onPress={() => router.push("/admin/add-product")}
        />
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
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
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
