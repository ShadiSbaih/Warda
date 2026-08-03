import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";

export default function DeliveryCard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Delivery Address */}

      <TouchableOpacity
        style={styles.row}
        onPress={() => router.push("/")}
      >
        <View style={styles.left}>
          <View style={styles.iconCircle}>
            <Feather
              name="user"
              size={22}
              color="#8B8B8B"
            />
          </View>

          <Text style={styles.text}>
            Deliver to: My Address
          </Text>
        </View>

        <Feather
          name="chevron-right"
          size={22}
          color={RainbowColors.stone}
        />
      </TouchableOpacity>

      {/* Divider */}

      <View style={styles.divider} />

      {/* Coupon */}

      <TouchableOpacity style={styles.row}>
        <View style={styles.left}>
          <View
            style={[
              styles.iconCircle,
              styles.greenCircle,
            ]}
          >
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={22}
              color="#33C469"
            />
          </View>

          <Text style={styles.discount}>
            20% OFF Applied
          </Text>
        </View>

        <Feather
          name="chevron-right"
          size={22}
          color={RainbowColors.stone}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 18,

    backgroundColor: RainbowColors.pureWhite,

    borderRadius: 22,

    paddingVertical: 10,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  row: {
    height: 72,

    paddingHorizontal: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#F5F5F5",

    justifyContent: "center",
    alignItems: "center",
  },

  greenCircle: {
    backgroundColor: "#E9F8EF",
  },

  text: {
    marginLeft: 14,

    fontSize: 17,

    color: "#666",

    fontWeight: "500",
  },

  discount: {
    marginLeft: 14,

    fontSize: 17,

    color: "#33C469",

    fontWeight: "700",
  },

  divider: {
    height: 1,

    marginHorizontal: 18,

    backgroundColor: "#ECECEC",
  },
});