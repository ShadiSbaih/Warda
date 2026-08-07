import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../context/ThemeContext";
import { WardaText } from "../components/ui";
import { useAuth } from "../context/AuthContext";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

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
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        if (isAuthenticated) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)/login");
        }
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, router]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.brand} />

      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.brand }]}>
        <View style={styles.center}>
          <Image
            source={require("../assets/images/icon.png")}
            resizeMode="contain"
            style={styles.logoImage}
          />
          <WardaText variant="h1" color={theme.colors.textInverse}>
            Warda
          </WardaText>
          <WardaText variant="body" color={theme.colors.textInverse} style={{ opacity: 0.85, marginTop: 6 }}>
            Gifts & Flowers Delivery
          </WardaText>
        </View>

        <Image
          source={require("../assets/gifts/mixed-bouquet.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 28,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    width: width,
    height: 240,
    alignSelf: "center",
  },
});
