import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

const { width } = Dimensions.get("window");

export default function OfferBanner() {
  const { theme } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container, { backgroundColor: theme.colors.brand }, theme.shadows.brand]}>
      <View style={styles.left}>
        <WardaText variant="h2" color={theme.colors.textInverse}>
          20% OFF
        </WardaText>
        <WardaText variant="h3" color={theme.colors.textInverse} weight="medium" style={{ marginTop: 4 }}>
          On all rose bouquets
        </WardaText>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.button, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.buttonText, { color: theme.colors.brand }]}>
            Order Now
          </Text>
        </TouchableOpacity>
      </View>

      <Image source={require("../../assets/gifts/red-roses.png")} resizeMode="contain" style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    height: 170,
    borderRadius: 28,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 22,
  },
  left: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginTop: 18,
    width: 115,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  image: {
    width: width * 0.42,
    height: 150,
    marginRight: 10,
  },
});
