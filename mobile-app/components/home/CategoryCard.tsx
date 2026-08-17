import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import CatalogImage from "../catalog/CatalogImage";

interface Props {
  item: any;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryCard({ item, selected, onPress }: Props) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.imageContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: selected ? theme.colors.brand : theme.colors.borderSubtle,
          },
          selected && { borderWidth: 2 },
          !selected && { borderWidth: 1 },
        ]}
      >
        <CatalogImage item={item} type="category" resizeMode="cover" style={styles.image} />
      </View>
      <Text
        numberOfLines={2}
        style={[
          styles.title,
          {
            color: selected ? theme.colors.brand : theme.colors.text,
            fontWeight: selected ? "700" : "500",
          },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    alignItems: "center",
    marginRight: 12,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
});
