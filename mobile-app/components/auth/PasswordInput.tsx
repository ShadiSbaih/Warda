import React, { useState } from "react";
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
    color: "#1E1E2D",
  },

  inputContainer: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#F3E5ED",
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FCF8FA",
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#1E1E2D",
  },
});