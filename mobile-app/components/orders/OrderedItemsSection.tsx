import { useRouter } from "expo-router";
import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { ordersData } from "../../data/ordersData";
import OrderedItemCard from "./OrderedItemCard";

export default function OrderedItemsSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Past Orders
        </Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}

      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderedItemCard item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  header: {
    marginHorizontal: 20,

    marginBottom: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  title: {
    fontSize: 28,

    fontWeight: "700",

    color: RainbowColors.inkBlack,
  },

  seeAll: {
    fontSize: 16,

    fontWeight: "700",

    color: RainbowColors.tangerine,
  },
});