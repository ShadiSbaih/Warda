import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ContinueButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={() => router.push("/payment")}
    >
      <Text style={styles.text}>
        Continue
      </Text>

      <Feather
        name="arrow-right"
        size={22}
        color={RainbowColors.pureWhite}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,

    height: 60,

    borderRadius: 30,

    backgroundColor: RainbowColors.tangerine,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: RainbowColors.tangerine,

    shadowOpacity: 0.35,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,
  },

  text: {
    color: RainbowColors.pureWhite,

    fontSize: 18,

    fontWeight: "700",

    marginRight: 10,
  },
});