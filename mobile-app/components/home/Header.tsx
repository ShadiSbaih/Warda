import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import { WardaIconButton } from "../ui";

export default function Header() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftContainer}
        activeOpacity={0.8}
        onPress={() => router.push("/delivery-address")}
      >
        <WardaIconButton icon="map-pin" variant="default" size="md" />

        <View style={styles.locationContainer}>
          <Text style={[styles.deliveryText, { color: theme.colors.textMuted }]}>
            Delivering to
          </Text>
          <View style={styles.row}>
            <Text
              style={[styles.address, { color: theme.colors.text }]}
              numberOfLines={1}
            >
              Al Olaya, Riyadh
            </Text>
            <Feather name="chevron-down" size={16} color={theme.colors.textMuted} />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.iconWrapper}>
        <WardaIconButton
          icon="bell"
          variant="default"
          size="md"
          onPress={() => router.push("/notifications")}
        />
        <View style={[styles.dot, { backgroundColor: theme.colors.brand, borderColor: theme.colors.surface }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  locationContainer: {
    marginLeft: 10,
    flex: 1,
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  address: {
    fontSize: 16,
    fontWeight: "800",
    marginRight: 4,
    maxWidth: "80%",
  },
  iconWrapper: {
    position: "relative",
  },
  dot: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
  },
});
