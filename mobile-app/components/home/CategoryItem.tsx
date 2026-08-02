import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryItemProps {
  category: {
    id: number;
    name: string;
    image: any;
  };
  isActive?: boolean;
  onPress: () => void;
}

export default function CategoryItem({
  category,
  isActive = false,
  onPress,
}: CategoryItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.container, isActive && styles.containerActive]}
      onPress={onPress}
    >
      <View style={[styles.imageCircle, isActive && styles.imageCircleActive]}>
        <Image
          source={category.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[styles.name, isActive && styles.nameActive]}
        numberOfLines={1}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 14,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#D4588A",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 80,
  },
  containerActive: {
    backgroundColor: "#D4588A",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  imageCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  imageCircleActive: {
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 38,
    height: 38,
  },
  name: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    textAlign: "center",
  },
  nameActive: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});
