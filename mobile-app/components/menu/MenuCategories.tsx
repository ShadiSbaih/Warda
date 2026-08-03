import React, { useEffect, useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { menuCategories } from "../../data/menuCategories";
import { productsAPI } from "../../services/api";

const ALL_CATEGORY = { id: 0, title: "All Gifts", active: true };
const CATEGORIES = [ALL_CATEGORY, ...menuCategories];

interface Props {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function MenuCategories({
  selectedCategory,
  onSelectCategory,
}: Props) {
  const [categories, setCategories] = useState(CATEGORIES);

  useEffect(() => {
    productsAPI.getCategories().then((res) => {
      if (res.success && res.categories && Array.isArray(res.categories)) {
        const mapped = res.categories.map((c: any, index: number) => ({
          id: c._id || index + 1,
          title: c.name || c,
          active: false,
        }));
        setCategories([ALL_CATEGORY, ...mapped]);
      }
    }).catch(() => {});
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
            style={[styles.chip, active && styles.activeChip]}
          >
            <Text style={[styles.text, active && styles.activeText]}>
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
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.13,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  activeChip: {
    backgroundColor: RainbowColors.tangerine,
    borderColor: RainbowColors.tangerine,
  },
  text: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#666",
  },
  activeText: {
    color: RainbowColors.pureWhite,
    fontWeight: "700",
  },
});