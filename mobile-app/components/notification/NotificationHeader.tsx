import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NotificationHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Feather
          name="arrow-left"
          size={22}
          color={RainbowColors.inkBlack}
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Notifications
      </Text>

      <View style={{ width: 48 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  backButton: {
    width: 48,
    height: 48,

    borderRadius: RainbowRadii.pills,

    backgroundColor: RainbowColors.pureWhite,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#5a5a7a",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
});