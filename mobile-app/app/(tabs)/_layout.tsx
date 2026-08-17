import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";

import { StyleSheet, View } from "react-native";
import { Tabs } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { itemsCount } = useCart();
  const { activeOrder } = useOrders();
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          href: ["delivery", "admin"].includes(user?.role || "") ? null : undefined,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? theme.colors.brand : theme.colors.textMuted}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          href: ["delivery", "admin"].includes(user?.role || "") ? null : undefined,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <MaterialCommunityIcons
                name={focused ? "flower-tulip" : "flower-tulip-outline"}
                size={26}
                color={focused ? theme.colors.brand : theme.colors.textMuted}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          href: ["delivery", "admin"].includes(user?.role || "") ? null : undefined,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Feather
                name="shopping-bag"
                size={23}
                color={focused ? theme.colors.brand : theme.colors.textMuted}
              />
              {itemsCount > 0 && (
                <View style={styles.badge}>
                  <WardaText style={styles.badgeText}>
                    {itemsCount > 9 ? "9+" : itemsCount}
                  </WardaText>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          href: ["delivery", "admin"].includes(user?.role || "") ? null : undefined,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Feather
                name="package"
                size={23}
                color={focused ? theme.colors.brand : theme.colors.textMuted}
              />
              {activeOrder && (
                <View style={styles.activeDot} />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          href: ["delivery", "admin"].includes(user?.role || "") ? null : undefined,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? theme.colors.brand : theme.colors.textMuted}
              />
            </View>
          ),
        }}
      />

      {/* Admin Tab - Only visible to admins */}
      <Tabs.Screen
        name="admin"
        options={{
          href: user?.role === "admin" ? "/admin" : null,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Feather
                name="shield"
                size={23}
                color={focused ? theme.colors.brand : theme.colors.textMuted}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="delivery"
        options={{
          href: user?.role === "delivery" ? "/(tabs)/delivery" : null,
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Feather name="truck" size={23} color={focused ? theme.colors.brand : theme.colors.textMuted} />
            </View>
          ),
        }}
      />

      {/* Hidden tabs reachable via router */}
      <Tabs.Screen
        name="favorites"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 22,
    height: 72,
    borderRadius: 26,
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 16,
    borderTopWidth: 0,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  activeIconBox: {
    backgroundColor: theme.colors.background,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: theme.colors.brand,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.12,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  badgeText: {
    color: theme.colors.textInverse,
    fontSize: 10,
    fontWeight: "800",
    lineHeight: 12,
  },
  activeDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#10B981", // Keep green for active order
    borderWidth: 1.5,
    borderColor: theme.colors.surface,
  },
});
