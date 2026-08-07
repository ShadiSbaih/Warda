import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { menuCategories } from "../../data/menuCategories";
import { productsAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

const ALL_CATEGORY = { id: 0, title: "All Gifts", active: true };
const CATEGORIES = [ALL_CATEGORY, ...menuCategories];

interface Props {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function MenuCategories({ selectedCategory, onSelectCategory }: Props) {
  const { theme } = useTheme();
  const [categories, setCategories] = useState(CATEGORIES);

  useEffect(() => {
    productsAPI
      .getCategories()
      .then((res) => {
        if (res.success && res.categories && Array.isArray(res.categories)) {
          const mapped = res.categories.map((c: any, index: number) => ({
            id: c._id || index + 1,
            title: c.name || c,
            active: false,
          }));
          setCategories([ALL_CATEGORY, ...mapped]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const active =
          selectedCategory === item.title ||
          (selectedCategory === "All" && item.title === "All Gifts");

        return (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              onSelectCategory(item.title === "All Gifts" ? "All" : item.title)
            }
            style={[
              styles.chip,
              {
                backgroundColor: active ? theme.colors.brand : theme.colors.surface,
                borderColor: active ? theme.colors.brand : theme.colors.borderSubtle,
              },
              theme.shadows.sm,
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: active ? theme.colors.textInverse : theme.colors.textMuted },
                active && { fontWeight: "700" },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  chip: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 13.5,
    fontWeight: "600",
  },
});
