import { useTheme } from "@/context/ThemeContext";
import { WardaButton, WardaText } from "@/components/ui";
import React, { useState } from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Feather } from "@expo/vector-icons";

export default function OrderSummaryCard() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [qty, setQty] = useState(1);

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
      {/* Product */}

      <View style={styles.top}>
        <Image
          source={require("../../assets/gifts/red-roses.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.info}>
          <WardaText style={styles.title}>
            Red Roses Bouquet
          </WardaText>

          <WardaText style={styles.description}>
            Luxury bouquet of natural red roses
          </WardaText>
        </View>

        <WardaText style={styles.price}>
          $12.50
        </WardaText>
      </View>

      {/* Quantity */}

      <View style={styles.quantityRow}>
        <View style={styles.quantity}>
          <TouchableOpacity
            onPress={() =>
              qty > 1 && setQty(qty - 1)
            }
          >
            <Feather
              name="minus"
              size={18}
              color={theme.colors.textMuted}
            />
          </TouchableOpacity>

          <WardaText style={styles.qty}>
            {qty}
          </WardaText>

          <TouchableOpacity
            onPress={() => setQty(qty + 1)}
          >
            <Feather
              name="plus"
              size={18}
              color={theme.colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}

      <View style={styles.line} />

      {/* Bottom */}

      <View style={styles.bottom}>
        <WardaText style={styles.items}>
          Total 2 items
        </WardaText>

        <WardaText style={styles.total}>
          $25.00
        </WardaText>
      </View>

      {/* Button */}

      <WardaButton title="Place Order" size="lg" style={{ marginTop: 4 }} />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    overflow: "hidden",
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    padding: 18,
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: theme.colors.text,
  },

  description: {
    marginTop: 4,
    color: theme.colors.textMuted,
    lineHeight: 18,
    fontSize: 13,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.brand,
  },

  quantityRow: {
    alignItems: "flex-end",
    marginTop: 12,
  },

  quantity: {
    width: 96,
    height: 36,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  qty: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
  },

  line: {
    marginVertical: 16,
    height: 1,
    backgroundColor: theme.colors.background,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  items: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: "500",
  },

  total: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
  },

});