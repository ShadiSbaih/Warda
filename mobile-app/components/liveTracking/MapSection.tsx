import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function MapSection() {
  return (
    <View style={styles.container}>
      {/* Base Map */}
      <Image
        source={require("../../assets/images/tracking/map.png")}
        style={styles.map}
        resizeMode="cover"
      />

      {/* Map Overlay Tint */}
      <View style={styles.mapOverlay} />

      {/* GPS Route Path */}
      <View style={styles.routeContainer}>
        {/* Route Line 1 */}
        <View style={styles.routeSegment1} />
        {/* Route Line 2 */}
        <View style={styles.routeSegment2} />
        {/* Route Waypoint */}
        <View style={styles.waypoint} />
      </View>

      {/* Courier Marker (Moving) */}
      <View style={styles.courierMarker}>
        <View style={styles.courierPulse} />
        <View style={styles.courierIconBox}>
          <MaterialCommunityIcons name="moped" size={22} color="#FFFFFF" />
        </View>
        <View style={styles.courierPill}>
          <View style={styles.activeDot} />
          <Text style={styles.courierPillText}>Tariq · 4 min away</Text>
        </View>
      </View>

      {/* Destination Marker (Home) */}
      <View style={styles.destinationMarker}>
        <View style={styles.destinationPill}>
          <Text style={styles.destinationPillText}>Delivery Address</Text>
        </View>
        <View style={styles.destinationIconBox}>
          <Ionicons name="location-sharp" size={26} color="#D4588A" />
        </View>
      </View>
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
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(253, 246, 249, 0.15)",
  },
  routeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  routeSegment1: {
    position: "absolute",
    top: 200,
    left: 105,
    width: 140,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D4588A",
    transform: [{ rotate: "35deg" }],
    shadowColor: "#D4588A",
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  routeSegment2: {
    position: "absolute",
    top: 155,
    left: 195,
    width: 110,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D4588A",
    transform: [{ rotate: "-40deg" }],
    shadowColor: "#D4588A",
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  waypoint: {
    position: "absolute",
    top: 235,
    left: 215,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D4588A",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  courierMarker: {
    position: "absolute",
    top: 145,
    left: 60,
    alignItems: "center",
  },
  courierPulse: {
    position: "absolute",
    top: -6,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(212, 88, 138, 0.25)",
  },
  courierIconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    shadowColor: "#D4588A",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  courierPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
    backgroundColor: "#1E1E2D",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  courierPillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  destinationMarker: {
    position: "absolute",
    top: 105,
    right: 50,
    alignItems: "center",
  },
  destinationPill: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0EEF2",
  },
  destinationPillText: {
    color: "#1E1E2D",
    fontSize: 11,
    fontWeight: "700",
  },
  destinationIconBox: {
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});