import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SearchBar() {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.container}
      onPress={() => router.push("/(tabs)/search")}
    >
      {/* 3D top-edge white sheen — makes the pill look inflated */}
      <LinearGradient
        colors={["rgba(255,255,255,0.85)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.6 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      <Feather name="search" size={20} color="#9A9A9A" />
      <Text style={styles.placeholder}>
        Search roses, chocolates, gift boxes...
      </Text>

      {/* Filter button with 3D gloss */}
      <View style={styles.filterButton}>
        <LinearGradient
          colors={["rgba(255,255,255,0.28)", "rgba(255,255,255,0.0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
        <Ionicons name="options-outline" size={18} color={RainbowColors.pureWhite} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginHorizontal: 20,
    height: 56,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.pills,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 6,
    overflow: "hidden",
    // 3D depth: stronger colored shadow anchors the pill above the canvas
    shadowColor: "#7a7a8c",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 5,
  },
  placeholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#9A9A9A",
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // Button lift shadow
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
});