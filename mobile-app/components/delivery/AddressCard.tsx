import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function AddressCard() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Feather
            name="map-pin"
            size={20}
            color="#8E8E93"
          />
        </View>

        <View>
          <Text style={styles.label}>
            Address
          </Text>

          <Text style={styles.address}>
            King Fahd Road, Riyadh
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <Feather
          name="edit-2"
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 22,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  label: {
    color: "#8E8292",
    fontSize: 13,
    fontWeight: "500",
  },

  address: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E2D",
  },
});