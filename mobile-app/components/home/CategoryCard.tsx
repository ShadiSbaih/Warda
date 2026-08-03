import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface Props {
  item: any;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryCard({
  item,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.container,
        selected && styles.activeContainer,
      ]}
    >
      <Image 
        source={{ uri: item.image }} 
        resizeMode="contain" 
        style={styles.image} 
      />
      <Text 
        numberOfLines={2} 
        style={[
          styles.title,
          selected && styles.activeTitle,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 85,
    height: 100,
    borderRadius: RainbowRadii.cards,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: RainbowColors.pureWhite,
    marginRight: 14,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  activeContainer: {
    backgroundColor: RainbowColors.tangerine,
    borderColor: RainbowColors.tangerine,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  image: {
    width: 44,
    height: 44,
    marginBottom: 8,
  },
  title: {
    fontSize: 12.5,
    color: RainbowColors.inkBlack,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 16,
  },
  activeTitle: {
    color: RainbowColors.pureWhite,
    fontWeight: "700",
  },
});