import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function TrackingProgress() {
  return (
    <>
      <Text style={styles.heading}>
        Heading your way
      </Text>

      <Text style={styles.arriving}>
        Arriving now
      </Text>

      <View style={styles.progress}>
        <View style={styles.activeCircle}>
          <Feather name="shopping-bag" size={14} color="#FFF" />
        </View>

        <View style={styles.line} />

        <View style={styles.activeCircle}>
          <Feather name="package" size={14} color="#FFF" />
        </View>

        <View style={styles.line} />

        <View style={styles.activeCircle}>
          <Feather name="truck" size={14} color="#FFF" />
        </View>

        <View style={styles.lineInactive} />

        <View style={styles.inactiveCircle}>
          <Feather name="home" size={14} color="#D4588A" />
        </View>
      </View>

      <Text style={styles.caption}>
        Courier is on the way to deliver the gift.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },

  arriving: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "700",
  },

  progress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  activeCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
  },

  inactiveCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFE7DF",
    justifyContent: "center",
    alignItems: "center",
  },

  line: {
    flex: 1,
    height: 3,
    backgroundColor: "#D4588A",
  },

  lineInactive: {
    flex: 1,
    height: 3,
    backgroundColor: "#FFD5C8",
  },

  caption: {
    marginTop: 18,
    color: "#777",
    fontSize: 15,
    lineHeight: 22,
  },
});