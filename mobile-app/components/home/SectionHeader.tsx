import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
}

export default function SectionHeader({
  title,
  actionText = "See All",
  onActionPress,
}: SectionHeaderProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <WardaText style={styles.title}>{title}</WardaText>
      {onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <WardaText style={styles.action}>{actionText}</WardaText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
  },
  action: {
    fontSize: 13.5,
    fontWeight: "700",
    color: theme.colors.brand,
  },
});
