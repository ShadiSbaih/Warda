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
    shop: string;
    address: string;
    status: string;
    image: any;
  };
}

export default function OrderedItemCard({
  item,
}: Props) {
  return (
    <View style={styles.container}>
      {/* 3D inset gloss — top-edge white shimmer, inflated-card effect */}
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      {/* Image */}

      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Details */}

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {item.title}
        </Text>

        <Text style={styles.address}>
          Delivery · {item.address}
        </Text>

        <Text style={styles.shop}>
          From {item.shop}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color:
                item.status === "Delivered"
                  ? "#34C759"
                  : RainbowColors.tangerine,
            },
          ]}
        >
          {item.status}
        </Text>
      </View>

      {/* Track Button */}

      <TouchableOpacity style={styles.trackButton}>
        <Text style={styles.trackText}>
          Track
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: RainbowColors.cloudSurface,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },

  address: {
    marginTop: 4,
    fontSize: 13,
    color: RainbowColors.stone,
  },

  shop: {
    marginTop: 2,
    fontSize: 12,
    color: RainbowColors.tangerine,
    fontWeight: "600",
  },

  status: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
  },

  trackButton: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  trackText: {
    color: RainbowColors.pureWhite,
    fontSize: 13,
    fontWeight: "700",
  },
});