import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Categories from "../../components/home/Categories";
import Header from "../../components/home/Header";
import PopularSection from "../../components/home/PopularSection";
import SearchBar from "../../components/home/SearchBar";

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Header />
          <SearchBar value={search} onChangeText={setSearch} />
          <Categories />
          <PopularSection />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContent: {
    paddingBottom: 120,
  },
});