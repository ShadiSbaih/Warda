import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const categories = [
  "Birthday",
  "Anniversary",
  "Graduation",
  "Engagement",
  "Random Gift",
];

export default function CategoryChips() {
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
              <Text
                style={[
                  styles.text,
                  active && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: RainbowColors.tangerine,
  },

  text: {
    color: RainbowColors.stone,
    fontSize: 14,
    fontWeight: "600",
  },

  activeText: {
    color: RainbowColors.pureWhite,
  },
});