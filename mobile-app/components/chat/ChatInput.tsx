import { useTheme } from "@/context/ThemeContext";
import React from "react";

import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function ChatInput() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type your message..."
        placeholderTextColor="#999"
        style={styles.input}
      />

      <TouchableOpacity style={styles.sendButton}>
        <Feather
          name="send"
          size={22}
          color={theme.colors.brand}
        />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 50,
    backgroundColor: theme.colors.surface,
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 15,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: theme.colors.borderSubtle,
    color: theme.colors.text,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 5,
  },

  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.brand,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
});