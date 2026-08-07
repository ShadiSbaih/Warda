import { useTheme } from "@/context/ThemeContext";
import { WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { productsAPI, shopsAPI } from "../../services/api";

export default function AddProductScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Flowers");
  const [shops, setShops] = useState<any[]>([]);
  const [selectedShop, setSelectedShop] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await shopsAPI.getShops();
      if (res.success && res.shops.length > 0) {
        setShops(res.shops);
        setSelectedShop(res.shops[0]._id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !image || !selectedShop) {
      Alert.alert("Error", "Please fill out all required fields (Name, Price, Image, Shop).");
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
        shop: selectedShop,
      };

      const res = await productsAPI.createProduct(payload);
      if (res.success) {
        Alert.alert("Success", "Product added successfully!");
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
        <WardaText style={styles.headerTitle}>Add New Product</WardaText>
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
          <WardaText style={styles.label}>Category</WardaText>
          <TextInput
            style={styles.input}
            placeholder="e.g. Flowers"
            value={category}
            onChangeText={setCategory}
          />
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

        {shops.length > 0 && (
          <View style={styles.inputGroup}>
            <WardaText style={styles.label}>Shop *</WardaText>
            {/* Simple selection for MVP since Picker requires an extra package usually */}
            <View style={styles.shopChips}>
              {shops.map((shop) => (
                <TouchableOpacity
                  key={shop._id}
                  style={[
                    styles.shopChip,
                    selectedShop === shop._id && styles.shopChipActive,
                  ]}
                  onPress={() => setSelectedShop(shop._id)}
                >
                  <WardaText
                    style={[
                      styles.shopChipText,
                      selectedShop === shop._id && styles.shopChipTextActive,
                    ]}
                  >
                    {shop.name}
                  </WardaText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <WardaButton
          title="Save Product"
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
  shopChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  shopChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderWidth: 1,
    borderColor: "transparent",
  },
  shopChipActive: {
    backgroundColor: theme.colors.brand,
    borderColor: theme.colors.brand,
  },
  shopChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text,
  },
  shopChipTextActive: {
    color: theme.colors.textInverse,
  },
});
