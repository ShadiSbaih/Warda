import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";

interface Props {
  onPress?: () => void;
}

export default function ConfirmButton({ onPress }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress || (() => router.back())}
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
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },

  text: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});