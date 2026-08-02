import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PromotionCard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.tag}>
          <Ionicons name="sparkles" size={12} color="#D4588A" />
          <Text style={styles.tagText}>VIP MEMBER PERK</Text>
        </View>

        <Text style={styles.title}>Complimentary Silk Wrap</Text>
        <Text style={styles.subtitle}>
          Enjoy free luxury gift wrapping and express courier on your next arrangement.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/menu")}
        >
          <Text style={styles.buttonText}>Explore Collection</Text>
          <Feather name="arrow-right" size={15} color="#D4588A" />
        </TouchableOpacity>
      </View>

      <View style={styles.iconCircle}>
        <Feather name="gift" size={38} color="#D4588A" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: "#FFF0F5",
    borderWidth: 1,
    borderColor: "#F8D7E8",
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  left: {
    flex: 1,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  tagText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#D4588A",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  subtitle: {
    marginTop: 6,
    color: "#7E7E8F",
    fontSize: 12.5,
    lineHeight: 18,
  },
  button: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    shadowColor: "#D4588A",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    fontWeight: "700",
    color: "#D4588A",
    fontSize: 13,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#D4588A",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});