import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { categories } from "../../constants/homeData";
import CategoryCard from "./CategoryCard";

interface Props {
  selectedCategoryName?: string | null;
  onSelectCategory: (name: string | null) => void;
}

export default function Categories({
  selectedCategoryName,
  onSelectCategory,
}: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = selectedCategoryName === item.name;
          return (
            <CategoryCard
              item={item}
              selected={isSelected}
              onPress={() => {
                if (isSelected) {
                  onSelectCategory(null);
                } else {
                  onSelectCategory(item.name);
                }
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
  list: {
    paddingHorizontal: 20,
    paddingRight: 6,
  },
});