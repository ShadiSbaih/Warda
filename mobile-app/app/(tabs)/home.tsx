import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import PopularSection from "../../components/home/PopularSection";

const FILTER_PILLS = ["Gifts", "For Whom", "Occasion", "Price", "Sets", "Flowers"];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("Gifts");

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.porcelainCanvas} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Location & Notifications Header */}
          <Header />

          {/* Search Bar at the very top */}
          <View style={styles.searchContainer}>
            <SearchBar />
          </View>


 

          {/* Categories Carousel (Circular) */}
          <View style={styles.categoriesContainer}>
            <Categories
              selectedCategoryName={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </View>

          {/* Luxury Banner */}
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => router.push("/(tabs)/menu")}
          >
            <LinearGradient
              colors={RainbowColors.cottonSkyColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.banner}
            >
              <View style={styles.bannerContent}>
                <View style={styles.bannerBadge}>
                  <Text style={styles.bannerBadgeText}>Special Offer</Text>
                </View>
                <Text style={styles.bannerTitle}>Send Fresh Roses Today</Text>
                <Text style={styles.bannerSubtitle}>
                  Get 20% off with promo code <Text style={{ fontWeight: "800", color: RainbowColors.inkBlack }}>WARDA20</Text>
                </Text>
                <View style={styles.bannerBtn}>
                  <Text style={styles.bannerBtnText}>Shop Collection</Text>
                  <Feather name="arrow-right" size={14} color={RainbowColors.tangerine} />
                </View>
              </View>

              <Image
                source={require("../../assets/gifts/red-roses.png")}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Popular / Filtered Gifts */}
          <PopularSection selectedCategoryName={selectedCategory} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.porcelainCanvas,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  searchContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  pillsContainer: {
    paddingHorizontal: 20,
    paddingRight: 6,
    gap: 8,
  },
  pill: {
    backgroundColor: RainbowColors.pureWhite,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  activePill: {
    backgroundColor: RainbowColors.peachBadge,
    borderColor: RainbowColors.peachBadge,
  },
  pillText: {
    fontSize: 13,
    color: RainbowColors.stone,
    fontWeight: "600",
  },
  activePillText: {
    color: RainbowColors.tangerine,
    fontWeight: "700",
  },
  categoriesContainer: {
    marginBottom: 6,
  },
  banner: {
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
    paddingRight: 10,
  },
  bannerBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: RainbowColors.tangerine,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    lineHeight: 24,
  },
  bannerSubtitle: {
    fontSize: 12.5,
    color: RainbowColors.stone,
    marginTop: 4,
    marginBottom: 12,
  },
  bannerBtn: {
    backgroundColor: RainbowColors.pureWhite,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 6,
  },
  bannerBtnText: {
    color: RainbowColors.tangerine,
    fontSize: 12.5,
    fontWeight: "700",
  },
  bannerImage: {
    width: 105,
    height: 105,
  },
});