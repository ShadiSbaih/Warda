import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 24,
    padding: 20,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },

  subtitle: {
    fontSize: 13,
    color: RainbowColors.stone,
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
    borderColor: RainbowColors.cloudSurface,
    borderRadius: 18,
    height: 100,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 14.5,
    color: RainbowColors.inkBlack,
    backgroundColor: "#FCF8FA",
  },
});