import { useTheme } from "@/context/ThemeContext";
import { WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { productsAPI } from "../../services/api";

export default function AddProductScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const isEditing = Boolean(productId);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOptions();
    if (productId) loadProduct(productId);
  }, [productId]);

  const loadProduct = async (id: string) => {
    const response = await productsAPI.getProductById(id);
    if (response.success && response.product) {
      const product = response.product;
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(String(product.price || ""));
      setImage(product.image || "");
      setCategory(product.category || "");
    }
  };

  const fetchOptions = async () => {
    try {
      const categoryResponse = await productsAPI.getCategories();

      if (categoryResponse.success && categoryResponse.categories?.length > 0) {
        setCategories(categoryResponse.categories);
        setCategory(categoryResponse.categories[0].name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !image || !category) {
      Alert.alert("Error", "Please fill out the product name, price, category, and image.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        description,
        price: Number(price),
        image,
        category,
      };

      const res = isEditing
        ? await productsAPI.updateProduct(productId!, payload)
        : await productsAPI.createProduct(payload);
      if (res.success) {
        Alert.alert("Success", isEditing ? "Product updated successfully!" : "Product added successfully!");
        router.back();
      } else {
        Alert.alert("Error", res.message || "Failed to add product");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <WardaIconButton icon="arrow-left" onPress={() => router.back()} variant="ghost" />
        <WardaText style={styles.headerTitle}>{isEditing ? "Edit Product" : "Add New Product"}</WardaText>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.inputGroup}>
          <WardaText style={styles.label}>Product Name *</WardaText>
          <TextInput
            style={styles.input}
            placeholder="e.g. Red Roses Bouquet"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <WardaText style={styles.label}>Price (SR) *</WardaText>
          <TextInput
            style={styles.input}
            placeholder="e.g. 150"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>

        <View style={styles.inputGroup}>
          <WardaText style={styles.label}>Category *</WardaText>
          {categories.length > 0 ? (
            <View style={styles.optionList}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={[styles.option, category === item.name && styles.optionActive]}
                  onPress={() => setCategory(item.name)}
                >
                  <WardaText style={[styles.optionText, category === item.name && styles.optionTextActive]}>
                    {item.name}
                  </WardaText>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <WardaText style={styles.helperText}>No categories available. Create a category first.</WardaText>
          )}
        </View>

        <View style={styles.inputGroup}>
          <WardaText style={styles.label}>Image URL *</WardaText>
          <TextInput
            style={styles.input}
            placeholder="https://example.com/image.jpg"
            value={image}
            onChangeText={setImage}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <WardaText style={styles.label}>Description</WardaText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the product..."
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        <WardaButton
          title={isEditing ? "Update Product" : "Save Product"}
          size="lg"
          loading={loading}
          disabled={loading}
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: "rgba(0,0,0,0.02)",
    color: theme.colors.text,
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  optionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderWidth: 1,
    borderColor: "transparent",
  },
  optionActive: {
    backgroundColor: theme.colors.brand,
    borderColor: theme.colors.brand,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  optionTextActive: {
    color: theme.colors.textInverse,
  },
  helperText: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },
});
