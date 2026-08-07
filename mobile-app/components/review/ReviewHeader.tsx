import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ReviewHeader() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Feather
          name="x"
          size={24}
          color={theme.colors.text}
        />
      </TouchableOpacity>

      <WardaText style={styles.title}>
        Your gift is on its way! 🌹
      </WardaText>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  closeButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: theme.colors.surface,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
    marginLeft: 20,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  title: {
    marginTop: 24,
    marginHorizontal: 20,

    fontSize: 30,

    fontWeight: "700",

    color: theme.colors.text,
  },
});