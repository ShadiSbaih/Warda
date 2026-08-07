import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

export default function PromotionCard() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background, borderColor: theme.colors.borderSubtle, borderRadius: theme.radii.xl }, theme.shadows.md]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={styles.left}>
        <View style={[styles.tag, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="sparkles" size={12} color={theme.colors.brand} />
          <WardaText variant="caption" weight="extrabold" color={theme.colors.brand}>
            VIP MEMBER PERK
          </WardaText>
        </View>

        <WardaText variant="h3" weight="bold" style={{ marginBottom: 4 }}>
          Complimentary Silk Wrap
        </WardaText>
        <WardaText variant="caption" color={theme.colors.textMuted}>
          Enjoy free luxury gift wrapping and express courier on your next arrangement.
        </WardaText>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/menu")}
          style={[styles.button, { backgroundColor: theme.colors.surface }, theme.shadows.sm]}
        >
          <WardaText variant="caption" weight="bold" color={theme.colors.brand}>
            Explore Collection
          </WardaText>
          <Feather name="arrow-right" size={15} color={theme.colors.brand} />
        </TouchableOpacity>
      </View>

      <View style={[styles.iconCircle, { backgroundColor: theme.colors.surface }, theme.shadows.sm]}>
        <Feather name="gift" size={38} color={theme.colors.brand} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  left: {
    flex: 1,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  button: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    alignSelf: "flex-start",
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
});
