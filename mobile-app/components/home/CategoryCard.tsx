import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
      style={styles.container}
    >
      <View style={[styles.imageContainer, selected && styles.activeImageContainer]}>
        <Image 
          source={{ uri: item.image }} 
          resizeMode="cover" 
          style={styles.image} 
        />
      </View>
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
    width: 76,
    alignItems: "center",
    marginRight: 12,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  activeImageContainer: {
    borderColor: RainbowColors.tangerine,
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 11,
    color: RainbowColors.inkBlack,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 14,
  },
  activeTitle: {
    color: RainbowColors.tangerine,
    fontWeight: "700",
  },
});