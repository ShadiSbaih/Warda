import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PaymentHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Feather name="arrow-left" size={20} color="#1E1E2D" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Payment</Text>

      {/* Empty View for Center Alignment */}
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  placeholder: {
    width: 44,
    height: 44,
  },
});