import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

interface AddressCardProps {
  address?: string;
  isLoading?: boolean;
}

export default function AddressCard({ address = "Loading...", isLoading = false }: AddressCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: theme.colors.brandLight }]}>
        <Ionicons name="location-sharp" size={18} color={theme.colors.brand} />
      </View>

      <View style={styles.textGroup}>
        <WardaText variant="caption" weight="bold" color={theme.colors.textMuted} style={styles.label}>
          DELIVERING TO
        </WardaText>

        {isLoading ? (
          <ActivityIndicator style={{ alignSelf: "flex-start", marginTop: 4 }} size="small" color={theme.colors.brand} />
        ) : (
          <WardaText style={styles.address} numberOfLines={1}>
            {address}
          </WardaText>
        )}
      </View>

      <TouchableOpacity activeOpacity={0.7} style={styles.editBtn}>
        <Feather name="edit-2" size={16} color={theme.colors.brand} />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: theme.colors.background,
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  textGroup: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.6,
  },
  address: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
  },
  editBtn: {
    padding: 6,
  },
});