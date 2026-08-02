import React from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function ChatInput() {
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
          color="#D4588A"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 15,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: "#F3E5ED",
    color: "#1E1E2D",
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
});