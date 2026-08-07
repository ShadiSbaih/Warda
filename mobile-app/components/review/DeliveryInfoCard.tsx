import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function DeliveryInfoCard() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <WardaText style={styles.label}>Address</WardaText>
        <WardaText style={styles.value}>King Fahd Road, Riyadh</WardaText>
      </View>

      <View style={styles.row}>
        <WardaText style={styles.label}>Delivered at</WardaText>
        <WardaText style={styles.value}>08:45 AM</WardaText>
      </View>

      <View style={styles.divider} />

      <View style={styles.driverRow}>
        <View style={styles.avatarBox}>
          <WardaText style={styles.avatarText}>A</WardaText>
        </View>

        <View style={{ flex: 1 }}>
          <WardaText style={styles.driverTitle}>Delivered by</WardaText>
          <WardaText style={styles.driverName}>Ahmad Ali</WardaText>
        </View>

        <TouchableOpacity style={styles.icon} activeOpacity={0.8}>
          <Feather name="message-circle" size={18} color={theme.colors.brand} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} activeOpacity={0.8}>
          <Feather name="phone" size={18} color="#10B981" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 20,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    color: theme.colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.background,
    marginVertical: 6,
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: theme.colors.borderSubtle,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.brand,
  },
  driverTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
  },
  driverName: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});