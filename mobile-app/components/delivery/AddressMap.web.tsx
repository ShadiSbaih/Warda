import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  region: any;
  onRegionChangeComplete: (region: any) => void;
}

export default function AddressMap({ region, onRegionChangeComplete }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.mapContainer}>
      <WardaText style={styles.text}>Interactive map not supported on the web.</WardaText>
      <WardaText style={styles.text}>Latitude: {region.latitude}</WardaText>
      <WardaText style={styles.text}>Longitude: {region.longitude}</WardaText>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#eef1f4",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.textMuted,
    fontSize: 14,
    marginBottom: 4,
  },
});
