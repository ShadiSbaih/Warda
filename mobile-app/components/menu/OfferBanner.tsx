import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function OfferBanner() {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
    >
      {/* Left Content */}

      <View style={styles.left}>
        <Text style={styles.off}>20% OFF</Text>

        <Text style={styles.title}>
          On all rose{"\n"}bouquets
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Order Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Right Image */}

      <Image
        source={require("../../assets/gifts/red-roses.png")}
        resizeMode="contain"
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,

    height: 170,

    backgroundColor: RainbowColors.tangerine,

    borderRadius: 28,

    overflow: "hidden",

    flexDirection: "row",

    alignItems: "center",

    paddingLeft: 22,

    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  left: {
    flex: 1,
    justifyContent: "center",
  },

  off: {
    color: RainbowColors.pureWhite,
    fontSize: 30,
    fontWeight: "800",
  },

  title: {
    color: RainbowColors.pureWhite,

    fontSize: 18,

    marginTop: 6,

    lineHeight: 26,

    fontWeight: "500",
  },

  button: {
    marginTop: 18,

    width: 115,
    height: 40,

    borderRadius: 20,

    backgroundColor: RainbowColors.pureWhite,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: RainbowColors.tangerine,

    fontSize: 14,

    fontWeight: "700",
  },

  image: {
    width: width * 0.42,
    height: 150,

    marginRight: 10,
  },
});