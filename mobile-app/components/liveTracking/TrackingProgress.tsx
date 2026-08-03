import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
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
          <Feather name="gift" size={14} color={RainbowColors.pureWhite} />
        </View>

        <View style={styles.lineActive} />

        {/* Step 2: Preparing bouquet */}
        <View style={styles.activeCircle}>
          <Ionicons name="sparkles" size={13} color={RainbowColors.pureWhite} />
        </View>

        <View style={styles.lineActive} />

        {/* Step 3: On the way */}
        <View style={styles.activeCirclePulse}>
          <MaterialCommunityIcons name="moped" size={16} color={RainbowColors.pureWhite} />
        </View>

        <View style={styles.lineInactive} />

        {/* Step 4: Delivered */}
        <View style={styles.inactiveCircle}>
          <Feather name="home" size={14} color={RainbowColors.stone} />
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
    color: RainbowColors.inkBlack,
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
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  activeCirclePulse: {
    width: 40,
    height: 40,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: RainbowColors.cloudSurface,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 5,
  },
  inactiveCircle: {
    width: 36,
    height: 36,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  lineActive: {
    flex: 1,
    height: 3,
    backgroundColor: RainbowColors.tangerine,
    borderRadius: RainbowRadii.pills,
  },
  lineInactive: {
    flex: 1,
    height: 3,
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: RainbowRadii.pills,
  },
  caption: {
    marginTop: 14,
    color: RainbowColors.stone,
    fontSize: 13.5,
    lineHeight: 20,
  },
});