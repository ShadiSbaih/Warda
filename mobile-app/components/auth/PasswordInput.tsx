import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React, { useState } from "react";

import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
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
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <WardaText style={styles.label}>
        {label}
      </WardaText>

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

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
  },

  inputContainer: {
    height: 52,
    borderWidth: 1.5,
    borderColor: theme.colors.borderSubtle,
    borderRadius: 24,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
  },
});