import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.settings}>
        <Feather
          name="settings"
          size={22}
          color={RainbowColors.inkBlack}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },

  settings: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: RainbowColors.pureWhite,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },
});