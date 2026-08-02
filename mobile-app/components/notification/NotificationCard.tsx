import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  message: string;
  time: string;
}

export default function NotificationCard({
  icon,
  title,
  message,
  time,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <Feather
            name={icon}
            size={20}
            color="#D4588A"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>
        </View>
      </View>

      <Text style={styles.time}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  content: {
    flex: 1,
    paddingRight: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E2D",
  },

  message: {
    marginTop: 4,
    fontSize: 13.5,
    color: "#8E8292",
    lineHeight: 19,
  },

  time: {
    fontSize: 12,
    color: "#B4A8B8",
    marginLeft: 6,
  },
});