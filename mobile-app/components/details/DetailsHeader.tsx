import { useTheme } from "@/context/ThemeContext";
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
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
          color={theme.colors.text}
        />
      </TouchableOpacity>

      {/* Favourite */}

      <TouchableOpacity
        style={[styles.circleButton, { right: 20 }]}
      >
        <Ionicons
          name="heart-outline"
          size={23}
          color={theme.colors.text}
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

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    height: 290,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  background: {
    position: "absolute",
    width: width,
    height: 290,
    backgroundColor: theme.colors.background,
  },

  circleButton: {
    position: "absolute",
    top: 55,

    width: 44,
    height: 44,
    borderRadius: 22,

    backgroundColor: theme.colors.surface,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: theme.colors.brand,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 6,

    zIndex: 20,
  },

  image: {
    width: 260,
    height: 240,
    marginBottom: 10,
  },
});