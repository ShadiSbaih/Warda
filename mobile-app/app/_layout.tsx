import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { OrdersProvider } from "../context/OrdersContext";
import { RemindersProvider } from "../context/RemindersContext";

function AuthRedirect() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, isLoading, user } = useAuth();

  const landingRoute = user?.role === "admin"
    ? "/(tabs)/admin"
    : user?.role === "delivery"
      ? "/(tabs)/delivery"
      : "/(tabs)/home";

  useEffect(() => {
    if (isLoading) return;

    const rootSegment = segments[0];
    const isAuthRoute = rootSegment === "(auth)";
    const isPublicRoute =
      rootSegment === "(auth)" ||
      rootSegment === "onboarding" ||
      rootSegment === "splash";

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && isAuthRoute) {
      router.replace(landingRoute as any);
    } else if (
      isAuthenticated &&
      user?.role === "delivery" &&
      rootSegment === "(tabs)" &&
      segments[1] !== "delivery" &&
      segments[1] !== "profile"
    ) {
      router.replace("/(tabs)/delivery");
    }
  }, [isAuthenticated, isLoading, landingRoute, router, segments, user?.role]);

  return null;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthRedirect />
        <CartProvider>
          <FavoritesProvider>
            <OrdersProvider>
              <RemindersProvider>
                <Stack
                screenOptions={{
                  headerShown: false,
                  animation: "fade",
                }}
              />
            </RemindersProvider>
          </OrdersProvider>
        </FavoritesProvider>
      </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
