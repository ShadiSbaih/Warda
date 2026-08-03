import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MenuCategories from "../../components/menu/MenuCategories";
import MenuHeader from "../../components/menu/MenuHeader";
import OfferBanner from "../../components/menu/OfferBanner";
import PopularSection from "../../components/menu/PopularSection";

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={RainbowColors.pureWhite}
      />

      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}
          <MenuHeader />

          {/* Categories */}
          <MenuCategories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Offer Banner */}
          <OfferBanner />

          {/* Popular Gifts Grid */}
          <PopularSection selectedCategory={selectedCategory} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
  },
  content: {
    paddingBottom: 130,
  },
});