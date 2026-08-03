import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RainbowColors } from "../../constants/Colors";

interface Props {
  region: any;
  onRegionChangeComplete: (region: any) => void;
}

export default function AddressMap({ region, onRegionChangeComplete }: Props) {
  return (
    <View style={styles.mapContainer}>
      <Text style={styles.text}>Interactive map not supported on the web.</Text>
      <Text style={styles.text}>Latitude: {region.latitude}</Text>
      <Text style={styles.text}>Longitude: {region.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#eef1f4",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: RainbowColors.stone,
    fontSize: 14,
    marginBottom: 4,
  },
});
