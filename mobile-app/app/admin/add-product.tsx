import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RainbowColors } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { productsAPI, shopsAPI } from "../../services/api";

export default function AddProductScreen() {
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
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={RainbowColors.inkBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Product</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Product Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Red Roses Bouquet"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price (SR) *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 150"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Flowers"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image URL *</Text>
          <TextInput
            style={styles.input}
            placeholder="https://example.com/image.jpg"
            value={image}
            onChangeText={setImage}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
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
            <Text style={styles.label}>Shop *</Text>
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
                  <Text
                    style={[
                      styles.shopChipText,
                      selectedShop === shop._id && styles.shopChipTextActive,
                    ]}
                  >
                    {shop.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.saveBtn, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={RainbowColors.pureWhite} />
          ) : (
            <Text style={styles.saveBtnText}>Save Product</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
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
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
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
    color: RainbowColors.inkBlack,
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
    color: RainbowColors.inkBlack,
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
    backgroundColor: RainbowColors.tangerine,
    borderColor: RainbowColors.tangerine,
  },
  shopChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: RainbowColors.inkBlack,
  },
  shopChipTextActive: {
    color: RainbowColors.pureWhite,
  },
  saveBtn: {
    height: 56,
    backgroundColor: RainbowColors.tangerine,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: RainbowColors.pureWhite,
  },
});
