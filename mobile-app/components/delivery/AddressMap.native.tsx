import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import LocationPin from "./LocationPin";

interface Props {
  region: Region;
  onRegionChangeComplete: (region: Region) => void;
}

export default function AddressMap({ region, onRegionChangeComplete }: Props) {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
      />
      <LocationPin />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop: 10,
  },
});
