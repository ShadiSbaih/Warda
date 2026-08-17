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
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const rootSegment = segments[0];
    const isAuthRoute = rootSegment === "(auth)";
    const isTabRoute = rootSegment === "(tabs)";

    if (!isAuthenticated && isTabRoute) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && isAuthRoute) {
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated, isLoading, router, segments]);

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
