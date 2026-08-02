import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";

export default function TabsLayout() {
  const { itemsCount } = useCart();
  const { activeOrder } = useOrders();

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
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#D4588A" : "#8E8E93"}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <MaterialCommunityIcons
                name={focused ? "flower-tulip" : "flower-tulip-outline"}
                size={26}
                color={focused ? "#D4588A" : "#8E8E93"}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Feather
                name="shopping-bag"
                size={23}
                color={focused ? "#D4588A" : "#8E8E93"}
              />
              {itemsCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {itemsCount > 9 ? "9+" : itemsCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Feather
                name="package"
                size={23}
                color={focused ? "#D4588A" : "#8E8E93"}
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
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "#D4588A" : "#8E8E93"}
              />
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

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 22,
    height: 72,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    shadowColor: "#D4588A",
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
    backgroundColor: "#FFF0F5",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#D4588A",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  activeDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#10B981",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
});