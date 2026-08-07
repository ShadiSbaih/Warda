import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

export default function OfferBanner() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() => router.push("/(tabs)/menu")}
      style={styles.container}
    >
      <View style={[styles.banner, { backgroundColor: theme.colors.brandLight }]}>
        <View style={styles.left}>
          <View style={styles.tagRow}>
            <View style={[styles.tagDot, { backgroundColor: theme.colors.brand }]} />
            <WardaText variant="caption" weight="bold" color={theme.colors.brand} style={styles.tagText}>
              LIMITED OFFER
            </WardaText>
          </View>

          <WardaText variant="h2" weight="bold" color={theme.colors.text} style={styles.title}>
            20% OFF Rose Bouquets
          </WardaText>

          <WardaText variant="caption" color={theme.colors.textMuted} style={styles.sub}>
            Use code <WardaText variant="caption" weight="extrabold" color={theme.colors.text}>WARDA20</WardaText> at checkout
          </WardaText>

          <View style={styles.actionRow}>
            <WardaText variant="caption" weight="bold" color={theme.colors.brand}>
              Order Now
            </WardaText>
            <Feather name="arrow-right" size={13} color={theme.colors.brand} />
          </View>
        </View>

        <Image
          source={require("../../assets/gifts/red-roses.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  banner: {
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    paddingRight: 10,
    justifyContent: "center",
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tagText: {
    letterSpacing: 0.8,
    fontSize: 11,
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 4,
  },
  sub: {
    fontSize: 12,
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  image: {
    width: 95,
    height: 95,
  },
});
