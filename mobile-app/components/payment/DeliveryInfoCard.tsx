import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

interface Props {
  address?: string;
  recipientName?: string;
  recipientPhone?: string;
  deliverySlot?: string;
}

export default function DeliveryInfoCard({
  address,
  recipientName,
  recipientPhone,
  deliverySlot,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.iconCircle}>
            <Feather name="home" size={20} color="#7A7A7A" />
          </View>
          <View style={styles.info}>
            <WardaText style={styles.title}>Deliver To</WardaText>
            <WardaText style={styles.subtitle} numberOfLines={2}>
              {address || "123 Flower Lane"}
            </WardaText>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.iconCircle}>
            <Feather name="phone" size={20} color="#7A7A7A" />
          </View>
          <View style={styles.info}>
            <WardaText style={styles.title}>Recipient</WardaText>
            <WardaText style={styles.subtitle}>
              {recipientName || "Warda Customer"}
              {recipientPhone ? ` · ${recipientPhone}` : ""}
            </WardaText>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.iconCircle}>
            <Ionicons name="time-outline" size={22} color="#7A7A7A" />
          </View>
          <View style={styles.info}>
            <WardaText style={styles.title}>Delivery Time</WardaText>
            <WardaText style={styles.subtitle}>{deliverySlot || "30–45 mins"}</WardaText>
          </View>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.textMuted} />
      </View>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    paddingVertical: 6,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginHorizontal: 18,
  },
});
