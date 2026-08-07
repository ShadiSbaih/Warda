import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

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
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
      <WardaText
        style={[styles.name, isActive && styles.nameActive]}
        numberOfLines={1}
      >
        {category.name}
      </WardaText>
    </TouchableOpacity>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 14,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
    minWidth: 80,
  },
  containerActive: {
    backgroundColor: theme.colors.brand,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  imageCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  imageCircleActive: {
    backgroundColor: theme.colors.surface,
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
    color: theme.colors.textInverse,
    fontWeight: "800",
  },
});
