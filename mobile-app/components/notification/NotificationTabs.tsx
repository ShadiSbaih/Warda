import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  active: string;
  onChange: (tab: string) => void;
}

const tabs = [
  "All",
  "Orders",
  "Promotions",
];

export default function NotificationTabs({
  active,
  onChange,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            active === tab &&
              styles.activeTab,
          ]}
          onPress={() => onChange(tab)}
        >
          <WardaText
            style={[
              styles.text,
              active === tab &&
                styles.activeText,
            ]}
          >
            {tab}
          </WardaText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 16,
  },

  tab: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.13,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },

  activeTab: {
    backgroundColor: theme.colors.brand,
    borderColor: theme.colors.brand,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  text: {
    fontSize: 13.5,
    color: theme.colors.textMuted,
    fontWeight: "600",
  },

  activeText: {
    color: theme.colors.textInverse,
    fontWeight: "700",
  },
});