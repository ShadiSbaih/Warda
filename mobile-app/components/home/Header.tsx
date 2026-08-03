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
          {/* 3D gloss overlay */}
          <LinearGradient
            colors={["rgba(255,255,255,0.7)", "rgba(255,255,255,0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
            pointerEvents="none"
          />
          <Ionicons
            name="location-outline"
            size={22}
            color={RainbowColors.tangerine}
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
        {/* 3D gloss overlay */}
        <LinearGradient
          colors={["rgba(255,255,255,0.7)", "rgba(255,255,255,0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
        <Ionicons
          name="notifications-outline"
          size={22}
          color={RainbowColors.inkBlack}
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
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    // 3D lifted pill shadow
    shadowColor: "#7a7a8c",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 4,
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
    color: RainbowColors.inkBlack,
    marginRight: 4,
  },
  dot: {
    position: "absolute",
    right: 12,
    top: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: RainbowColors.hotPink,
    borderWidth: 1.5,
    borderColor: RainbowColors.pureWhite,
  },
});