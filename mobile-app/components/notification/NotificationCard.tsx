import { useTheme } from "@/context/ThemeContext";
import { WardaCard, WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";

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
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <WardaCard style={styles.card}>
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <Feather
            name={icon}
            size={20}
            color={theme.colors.brand}
          />
        </View>

        <View style={styles.content}>
          <WardaText style={styles.title}>
            {title}
          </WardaText>

          <WardaText style={styles.message}>
            {message}
          </WardaText>
        </View>
      </View>

      <WardaText style={styles.time}>
        {time}
      </WardaText>
    </WardaCard>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.background,
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
    color: theme.colors.text,
  },

  message: {
    marginTop: 4,
    fontSize: 13.5,
    color: theme.colors.textMuted,
    lineHeight: 19,
  },

  time: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginLeft: 6,
  },
});