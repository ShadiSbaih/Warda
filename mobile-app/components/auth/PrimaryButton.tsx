import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={RainbowColors.pureWhite} />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    backgroundColor: RainbowColors.tangerine,
    borderRadius: RainbowRadii.buttons,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  text: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});