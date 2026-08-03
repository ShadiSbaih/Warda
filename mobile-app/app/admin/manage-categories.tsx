import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { adminAPI } from "../../services/api";

export default function ManageCategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await adminAPI.getCategories();
      if (res.success && res.categories) {
        setCategories(res.categories);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim() || !newImage.trim()) {
      Alert.alert("Error", "Please provide a name and an image URL");
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await adminAPI.createCategory({ name: newName, image: newImage });
      if (res.success) {
        setCategories([...categories, res.category]);
        setIsAdding(false);
        setNewName("");
        setNewImage("");
      } else {
        Alert.alert("Error", res.message || "Failed to create category");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this category?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
          setDeleting(id);
          try {
            const res = await adminAPI.deleteCategory(id);
            if (res.success) {
              setCategories(categories.filter(c => c._id !== id));
            } else {
              Alert.alert("Error", res.message || "Failed to delete category");
            }
          } catch (e) {
            console.log(e);
          } finally {
            setDeleting(null);
          }
      } }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={RainbowColors.inkBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Categories</Text>
        <TouchableOpacity style={styles.addBtnHeader} onPress={() => setIsAdding(!isAdding)}>
          <Feather name={isAdding ? "x" : "plus"} size={22} color={RainbowColors.tangerine} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {isAdding && (
          <View style={styles.addForm}>
            <Text style={styles.formTitle}>New Category</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Luxury Chocolates"
                value={newName}
                onChangeText={setNewName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Image URL</Text>
              <TextInput
                style={styles.input}
                placeholder="https://images.unsplash.com/..."
                value={newImage}
                onChangeText={setNewImage}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity 
              style={styles.submitBtn} 
              onPress={handleCreate}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color={RainbowColors.pureWhite} />
              ) : (
                <Text style={styles.submitBtnText}>Create Category</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={RainbowColors.tangerine} />
          </View>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => (item._id || item.id || Math.random()).toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                
                <View style={styles.actions}>
                  <TouchableOpacity 
                    style={[styles.actionBtn, { backgroundColor: "rgba(239, 68, 68, 0.1)" }]}
                    onPress={() => handleDelete(item._id)}
                    disabled={deleting === item._id}
                  >
                    {deleting === item._id ? (
                      <ActivityIndicator size="small" color="#EF4444" />
                    ) : (
                      <Feather name="trash-2" size={16} color="#EF4444" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </KeyboardAvoidingView>
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
  addBtnHeader: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 127, 80, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 20,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: RainbowColors.pureWhite,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: RainbowColors.cloudSurface,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  addForm: {
    padding: 20,
    backgroundColor: RainbowColors.pureWhite,
    borderBottomWidth: 1,
    borderBottomColor: RainbowColors.cloudSurface,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    zIndex: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: RainbowColors.stone,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.03)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    borderRadius: RainbowRadii.pills,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14.5,
    color: RainbowColors.inkBlack,
  },
  submitBtn: {
    height: 48,
    backgroundColor: RainbowColors.tangerine,
    borderRadius: RainbowRadii.pills,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  submitBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});
