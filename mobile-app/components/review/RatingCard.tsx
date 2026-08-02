import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function RatingCard() {
  const [rating, setRating] = useState(5);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        How was your gift experience?
      </Text>
      <Text style={styles.subtitle}>
        Rate the flower freshness and delivery quality
      </Text>

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

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E2D",
  },

  subtitle: {
    fontSize: 13,
    color: "#8E8292",
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
    borderColor: "#F3E5ED",
    borderRadius: 18,
    height: 100,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 14.5,
    color: "#1E1E2D",
    backgroundColor: "#FCF8FA",
  },
});