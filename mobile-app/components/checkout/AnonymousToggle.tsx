import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React, { useState } from "react";

import { StyleSheet, Switch, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  onToggle?: (isAnonymous: boolean) => void;
}

export default function AnonymousToggle({ onToggle }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleToggle = (value: boolean) => {
    setIsAnonymous(value);
    onToggle?.(value);
  };

  return (
    <View style={styles.container}>
      {/* Left */}
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Feather name="eye-off" size={18} color={theme.colors.brand} />
        </View>

        <View style={styles.textBlock}>
          <WardaText style={styles.title}>Anonymous Delivery</WardaText>
          <WardaText style={styles.subtitle}>
            {isAnonymous
              ? "The order will arrive without the sender's name"
              : "Your name will be shown to the recipient"}
          </WardaText>
        </View>
      </View>

      {/* Toggle */}
      <Switch
        value={isAnonymous}
        onValueChange={handleToggle}
        trackColor={{ false: "#E0E0E0", true: "#F48FB1" }}
        thumbColor={isAnonymous ? theme.colors.brand : "#F5F5F5"}
      />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FCE4EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textBlock: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A2E",
  },

  subtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});
