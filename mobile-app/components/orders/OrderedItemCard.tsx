import { useTheme } from "@/context/ThemeContext";
import { WardaBadge, WardaButton, WardaText } from "@/components/ui";
import React from "react";

import { Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  item: {
    id: number;
    title: string;
    shop: string;
    address: string;
    status: string;
    image: any;
  };
}

export default function OrderedItemCard({
  item,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
      {/* Image */}

      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Details */}

      <View style={styles.info}>
        <WardaText
          numberOfLines={1}
          style={styles.title}
        >
          {item.title}
        </WardaText>

        <WardaText style={styles.address}>
          Delivery · {item.address}
        </WardaText>

        <WardaText style={styles.shop}>
          From {item.shop}
        </WardaText>

        <WardaBadge
          variant={item.status === "Delivered" ? "success" : "brand"}
          text={item.status}
          style={{ marginTop: 8 }}
        />
      </View>

      {/* Track Button */}

      <WardaButton title="Track" size="sm" style={{ alignSelf: "center" }} />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: theme.colors.text,
  },

  address: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.textMuted,
  },

  shop: {
    marginTop: 2,
    fontSize: 12,
    color: theme.colors.brand,
    fontWeight: "600",
  },

});