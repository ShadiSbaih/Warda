import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

export default function SubmitReviewButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>
        Order Details
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    height: 58,
    borderRadius: 29,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: RainbowColors.pureWhite,
    fontSize: 18,
    fontWeight: "700",
  },
});