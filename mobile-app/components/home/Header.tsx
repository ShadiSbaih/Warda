import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Location */}
      <TouchableOpacity
        style={styles.leftContainer}
        activeOpacity={0.8}
        onPress={() => router.push("/delivery-address")}
      >
        <View style={styles.iconButton}>
          <Ionicons
            name="location-outline"
            size={22}
            color="#D4588A"
          />
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.deliveryText}>Delivering to</Text>
          <View style={styles.row}>
            <Text style={styles.address}>Al Olaya, Riyadh</Text>
            <Feather
              name="chevron-down"
              size={16}
              color="#666"
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.8}
        onPress={() => router.push("/notifications")}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color="#1E1E2D"
        />
        <View style={styles.dot} />
      </TouchableOpacity>
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
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  locationContainer: {
    marginLeft: 10,
  },
  deliveryText: {
    color: "#8A8A8A",
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
    color: "#1E1E2D",
    marginRight: 4,
  },
  dot: {
    position: "absolute",
    right: 12,
    top: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D4588A",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
});