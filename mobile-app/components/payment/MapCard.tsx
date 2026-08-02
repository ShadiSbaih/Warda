import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MapCard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Clean Map */}
      <Image
        source={require("../../assets/images/payment/map.png")}
        style={styles.map}
        resizeMode="cover"
      />

      {/* Floating Center Pin */}
      <View style={styles.pinContainer}>
        <View style={styles.pinGlow} />
        <View style={styles.pin}>
          <Ionicons name="location-sharp" size={24} color="#FFFFFF" />
        </View>
      </View>

      {/* Edit / Change Location Button */}
      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.88}
        onPress={() => router.push("/delivery-address")}
      >
        <Feather name="edit-2" size={13} color="#D4588A" />
        <Text style={styles.editText}>Change Pin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginHorizontal: 20,
    height: 160,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#F7F4F6",
    shadowColor: "#D4588A",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  pinContainer: {
    position: "absolute",
    top: 28,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  pinGlow: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(212, 88, 138, 0.2)",
  },
  pin: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
  },
  editButton: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  editText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1E2D",
  },
});