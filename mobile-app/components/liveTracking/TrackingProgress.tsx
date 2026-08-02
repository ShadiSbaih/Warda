import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TrackingProgress() {
  return (
    <>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Heading your way</Text>
          <View style={styles.etaBadge}>
            <View style={styles.etaDot} />
            <Text style={styles.etaText}>Arriving in 15 mins</Text>
          </View>
        </View>
      </View>

      <View style={styles.progress}>
        {/* Step 1: Placed */}
        <View style={styles.activeCircle}>
          <Feather name="gift" size={14} color="#FFFFFF" />
        </View>

        <View style={styles.lineActive} />

        {/* Step 2: Preparing bouquet */}
        <View style={styles.activeCircle}>
          <Ionicons name="sparkles" size={13} color="#FFFFFF" />
        </View>

        <View style={styles.lineActive} />

        {/* Step 3: On the way */}
        <View style={styles.activeCirclePulse}>
          <MaterialCommunityIcons name="moped" size={16} color="#FFFFFF" />
        </View>

        <View style={styles.lineInactive} />

        {/* Step 4: Delivered */}
        <View style={styles.inactiveCircle}>
          <Feather name="home" size={14} color="#B0A8B4" />
        </View>
      </View>

      <Text style={styles.caption}>
        Your courier has collected the fresh bouquet and is heading to the destination.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    marginBottom: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  etaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  etaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  etaText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#10B981",
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  activeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  activeCirclePulse: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#FFF0F5",
    shadowColor: "#D4588A",
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 5,
  },
  inactiveCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F2F5",
    justifyContent: "center",
    alignItems: "center",
  },
  lineActive: {
    flex: 1,
    height: 3,
    backgroundColor: "#D4588A",
    borderRadius: 2,
  },
  lineInactive: {
    flex: 1,
    height: 3,
    backgroundColor: "#EBEAEF",
    borderRadius: 2,
  },
  caption: {
    marginTop: 14,
    color: "#7E7E8F",
    fontSize: 13.5,
    lineHeight: 20,
  },
});