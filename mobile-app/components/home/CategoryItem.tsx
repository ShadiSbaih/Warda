import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
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
    backgroundColor: RainbowColors.pureWhite,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 80,
  },
  containerActive: {
    backgroundColor: RainbowColors.tangerine,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  imageCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  imageCircleActive: {
    backgroundColor: RainbowColors.pureWhite,
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
    color: RainbowColors.pureWhite,
    fontWeight: "800",
  },
});
