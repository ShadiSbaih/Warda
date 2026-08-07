import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";

import { StyleSheet, View } from "react-native";

interface Props {
  title: string;
  price: string;
  rating: number;
  reviews: string;
  time: string;
  description: string;
}

export default function ProductInfoCard({
  title,
  price,
  rating,
  reviews,
  time,
  description,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      {/* Top Row */}

      <View style={styles.topRow}>
        <WardaText style={styles.title}>{title}</WardaText>

        <WardaText style={styles.price}>{price}</WardaText>
      </View>

      {/* Rating */}

      <View style={styles.ratingRow}>
        <View style={styles.item}>
          <FontAwesome
            name="star"
            size={15}
            color={theme.colors.brand}
          />

          <WardaText style={styles.rating}>{rating}</WardaText>

          <WardaText style={styles.gray}>
            ({reviews} reviews)
          </WardaText>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="time"
            size={15}
            color={theme.colors.brand}
          />

          <WardaText style={styles.time}>{time}</WardaText>
        </View>
      </View>

      {/* Description */}

      <WardaText style={styles.description}>
        {description}
      </WardaText>

      {/* Tags */}

      <View style={styles.tags}>
        <View style={styles.tag}>
          <WardaText style={styles.tagText}>Romantic</WardaText>
        </View>

        <View style={styles.tag}>
          <WardaText style={styles.tagText}>Luxury</WardaText>
        </View>

        <View style={styles.tag}>
          <WardaText style={styles.tagText}>Perfect Gift</WardaText>
        </View>

        <View style={styles.tag}>
          <WardaText style={styles.tagText}>Natural Rose</WardaText>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: -45,

    backgroundColor: theme.colors.surface,

    borderRadius: 24,

    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },

  price: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.brand,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: 5,
    fontWeight: "700",
    fontSize: 15,
  },

  gray: {
    marginLeft: 4,
    color: theme.colors.textMuted,
    fontSize: 14,
  },

  time: {
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 15,
    color: theme.colors.text,
  },

  description: {
    marginTop: 12,
    color: "#7A7A7A",
    fontSize: 15,
    lineHeight: 22,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },

  tag: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 10,
    marginBottom: 8,
  },

  tagText: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontWeight: "500",
  },
});