import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { OrdersProvider } from "../context/OrdersContext";
import { RemindersProvider } from "../context/RemindersContext";

export default function RootLayout() {
  return (
    <AuthProvider>
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
  );
}
