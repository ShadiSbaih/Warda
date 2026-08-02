import React from "react";
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
      style={[
        styles.container,
        selected && styles.activeContainer,
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          selected && styles.activeImage,
        ]}
      >
        <Image
          source={item.image}
          resizeMode="contain"
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
    minWidth: 90,
    height: 104,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  activeContainer: {
    backgroundColor: "#D4588A",
    borderColor: "#D4588A",
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },

  imageContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
  },

  activeImage: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },

  image: {
    width: 32,
    height: 32,
  },

  title: {
    marginTop: 6,
    fontSize: 12.5,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 16,
  },

  activeTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});