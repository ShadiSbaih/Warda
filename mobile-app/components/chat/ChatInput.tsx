import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
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
          color={RainbowColors.tangerine}
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
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 25,
    paddingHorizontal: 18,
    fontSize: 15,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: RainbowColors.cloudSurface,
    color: RainbowColors.inkBlack,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 5,
  },

  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
});