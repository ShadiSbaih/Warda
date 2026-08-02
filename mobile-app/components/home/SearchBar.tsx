import React from "react";
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
        Search roses, chocolates, gift boxes...
      </Text>
      <View style={styles.filterButton}>
        <Ionicons name="options-outline" size={18} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginHorizontal: 20,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 6,
    shadowColor: "#D4588A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
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
    borderRadius: 15,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
  },
});