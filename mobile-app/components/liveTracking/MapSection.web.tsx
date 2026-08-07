import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

export default function MapSection({
  driverLocation,
  destination,
  status,
}: {
  driverLocation?: { latitude: number; longitude: number };
  destination?: { latitude: number; longitude: number };
  status?: string;
}) {
  const { theme } = useTheme();

  return (
    <View style={[styles.webFallback, { backgroundColor: theme.colors.background }]}>
      <MaterialCommunityIcons name="map-outline" size={48} color={theme.colors.textMuted} />
      <WardaText variant="body" color={theme.colors.textMuted}>
        Live tracking map is available on iOS / Android mobile apps
      </WardaText>
      {driverLocation && (
        <WardaText variant="caption" color={theme.colors.textMuted}>
          Driver Coordinates: {driverLocation.latitude.toFixed(4)}, {driverLocation.longitude.toFixed(4)}
        </WardaText>
      )}
      {status && (
        <View style={[styles.statusPill, { backgroundColor: theme.colors.surface }, theme.shadows.md]}>
          <Feather name="map-pin" size={12} color={theme.colors.brand} />
          <WardaText variant="caption" weight="bold" color={theme.colors.text}>
            Status: {status.replace(/_/g, " ")}
          </WardaText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  webFallback: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 20,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10,
  },
});
