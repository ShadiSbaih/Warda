import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

interface AddressCardProps {
  address?: string;
  isLoading?: boolean;
}

export default function AddressCard({ address = "Loading...", isLoading = false }: AddressCardProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Feather
            name="map-pin"
            size={20}
            color="#8E8E93"
          />
        </View>

        <View style={{ flex: 1, paddingRight: 16 }}>
          <WardaText style={styles.label}>
            Address
          </WardaText>

          {isLoading ? (
            <ActivityIndicator style={{ alignSelf: "flex-start", marginTop: 4 }} size="small" color={theme.colors.brand} />
          ) : (
            <WardaText style={styles.address} numberOfLines={2}>
              {address}
            </WardaText>
          )}
        </View>
      </View>

      <TouchableOpacity>
        <Feather
          name="edit-2"
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.colors.surface,
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 22,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  label: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "500",
  },

  address: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "800",
    color: theme.colors.text,
  },
});