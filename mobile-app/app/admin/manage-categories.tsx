import { useTheme } from "@/context/ThemeContext";
import { WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Alert, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { adminAPI } from "../../services/api";

export default function ManageCategoriesScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
        <WardaIconButton icon="arrow-left" onPress={() => router.back()} variant="ghost" />
        <WardaText style={styles.headerTitle}>Manage Categories</WardaText>
        <WardaIconButton
          icon={isAdding ? "x" : "plus"}
          variant="secondary"
          onPress={() => setIsAdding(!isAdding)}
        />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {isAdding && (
          <View style={styles.addForm}>
            <WardaText style={styles.formTitle}>New Category</WardaText>
            
            <View style={styles.inputGroup}>
              <WardaText style={styles.label}>Name</WardaText>
              <TextInput
                style={styles.input}
                placeholder="e.g. Luxury Chocolates"
                value={newName}
                onChangeText={setNewName}
              />
            </View>

            <View style={styles.inputGroup}>
              <WardaText style={styles.label}>Image URL</WardaText>
              <TextInput
                style={styles.input}
                placeholder="https://images.unsplash.com/..."
                value={newImage}
                onChangeText={setNewImage}
                autoCapitalize="none"
              />
            </View>

            <WardaButton
              title="Create Category"
              size="md"
              loading={submitting}
              disabled={submitting}
              onPress={handleCreate}
            />
          </View>
        )}

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={theme.colors.brand} />
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
                  <WardaText style={styles.name}>{item.name}</WardaText>
                </View>
                
                <View style={styles.actions}>
                  <WardaIconButton
                    icon="trash-2"
                    variant="danger"
                    size="sm"
                    onPress={() => handleDelete(item._id)}
                  />
                </View>
              </View>
            )}
          />
        )}
      </KeyboardAvoidingView>
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
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: theme.colors.background,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  addForm: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
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
    color: theme.colors.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textMuted,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.03)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    borderRadius: theme.radii.full,
    paddingHorizontal: 16,
    height: 48,
    fontSize: 14.5,
    color: theme.colors.text,
  },
});
