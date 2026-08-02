import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Props {
  image: any;
}

export default function DetailsHeader({ image }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background */}

      <View style={styles.background} />

      {/* Back Button */}

      <TouchableOpacity
        style={[styles.circleButton, { left: 20 }]}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#222"
        />
      </TouchableOpacity>

      {/* Favourite */}

      <TouchableOpacity
        style={[styles.circleButton, { right: 20 }]}
      >
        <Ionicons
          name="heart-outline"
          size={23}
          color="#222"
        />
      </TouchableOpacity>

      {/* Main Image */}

      <Image
        source={image}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 290,
    backgroundColor: "#FCF6F8",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  background: {
    position: "absolute",
    width: width,
    height: 290,
    backgroundColor: "#FCF6F8",
  },

  circleButton: {
    position: "absolute",
    top: 55,

    width: 44,
    height: 44,
    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#D4588A",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,

    zIndex: 20,
  },

  image: {
    width: 260,
    height: 240,
    marginBottom: 10,
  },
});