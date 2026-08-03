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
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import PopularSection from "../../components/home/PopularSection";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.pureWhite} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Top Location & Notifications */}
          <Header />

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

          {/* Search Bar */}
          <SearchBar />

          {/* Categories Carousel */}
          <Categories
            selectedCategoryName={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />


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
    backgroundColor: RainbowColors.pureWhite,
  },
  scrollContent: {
    paddingBottom: 120,
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
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
    paddingRight: 10,
  },
  bannerBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: RainbowColors.pureWhite,
    fontSize: 11,
    fontWeight: "700",
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
  occasionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 18,
    gap: 12,
  },
  occasionPill: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  occasionText: {
    fontSize: 13,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
});