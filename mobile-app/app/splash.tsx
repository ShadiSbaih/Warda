import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from "../context/ThemeContext";
import { WardaText } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function SplashScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();

  const landingRoute = user?.role === "admin"
    ? "/(tabs)/admin"
    : user?.role === "delivery"
      ? "/(tabs)/delivery"
      : "/(tabs)/home";

  useEffect(() => {
    if (isLoading) return;
    const timer = setTimeout(async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
        if (hasSeenOnboarding !== "true") {
          router.replace("/onboarding");
          return;
        }
        if (isAuthenticated) {
          router.replace(landingRoute as any);
        } else {
          router.replace("/(auth)/login");
        }
      } catch {
        if (isAuthenticated) {
          router.replace(landingRoute as any);
        } else {
          router.replace("/(auth)/login");
        }
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, landingRoute, router]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F7" />

      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#FFF9F7", "#FCE9E6"]}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <View  />
        <View style={styles.center}>
          <Image
            source={require("../assets/images/icon.png")}
            resizeMode="contain"
            style={styles.logoImage}
          />
          <WardaText variant="h1" color={theme.colors.text} style={styles.title}>
            Warda
          </WardaText>
          <WardaText variant="body" color={theme.colors.textMuted} style={styles.subtitle}>
            Gifts made meaningful
          </WardaText>

        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    paddingHorizontal: 28,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 104,
    height: 104,
    borderRadius: 26,
    marginBottom: 22,
    shadowColor: "#B96D6D",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 5,
  },
  title: {
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -0.6,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
  },
  tagline: {
    fontSize: 11,
    letterSpacing: 0.4,
  },
  footer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingBottom: 8,
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#EC6769",
  },
});
