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

export default function PromotionCard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 3D inset gloss — top-edge white shimmer, inflated-card effect */}
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={styles.left}>
        <View style={styles.tag}>
          <Ionicons name="sparkles" size={12} color={RainbowColors.tangerine} />
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
          <Feather name="arrow-right" size={15} color={RainbowColors.tangerine} />
        </TouchableOpacity>
      </View>

      <View style={styles.iconCircle}>
        <Feather name="gift" size={38} color={RainbowColors.tangerine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: RainbowColors.cloudSurface,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  left: {
    flex: 1,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: RainbowColors.pureWhite,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  tagText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: RainbowColors.tangerine,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  subtitle: {
    marginTop: 6,
    color: RainbowColors.stone,
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
    backgroundColor: RainbowColors.pureWhite,
    alignSelf: "flex-start",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    fontWeight: "700",
    color: RainbowColors.tangerine,
    fontSize: 13,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});