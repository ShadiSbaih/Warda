import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
            color={RainbowColors.tangerine}
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
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
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
    color: RainbowColors.inkBlack,
  },

  message: {
    marginTop: 4,
    fontSize: 13.5,
    color: RainbowColors.stone,
    lineHeight: 19,
  },

  time: {
    fontSize: 12,
    color: RainbowColors.stone,
    marginLeft: 6,
  },
});