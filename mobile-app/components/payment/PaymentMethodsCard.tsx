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
    paddingTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.borderSubtle,
    paddingVertical: 12,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.colors.brandLight,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 12,
    paddingHorizontal: 2,
    gap: 8,
  },
  noticeText: {
    flex: 1,
    fontSize: 12.5,
    color: theme.colors.textMuted,
    lineHeight: 18,
  },
});
