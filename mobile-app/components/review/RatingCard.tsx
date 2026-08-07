import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React, { useState } from "react";

import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Feather } from "@expo/vector-icons";

export default function RatingCard() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [rating, setRating] = useState(5);

  return (
    <View style={styles.card}>
      <WardaText style={styles.title}>
        How was your gift experience?
      </WardaText>
      <WardaText style={styles.subtitle}>
        Rate the flower freshness and delivery quality
      </WardaText>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((item) => (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            onPress={() => setRating(item)}
            style={styles.starBtn}
          >
            <Feather
              name="star"
              size={32}
              color={rating >= item ? "#FFA726" : "#E2E2E8"}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tell us what made this gift special... 🌸"
        placeholderTextColor="#9E9EA7"
        multiline
      />
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 20,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
  },

  subtitle: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginTop: 4,
  },

  stars: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginVertical: 18,
  },

  starBtn: {
    padding: 4,
  },

  input: {
    borderWidth: 1.5,
    borderColor: theme.colors.borderSubtle,
    borderRadius: 18,
    height: 100,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 14.5,
    color: theme.colors.text,
    backgroundColor: "#FCF8FA",
  },
});