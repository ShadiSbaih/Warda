import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { giftsData } from "../../constants/homeData";
import GiftCard from "./GiftCard";

export default function PopularSection() {
  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Popular Gifts
        </Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}

      <FlatList
        data={giftsData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <GiftCard
            item={item}
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
  },

  seeAll: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D4588A",
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 18,
  },
});