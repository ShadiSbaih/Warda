import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";

export default function ConfirmButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.back()}
    >
      <Text style={styles.text}>
        Confirm Pin Location
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginBottom: 24,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});