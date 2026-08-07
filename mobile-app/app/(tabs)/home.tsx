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
import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from "../../context/ThemeContext";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import PopularSection from "../../components/home/PopularSection";
import { WardaText, WardaCard } from "../../components/ui";

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
          >
            <LinearGradient
              colors={theme.colors.gradientBrand}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.banner}
            >
              <View style={styles.bannerContent}>
                <WardaCard padding="sm" shadow="none" radius="md">
                  <WardaText variant="label" color={theme.colors.brand}>
                    Special Offer
                  </WardaText>
                </WardaCard>
                <WardaText variant="h2" style={styles.bannerTitle}>
                  Send Fresh Roses Today
                </WardaText>
                <WardaText variant="body" color={theme.colors.textMuted}>
                  Get 20% off with promo code{" "}
                  <WardaText variant="body" weight="extrabold" color={theme.colors.text}>
                    WARDA20
                  </WardaText>
                </WardaText>
                <View style={[styles.bannerBtn, { backgroundColor: theme.colors.surface }]}>
                  <WardaText variant="body" weight="bold" color={theme.colors.brand}>
                    Shop Collection
                  </WardaText>
                  <Feather name="arrow-right" size={14} color={theme.colors.brand} />
                </View>
              </View>

              <Image
                source={require("../../assets/gifts/red-roses.png")}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            </LinearGradient>
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
  banner: {
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
    paddingRight: 10,
    gap: 6,
  },
  bannerTitle: {
    lineHeight: 28,
  },
  bannerBtn: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
    marginTop: 6,
  },
  bannerImage: {
    width: 105,
    height: 105,
  },
});
