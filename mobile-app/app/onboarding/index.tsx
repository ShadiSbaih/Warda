import React, { useState } from "react";
import { Dimensions, Image, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../../context/ThemeContext";
import { WardaButton, WardaText } from "../../components/ui";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: 1,
    title: "Handpicked Luxury Flowers",
    subtitle: "Fresh, premium Dutch roses & seasonal blooms curated daily by master artisan florists.",
    image: require("../../assets/gifts/red-roses.png"),
    tag: "Artisan Quality",
  },
  {
    id: 2,
    title: "Bespoke Gift Wrapping",
    subtitle: "Personalize every gift with royal silk paper, gold foil wax seals, and heartfelt printed cards.",
    image: require("../../assets/gifts/chocolate-box.png"),
    tag: "Signature Presentation",
  },
  {
    id: 3,
    title: "Express 1-Hour Delivery",
    subtitle: "Surprise your loved ones with live GPS tracking and white-glove courier service directly to their door.",
    image: require("../../assets/gifts/anniversary-box.png"),
    tag: "Fast & Reliable",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { theme } = useTheme();
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
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <View>
            <WardaText variant="h3" weight="extrabold" color={theme.colors.brand} style={{ letterSpacing: 2, fontSize: 22 }}>
              WARDA
            </WardaText>
            <WardaText variant="caption" color={theme.colors.textMuted} style={{ letterSpacing: 1.5, marginTop: -2 }}>
              LUXURY GIFTS
            </WardaText>
          </View>
          {currentSlide < SLIDES.length - 1 && (
            <TouchableOpacity onPress={handleSkip}>
              <WardaText variant="body" weight="semibold" color={theme.colors.textMuted}>
                Skip
              </WardaText>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.slideContent}>
          <View style={[styles.tagBadge, { backgroundColor: theme.colors.surface, borderColor: theme.colors.borderSubtle }]}>
            <WardaText variant="caption" weight="bold" color={theme.colors.brand}>
              {slide.tag}
            </WardaText>
          </View>

          <View
            style={[
              styles.imageContainer,
              { backgroundColor: theme.colors.surface, borderRadius: (width * 0.75) / 2 },
              theme.shadows.md,
            ]}
          >
            <Image source={slide.image} style={styles.image} resizeMode="contain" />
          </View>

          <WardaText variant="h1" align="center" style={{ marginBottom: 12 }}>
            {slide.title}
          </WardaText>
          <WardaText variant="body" align="center" color={theme.colors.textMuted} style={{ lineHeight: 23 }}>
            {slide.subtitle}
          </WardaText>
        </View>

        <View style={styles.footer}>
          <View style={styles.dotsRow}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      currentSlide === index ? theme.colors.brand : theme.colors.border,
                    width: currentSlide === index ? 28 : 8,
                  },
                ]}
              />
            ))}
          </View>

          <WardaButton
            title={currentSlide === SLIDES.length - 1 ? "Get Started" : "Continue"}
            iconRight="arrow-right"
            size="lg"
            onPress={handleNext}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  slideContent: {
    alignItems: "center",
    paddingHorizontal: 32,
  },
  tagBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
  },
  imageContainer: {
    width: width * 0.75,
    height: width * 0.75,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    marginBottom: 36,
  },
  image: {
    width: "78%",
    height: "78%",
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
    height: 8,
    borderRadius: 4,
  },
});
