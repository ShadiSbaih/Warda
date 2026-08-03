import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

interface AddressCardProps {
  address?: string;
  isLoading?: boolean;
}

export default function AddressCard({ address = "Loading...", isLoading = false }: AddressCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Feather
            name="map-pin"
            size={20}
            color="#8E8E93"
          />
        </View>

        <View style={{ flex: 1, paddingRight: 16 }}>
          <Text style={styles.label}>
            Address
          </Text>

          {isLoading ? (
            <ActivityIndicator style={{ alignSelf: "flex-start", marginTop: 4 }} size="small" color={RainbowColors.tangerine} />
          ) : (
            <Text style={styles.address} numberOfLines={2}>
              {address}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity>
        <Feather
          name="edit-2"
          size={20}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: RainbowColors.pureWhite,
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 22,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  label: {
    color: RainbowColors.stone,
    fontSize: 13,
    fontWeight: "500",
  },

  address: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
});