import { useTheme } from "@/context/ThemeContext";
import { WardaBadge, WardaCard, WardaText } from "@/components/ui";
import React from "react";

import { Image, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DeliverySummaryCard() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <WardaCard shadow="md" radius="xl" padding="lg" style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.logoBadge}>
            <Ionicons name="sparkles" size={18} color={theme.colors.brand} />
          </View>

          <WardaText style={styles.store}>Warda Luxury Gifts</WardaText>
        </View>

        <WardaBadge variant="brand" text="#ORD-8452" />
      </View>

      <WardaText style={styles.label}>Total paid: $23.00</WardaText>

      <WardaText style={styles.status}>Order Delivered</WardaText>

      <Image
        source={require("../../assets/gifts/custom-hamper.png")}
        style={styles.gift}
      />
    </WardaCard>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  store: {
    fontSize: 16,
    fontWeight: "800",
    color: theme.colors.text,
  },
  label: {
    marginTop: 18,
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: "500",
  },
  status: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
  },
  gift: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 76,
    height: 76,
  },
});