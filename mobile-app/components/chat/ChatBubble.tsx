import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props {
  message: string;
  time: string;
  sender: "me" | "driver";
}

export default function ChatBubble({
  message,
  time,
  sender,
}: Props) {
  const isMe = sender === "me";

  return (
    <View
      style={[
        styles.wrapper,
        isMe
          ? styles.rightWrapper
          : styles.leftWrapper,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isMe
            ? styles.myBubble
            : styles.driverBubble,
        ]}
      >
        <Text
          style={[
            styles.message,
            isMe && styles.myMessage,
          ]}
        >
          {message}
        </Text>
      </View>

      <Text
        style={[
          styles.time,
          isMe
            ? styles.timeRight
            : styles.timeLeft,
        ]}
      >
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginTop: 14,
  },

  rightWrapper: {
    alignItems: "flex-end",
  },

  leftWrapper: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },

  myBubble: {
    backgroundColor: "#D4588A",
    borderBottomRightRadius: 4,
    shadowColor: "#D4588A",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  driverBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3E5ED",
  },

  message: {
    fontSize: 15,
    color: "#1E1E2D",
    lineHeight: 22,
  },

  myMessage: {
    color: "#FFFFFF",
    fontWeight: "500",
  },

  time: {
    marginTop: 4,
    fontSize: 11,
    color: "#B4A8B8",
  },

  timeRight: {
    textAlign: "right",
    marginRight: 4,
  },

  timeLeft: {
    textAlign: "left",
    marginLeft: 4,
  },
});