import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export default function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },

  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: RainbowColors.cloudSurface,
    borderRadius: 24, // Rainbow input pill/card hybrid radius
    paddingHorizontal: 16,
    backgroundColor: RainbowColors.pureWhite,
    fontSize: 15,
    color: RainbowColors.inkBlack,
  },
});