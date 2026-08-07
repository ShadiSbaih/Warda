import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React, { useState } from "react";

import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const categories = [
  "Birthday",
  "Anniversary",
  "Graduation",
  "Engagement",
  "Random Gift",
];

export default function CategoryChips() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selected, setSelected] = useState("Birthday");

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const active = item === selected;

          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={[
                styles.chip,
                active && styles.activeChip,
              ]}
            >
              <WardaText
                style={[
                  styles.text,
                  active && styles.activeText,
                ]}
              >
                {item}
              </WardaText>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginTop: 24,
  },

  list: {
    paddingHorizontal: 20,
  },

  chip: {
    paddingHorizontal: 22,
    paddingVertical: 11,

    marginRight: 12,

    borderRadius: 20,

    backgroundColor: "#F4F4F4",
  },

  activeChip: {
    backgroundColor: theme.colors.brand,
  },

  text: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },

  activeText: {
    color: theme.colors.textInverse,
  },
});