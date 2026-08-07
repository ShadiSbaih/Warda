import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  item: {
    id: number;
    title: string;
    image: any;
    rating: number;
    time: string;
    price: string;
    favorite: boolean;
  };
}

export default function RelatedProductCard({
  item,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
    >
      {/* Gift Image */}

      <Image
        source={item.image}
        resizeMode="cover"
        style={styles.image}
      />

      {/* Favourite */}

      <TouchableOpacity style={styles.favorite}>
        <Ionicons
          name={
            item.favorite
              ? "heart"
              : "heart-outline"
          }
          size={18}
          color={
            item.favorite
              ? theme.colors.brand
              : theme.colors.textMuted
          }
        />
      </TouchableOpacity>

      {/* Content */}

      <View style={styles.content}>
        <WardaText
          numberOfLines={1}
          style={styles.title}
        >
          {item.title}
        </WardaText>

        <View style={styles.infoRow}>
          <View style={styles.ratingRow}>
            <FontAwesome
              name="star"
              size={13}
              color="#FFB800"
            />

            <WardaText style={styles.rating}>
              {item.rating}
            </WardaText>
          </View>

          <View style={styles.timeRow}>
            <Ionicons
              name="time-outline"
              size={13}
              color={theme.colors.textMuted}
            />

            <WardaText style={styles.time}>
              {item.time}
            </WardaText>
          </View>
        </View>

        <WardaText style={styles.price}>
          {item.price}
        </WardaText>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,

    borderRadius: 22,

    marginHorizontal: 20,
    marginTop: 18,

    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  image: {
    width: "100%",
    height: 170,
  },

  favorite: {
    position: "absolute",

    top: 15,
    right: 15,

    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: theme.colors.surface,

    justifyContent: "center",
    alignItems: "center",

    elevation: 6,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 10,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rating: {
    marginLeft: 4,
    color: theme.colors.textMuted,
    fontWeight: "600",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    marginLeft: 4,
    color: theme.colors.textMuted,
    fontSize: 13,
  },

  price: {
    marginTop: 14,

    fontSize: 18,
    fontWeight: "700",

    color: theme.colors.brand,
  },
});