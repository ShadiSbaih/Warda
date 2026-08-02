import React from "react";
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

    backgroundColor: "#FFF3EA",

    borderRadius: 18,

    padding: 18,
  },

  text: {
    color: "#777",

    fontSize: 16,

    lineHeight: 24,
  },
});