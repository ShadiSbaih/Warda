import React, { useState } from "react";
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

import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import Categories from "../../components/home/Categories";
import PopularSection from "../../components/home/PopularSection";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Top Location & Notifications */}
          <Header />

          {/* Luxury Banner */}
          <TouchableOpacity
            style={styles.banner}
            activeOpacity={0.92}
            onPress={() => router.push("/(tabs)/menu")}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>Special Offer</Text>
              </View>
              <Text style={styles.bannerTitle}>Send Fresh Roses Today</Text>
              <Text style={styles.bannerSubtitle}>
                Get 20% off with promo code <Text style={{ fontWeight: "800", color: "#FFFFFF" }}>WARDA20</Text>
              </Text>
              <View style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>Shop Collection</Text>
                <Feather name="arrow-right" size={14} color="#D4588A" />
              </View>
            </View>

            <Image
              source={require("../../assets/gifts/red-roses.png")}
              style={styles.bannerImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Search Bar */}
          <SearchBar />

          {/* Categories Carousel */}
          <Categories
            selectedCategoryName={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Occasion Quick Jump */}
          <View style={styles.occasionBar}>
            <TouchableOpacity
              style={styles.occasionPill}
              onPress={() => router.push("/reminders")}
            >
              <Ionicons name="gift-outline" size={16} color="#D4588A" />
              <Text style={styles.occasionText}>Occasion Reminders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.occasionPill}
              onPress={() => router.push("/(tabs)/favorites")}
            >
              <Ionicons name="heart-outline" size={16} color="#D4588A" />
              <Text style={styles.occasionText}>Saved Wishlist</Text>
            </TouchableOpacity>
          </View>

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
    backgroundColor: "#FDF6F9",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  banner: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: "#D4588A",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
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
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 24,
  },
  bannerSubtitle: {
    fontSize: 12.5,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
    marginBottom: 12,
  },
  bannerBtn: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 6,
  },
  bannerBtnText: {
    color: "#D4588A",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#D4588A",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  occasionText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1E2D",
  },
});