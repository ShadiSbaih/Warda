import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",

          left: 20,
          right: 20,
          bottom: 20,

          height: 78,

          borderRadius: 24,

          backgroundColor: "#FFFFFF",
          shadowColor: "#D4588A",

          elevation: 15,

          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={
                focused
                  ? "home"
                  : "home-outline"
              }
              size={28}
              color={
                focused
                  ? "#D4588A"
                  : "#999"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="flower-tulip"
              size={28}
              color={
                focused
                  ? "#D4588A"
                  : "#999"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="package"
              size={25}
              color={
                focused
                  ? "#D4588A"
                  : "#999"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={
                focused
                  ? "person"
                  : "person-outline"
              }
              size={27}
              color={
                focused
                  ? "#D4588A"
                  : "#999"
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}