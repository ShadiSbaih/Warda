import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LiveTrackingHeader() {
  const router = useRouter();

  const handleHelp = () => {
    Alert.alert(
      "Customer Support",
      "Need help with your gift delivery? Our 24/7 concierge is here to assist you.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call Concierge", onPress: () => {} },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.back()}
        activeOpacity={0.85}
      >
        <Feather name="x" size={20} color="#1E1E2D" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.helpButton}
        onPress={handleHelp}
        activeOpacity={0.85}
      >
        <Feather name="headphones" size={15} color="#D4588A" />
        <Text style={styles.helpText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  helpText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1E2D",
  },
});