import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TrackingHeader() {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Feather
          name="x"
          size={24}
          color={RainbowColors.inkBlack}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Hang in there, we're on it!
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: RainbowColors.pureWhite,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
    marginLeft: 20,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  title: {
    marginTop: 24,
    marginHorizontal: 20,

    fontSize: 32,

    fontWeight: "700",

    color: RainbowColors.inkBlack,

    lineHeight: 42,
  },
});