import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import PopularSection from "../../components/home/PopularSection";
import { WardaText } from "../../components/ui";

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Header />

          <View style={styles.searchContainer}>
            <SearchBar />
          </View>

          <Categories
            selectedCategoryName={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => router.push("/(tabs)/menu")}
            style={styles.bannerWrapper}
          >
            <View style={[styles.banner, { backgroundColor: theme.colors.brandLight }]}>
              <View style={styles.bannerContent}>
                <WardaText variant="caption" weight="bold" color={theme.colors.brand} style={styles.tagText}>
                  SPECIAL OFFER
                </WardaText>

                <WardaText variant="h2" weight="bold" color={theme.colors.text} style={styles.bannerTitle}>
                  Send Fresh Roses Today
                </WardaText>

                <WardaText variant="caption" color={theme.colors.textMuted} style={styles.bannerSub}>
                  Get 20% off · Code <WardaText variant="caption" weight="extrabold" color={theme.colors.text}>WARDA20</WardaText>
                </WardaText>

                <View style={styles.minimalBtn}>
                  <WardaText variant="caption" weight="bold" color={theme.colors.brand}>
                    Shop Collection
                  </WardaText>
                  <Feather name="arrow-right" size={13} color={theme.colors.brand} />
                </View>
              </View>

              <Image
                source={require("../../assets/gifts/red-roses.png")}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <PopularSection selectedCategoryName={selectedCategory} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  searchContainer: {
    marginTop: 18,
    marginBottom: 10,
  },
  bannerWrapper: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  banner: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerContent: {
    flex: 1,
    paddingRight: 4,
    justifyContent: "center",
  },
  tagText: {
    letterSpacing: 0.5,
    fontSize: 10,
    marginBottom: 7,
  },
  bannerTitle: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 3,
  },
  bannerSub: {
    fontSize: 13,
    marginBottom: 10,
  },
  minimalBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bannerImage: {
    width: 82,
    height: 82,
  },
});
