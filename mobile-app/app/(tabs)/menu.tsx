import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../../context/ThemeContext";
import MenuCategories from "../../components/menu/MenuCategories";
import MenuHeader from "../../components/menu/MenuHeader";
import OfferBanner from "../../components/menu/OfferBanner";
import PopularSection from "../../components/menu/PopularSection";

export default function MenuScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <MenuHeader />

          <OfferBanner />

          <MenuCategories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <PopularSection selectedCategory={selectedCategory} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 130,
  },
});
