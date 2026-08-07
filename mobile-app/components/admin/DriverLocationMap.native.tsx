import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  lat: string;
  lng: string;
  onMapPress: (e: any) => void;
  defaultRegion: { lat: number; lng: number };
}

export default function DriverLocationMap({ lat, lng, onMapPress, defaultRegion }: Props) {
  const latitude = parseFloat(lat) || defaultRegion.lat;
  const longitude = parseFloat(lng) || defaultRegion.lng;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: defaultRegion.lat,
        longitude: defaultRegion.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      onPress={onMapPress}
    >
      <Marker coordinate={{ latitude, longitude }} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
