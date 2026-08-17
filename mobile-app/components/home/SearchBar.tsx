import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

export default function SearchBar() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderRadius: theme.radii.full,
          borderWidth: 1,
          borderColor: theme.colors.borderSubtle,
        },
      ]}
      onPress={() => router.push("/(tabs)/search")}
    >
      <Feather name="search" size={20} color={theme.colors.textMuted} />
      <Text style={[styles.placeholder, { color: theme.colors.textPlaceholder }]}>
        Search roses, chocolates, gifts...
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  placeholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "500",
  },
});
