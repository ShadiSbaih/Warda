import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface Props {
  onPress?: () => void;
}

export default function OrderDetailsButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        Order Details
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});