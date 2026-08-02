import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function BottomDeliveryCard() {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Feather
          name="home"
          size={20}
          color="#D4588A"
        />
      </View>

      <View>
        <Text style={styles.label}>
          Delivering to
        </Text>

        <Text style={styles.address}>
          Home, Expected in 25 mins
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
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
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1E2D",
  },
});