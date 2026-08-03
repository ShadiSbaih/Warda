import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: 1,
    title: "Handpicked Luxury Flowers",
    subtitle:
      "Fresh, premium Dutch roses & seasonal blooms curated daily by master artisan florists.",
    image: require("../../assets/gifts/red-roses.png"),
    tag: "Artisan Quality",
  },
  {
    id: 2,
    title: "Bespoke Gift Wrapping",
    subtitle:
      "Personalize every gift with royal silk paper, gold foil wax seals, and heartfelt printed cards.",
    image: require("../../assets/gifts/chocolate-box.png"),
    tag: "Signature Presentation",
  },
  {
    id: 3,
    title: "Express 1-Hour Delivery",
    subtitle:
      "Surprise your loved ones with live GPS tracking and white-glove courier service directly to their door.",
    image: require("../../assets/gifts/anniversary-box.png"),
    tag: "Fast & Reliable",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = async () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      router.replace("/(tabs)/home");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/(tabs)/home");
  };

  const slide = SLIDES[currentSlide];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />
      <SafeAreaView style={styles.container}>
        {/* Header Skip */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>WARDA</Text>
            <Text style={styles.logoSub}>LUXURY GIFTS</Text>
          </View>
          {currentSlide < SLIDES.length - 1 && (
            <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Slide Content */}
        <View style={styles.slideContent}>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{slide.tag}</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={slide.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/* Dots */}
          <View style={styles.dotsRow}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlide === index && styles.activeDot,
                ]}
              />
            ))}
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.9}
            onPress={handleNext}
          >
            <Text style={styles.nextBtnText}>
              {currentSlide === SLIDES.length - 1 ? "Get Started" : "Continue"}
            </Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6F9",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  logoRow: {
    flexDirection: "column",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#D4588A",
    letterSpacing: 2,
  },
  logoSub: {
    fontSize: 9,
    fontWeight: "700",
    color: "#8E8E93",
    letterSpacing: 1.5,
    marginTop: -2,
  },
  skipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E8E93",
  },
  slideContent: {
    alignItems: "center",
    paddingHorizontal: 32,
  },
  tagBadge: {
    backgroundColor: "#FFF0F5",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F8D7E8",
    marginBottom: 20,
  },
  tagText: {
    color: "#D4588A",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  imageContainer: {
    width: width * 0.75,
    height: width * 0.75,
    backgroundColor: "#FFFFFF",
    borderRadius: (width * 0.75) / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    marginBottom: 36,
  },
  image: {
    width: "78%",
    height: "78%",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E1E2D",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#7E7E8F",
    textAlign: "center",
    lineHeight: 23,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    gap: 24,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  activeDot: {
    width: 28,
    backgroundColor: "#D4588A",
  },
  nextBtn: {
    backgroundColor: "#D4588A",
    height: 58,
    borderRadius: 29,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  nextBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});
