import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
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
          color={RainbowColors.tangerine}
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
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  label: {
    color: RainbowColors.stone,
    fontSize: 13,
    fontWeight: "500",
  },

  address: {
    marginTop: 3,
    fontSize: 17,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
});