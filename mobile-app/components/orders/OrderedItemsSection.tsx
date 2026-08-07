import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import { useRouter } from "expo-router";
import React from "react";

import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { ordersData } from "../../data/ordersData";
import OrderedItemCard from "./OrderedItemCard";

export default function OrderedItemsSection() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <WardaText style={styles.title}>
          Past Orders
        </WardaText>

        <TouchableOpacity>
          <WardaText style={styles.seeAll}>
            See All
          </WardaText>
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

const createStyles = (theme: any) => StyleSheet.create({
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

    color: theme.colors.text,
  },

  seeAll: {
    fontSize: 16,

    fontWeight: "700",

    color: theme.colors.brand,
  },
});