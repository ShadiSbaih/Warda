import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
      <Feather name="search" size={20} color="#9A9A9A" />
      <Text style={styles.placeholder}>
        Search roses, chocolates, gifts...
      </Text>

      {/* Clear Button (simulate) */}
      <View style={styles.clearButton}>
        <Ionicons name="close" size={14} color="#9A9A9A" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 48,
    backgroundColor: "#F0F0F0",
    borderRadius: RainbowRadii.pills,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 10,
    overflow: "hidden",
  },
  placeholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#9A9A9A",
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
});