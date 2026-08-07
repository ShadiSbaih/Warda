import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  amount?: number;
}

export default function PaymentMethodsCard({ amount }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <WardaText style={styles.sectionTitle}>Payment Method</WardaText>

      <View style={styles.methodCard}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="cash-multiple" size={26} color={theme.colors.brand} />
        </View>

        <View style={styles.info}>
          <WardaText style={styles.title}>Cash on Delivery</WardaText>
          <WardaText style={styles.subtitle}>
            Pay ${amount?.toFixed?.(2) ?? "0.00"} when your gift arrives.
          </WardaText>
        </View>

        <Feather name="check-circle" size={22} color={theme.colors.brand} />
      </View>

      <View style={styles.notice}>
        <Feather name="shield" size={16} color="#10B981" />
        <WardaText style={styles.noticeText}>
          No card details required. Our courier will collect cash on delivery.
        </WardaText>
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
    padding: 18,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 14,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    borderRadius: 18,
    padding: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.text,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 12.5,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    gap: 8,
  },
  noticeText: {
    flex: 1,
    fontSize: 12.5,
    color: theme.colors.textMuted,
    lineHeight: 18,
  },
});
