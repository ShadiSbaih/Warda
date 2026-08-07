import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";

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
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
        <WardaText
          style={[
            styles.message,
            isMe && styles.myMessage,
          ]}
        >
          {message}
        </WardaText>
      </View>

      <WardaText
        style={[
          styles.time,
          isMe
            ? styles.timeRight
            : styles.timeLeft,
        ]}
      >
        {time}
      </WardaText>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
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
    backgroundColor: theme.colors.brand,
    borderBottomRightRadius: 4,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  driverBubble: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },

  message: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 22,
  },

  myMessage: {
    color: theme.colors.textInverse,
    fontWeight: "500",
  },

  time: {
    marginTop: 4,
    fontSize: 11,
    color: theme.colors.textMuted,
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