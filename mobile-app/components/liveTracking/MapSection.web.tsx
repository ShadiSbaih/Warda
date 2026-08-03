import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RainbowColors } from "../../constants/Colors";

export default function MapSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map is not supported on the web.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#eef1f4",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: RainbowColors.stone,
    fontSize: 14,
  },
});
