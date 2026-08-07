import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
    Feather,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

interface Props {
  active?: "home" | "menu" | "orders" | "profile";
}

export default function BottomTabs({
  active = "home",
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const activeColor = theme.colors.brand;
  const inactiveColor = "#8E8E93";

  return (
    // Outer shadow wrapper (elevation doesn't work inside LinearGradient on Android)
    <View style={styles.shadowWrapper}>
      {/* Frosted-glass 3D nav bar */}
      <LinearGradient
        colors={[
          "rgba(255,255,255,0.96)",
          "rgba(255,255,255,0.88)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        {/* Top-edge white specular line — the 3D "beveled" top */}
        <View style={styles.topBevel} />

        {/* Home */}
        <TouchableOpacity style={styles.item}>
          {active === "home" && (
            <LinearGradient
              colors={[theme.colors.brand, "rgba(255,138,0,0)"]}
              style={styles.activeGlow}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          )}
          <View style={[styles.iconWrap, active === "home" && styles.iconWrapActive]}>
            <Ionicons
              name={active === "home" ? "home" : "home-outline"}
              size={22}
              color={active === "home" ? activeColor : inactiveColor}
            />
          </View>
          <WardaText style={[styles.label, { color: active === "home" ? activeColor : inactiveColor }]}>
            Home
          </WardaText>
        </TouchableOpacity>

        {/* Menu */}
        <TouchableOpacity style={styles.item}>
          {active === "menu" && (
            <LinearGradient
              colors={[theme.colors.brand, "rgba(255,138,0,0)"]}
              style={styles.activeGlow}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          )}
          <View style={[styles.iconWrap, active === "menu" && styles.iconWrapActive]}>
            <MaterialCommunityIcons
              name="flower-tulip"
              size={22}
              color={active === "menu" ? activeColor : inactiveColor}
            />
          </View>
          <WardaText style={[styles.label, { color: active === "menu" ? activeColor : inactiveColor }]}>
            Menu
          </WardaText>
        </TouchableOpacity>

        {/* Orders */}
        <TouchableOpacity style={styles.item}>
          {active === "orders" && (
            <LinearGradient
              colors={[theme.colors.brand, "rgba(255,138,0,0)"]}
              style={styles.activeGlow}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          )}
          <View style={[styles.iconWrap, active === "orders" && styles.iconWrapActive]}>
            <Feather
              name="file-text"
              size={22}
              color={active === "orders" ? activeColor : inactiveColor}
            />
          </View>
          <WardaText style={[styles.label, { color: active === "orders" ? activeColor : inactiveColor }]}>
            Orders
          </WardaText>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity style={styles.item}>
          {active === "profile" && (
            <LinearGradient
              colors={[theme.colors.brand, "rgba(255,138,0,0)"]}
              style={styles.activeGlow}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          )}
          <View style={[styles.iconWrap, active === "profile" && styles.iconWrapActive]}>
            <Ionicons
              name={active === "profile" ? "person" : "person-outline"}
              size={22}
              color={active === "profile" ? activeColor : inactiveColor}
            />
          </View>
          <WardaText style={[styles.label, { color: active === "profile" ? activeColor : inactiveColor }]}>
            Profile
          </WardaText>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  shadowWrapper: {
    // Outer drop shadow that lifts the nav bar as a 3D panel
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
    elevation: 16,
    backgroundColor: "transparent",
  },
  container: {
    height: 82,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.9)",
    overflow: "hidden",
  },
  // Single-pixel bright top edge — the 3D "lit top face"
  topBevel: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.95)",
    zIndex: 10,
  },
  item: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  // Active tab — top-down accent glow (replaces the old line indicator)
  activeGlow: {
    position: "absolute",
    top: 0,
    left: "10%",
    right: "10%",
    height: 48,
    opacity: 0.12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  // Pill background behind the active icon
  iconWrap: {
    width: 40,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapActive: {
    backgroundColor: "rgba(255,138,0,0.10)",
  },
  label: {
    marginTop: 3,
    fontSize: 11.5,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
});