import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

const BRAND_RGBA = "rgba(230, 103, 103, 0.25)";

const MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#f4f5f7" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7c8794" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f4f5f7" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e4e8ed" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e9edf2" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dcecf4" }] },
];

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
  const driver = driverLocation || { latitude: 24.7136, longitude: 46.6753 };
  const dest = destination || { latitude: 24.71, longitude: 46.68 };
  const isInTransit = status === "on_the_way";
  const isDelivered = status === "delivered";
  const center = {
    latitude: (driver.latitude + dest.latitude) / 2,
    longitude: (driver.longitude + dest.longitude) / 2,
  };
  const latitudeDelta = Math.max(Math.abs(driver.latitude - dest.latitude) * 2.8, 0.035);
  const longitudeDelta = Math.max(Math.abs(driver.longitude - dest.longitude) * 2.8, 0.035);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={MAP_STYLE}
        mapType="standard"
        region={{
          ...center,
          latitudeDelta,
          longitudeDelta,
        }}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
      >
        <Polyline
          coordinates={[driver, dest]}
          strokeColor={isDelivered ? theme.colors.success : isInTransit ? theme.colors.brand : "#B9C1CA"}
          strokeWidth={isInTransit ? 4 : 3}
          lineDashPattern={isInTransit || isDelivered ? undefined : [8, 8]}
        />

        {!isDelivered && (
          <Marker
            coordinate={driver}
            pinColor={isInTransit ? theme.colors.brand : "#9AA4AE"}
            title={isInTransit ? "Courier" : "Warda"}
            description={isInTransit ? "Live location" : "Preparing your gift"}
          />
        )}

        <Marker
          coordinate={dest}
          pinColor={isDelivered ? theme.colors.success : theme.colors.brand}
          title={isDelivered ? "Delivered" : "Drop-off"}
          description="Delivery destination"
        />
      </MapView>

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
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  statusPill: {
    position: "absolute",
    top: 90,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  courierMarker: {
    alignItems: "center",
    width: 76,
    minHeight: 76,
  },
  courierPulse: {
    position: "absolute",
    top: -6,
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  courierIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  courierPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  destinationMarker: {
    alignItems: "center",
    width: 82,
    minHeight: 64,
  },
  destinationPill: {
    minWidth: 64,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 2,
    borderWidth: 1,
  },
  destinationIconBox: {},
});
