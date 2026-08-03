import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChangeText,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!show}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => setShow(!show)}
        >
          <Ionicons
            name={show ? "eye-outline" : "eye-off-outline"}
            size={22}
            color="#9CA3AF"
          />
        </TouchableOpacity>
      </View>
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

  inputContainer: {
    height: 52,
    borderWidth: 1.5,
    borderColor: RainbowColors.cloudSurface,
    borderRadius: 24,
    paddingHorizontal: 16,
    backgroundColor: RainbowColors.pureWhite,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: RainbowColors.inkBlack,
  },
});