import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";
import LocationPin from "./LocationPin";

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Props {
  region: Region;
  onRegionChangeComplete: (region: Region) => void;
}

export default function AddressMap({ region }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.mapContainer, { backgroundColor: theme.colors.background }]}>
      <Feather name="map" size={48} color={theme.colors.textMuted} />
      <WardaText variant="body" color={theme.colors.textMuted} style={styles.text}>
        Interactive map selector is available on mobile apps.
      </WardaText>
      <WardaText variant="caption" color={theme.colors.textMuted}>
        Location: {region.latitude.toFixed(4)}, {region.longitude.toFixed(4)}
      </WardaText>
      <LocationPin />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
