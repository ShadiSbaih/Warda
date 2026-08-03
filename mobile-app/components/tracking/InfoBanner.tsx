import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function InfoBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        👍 Your gift is being carefully prepared.
        It will arrive soon!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },

  text: {
    color: RainbowColors.tangerine,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
  },
});