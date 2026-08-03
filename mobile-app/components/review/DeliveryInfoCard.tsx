import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function DeliveryInfoCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>King Fahd Road, Riyadh</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Delivered at</Text>
        <Text style={styles.value}>08:45 AM</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.driverRow}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>A</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.driverTitle}>Delivered by</Text>
          <Text style={styles.driverName}>Ahmad Ali</Text>
        </View>

        <TouchableOpacity style={styles.icon} activeOpacity={0.8}>
          <Feather name="message-circle" size={18} color={RainbowColors.tangerine} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} activeOpacity={0.8}>
          <Feather name="phone" size={18} color="#10B981" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 24,
    padding: 20,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: RainbowColors.inkBlack,
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    color: RainbowColors.stone,
  },
  divider: {
    height: 1,
    backgroundColor: RainbowColors.cloudSurface,
    marginVertical: 6,
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: RainbowColors.cloudSurface,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.tangerine,
  },
  driverTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  driverName: {
    fontSize: 13,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});