import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

const BRAND_RGBA = "rgba(230, 103, 103, 0.25)";

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

  if (Platform.OS === "web") {
    return (
      <View style={[styles.webFallback, { backgroundColor: theme.colors.background }]}>
        <MaterialCommunityIcons name="map-outline" size={48} color={theme.colors.textMuted} />
        <WardaText variant="body" color={theme.colors.textMuted}>
          Live map is available on iOS / Android
        </WardaText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: driver.latitude,
          longitude: driver.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Polyline coordinates={[driver, dest]} strokeColor={theme.colors.brand} strokeWidth={4} />

        <Marker coordinate={driver}>
          <View style={styles.courierMarker}>
            <View style={[styles.courierPulse, { backgroundColor: BRAND_RGBA }]} />
            <View style={[styles.courierIconBox, { backgroundColor: theme.colors.brand, borderColor: theme.colors.surface }]}>
              <MaterialCommunityIcons name="moped" size={22} color={theme.colors.textInverse} />
            </View>
            <View style={[styles.courierPill, { backgroundColor: theme.colors.text }]}>
              <View style={[styles.activeDot, { backgroundColor: theme.colors.success }]} />
              <WardaText variant="caption" color={theme.colors.textInverse}>
                Live
              </WardaText>
            </View>
          </View>
        </Marker>

        <Marker coordinate={dest}>
          <View style={styles.destinationMarker}>
            <View style={[styles.destinationPill, { backgroundColor: theme.colors.surface, borderColor: theme.colors.borderSubtle }]}>
              <WardaText variant="caption" weight="bold" color={theme.colors.text}>
                Delivery Address
              </WardaText>
            </View>
            <View style={styles.destinationIconBox}>
              <Ionicons name="location-sharp" size={26} color={theme.colors.brand} />
            </View>
          </View>
        </Marker>
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
  webFallback: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
  },
  courierPulse: {
    position: "absolute",
    top: -6,
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  courierIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  courierPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  destinationMarker: {
    alignItems: "center",
  },
  destinationPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 2,
    borderWidth: 1,
  },
  destinationIconBox: {},
});
