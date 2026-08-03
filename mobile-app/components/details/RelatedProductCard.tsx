import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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
              ? RainbowColors.tangerine
              : RainbowColors.stone
          }
        />
      </TouchableOpacity>

      {/* Content */}

      <View style={styles.content}>
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {item.title}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.ratingRow}>
            <FontAwesome
              name="star"
              size={13}
              color="#FFB800"
            />

            <Text style={styles.rating}>
              {item.rating}
            </Text>
          </View>

          <View style={styles.timeRow}>
            <Ionicons
              name="time-outline"
              size={13}
              color={RainbowColors.stone}
            />

            <Text style={styles.time}>
              {item.time}
            </Text>
          </View>
        </View>

        <Text style={styles.price}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: RainbowColors.pureWhite,

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

    backgroundColor: RainbowColors.pureWhite,

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
    color: RainbowColors.inkBlack,
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
    color: RainbowColors.stone,
    fontWeight: "600",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    marginLeft: 4,
    color: RainbowColors.stone,
    fontSize: 13,
  },

  price: {
    marginTop: 14,

    fontSize: 18,
    fontWeight: "700",

    color: RainbowColors.tangerine,
  },
});