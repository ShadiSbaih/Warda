import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

interface Props {
  lat: string;
  lng: string;
  onMapPress: (e: any) => void;
  defaultRegion: { lat: number; lng: number };
}

export default function DriverLocationMap({ lat, lng }: Props) {
  const { theme } = useTheme();

  return (
    <View style={[styles.webFallback, { backgroundColor: theme.colors.background }]}>
      <Feather name="map" size={48} color={theme.colors.textMuted} />
      <WardaText variant="h3" color={theme.colors.text}>Web Map Placeholder</WardaText>
      <WardaText variant="body" color={theme.colors.textMuted}>
        Selected position: Lat {lat}, Lng {lng}
      </WardaText>
      <WardaText variant="caption" color={theme.colors.textMuted}>
        Enter coordinates manually in the form below.
      </WardaText>
    </View>
  );
}

const styles = StyleSheet.create({
  webFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 20,
  },
});
