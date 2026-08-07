import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";
import { OrderDriver } from "../../context/OrdersContext";

const DEFAULT_DRIVER: OrderDriver = {
  name: "Tariq Al-Harbi",
  phone: "+966 55 892 1478",
  plate: "KSA 4821",
  rating: 4.9,
  vehicle: "White Lexus ES",
};

export default function DriverCard({ orderId, driver }: { orderId?: string; driver?: OrderDriver }) {
  const router = useRouter();
  const { theme } = useTheme();
  const d = driver || DEFAULT_DRIVER;

  const handleCall = () => {
    Alert.alert("Calling Courier", `Calling ${d.name} at ${d.phone}...`, [{ text: "End Call" }]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }, theme.shadows.sm]}>
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={[styles.avatarBox, { backgroundColor: theme.colors.brandLight }]}>
        <Text style={[styles.avatarText, { color: theme.colors.brand }]}>{d.name?.charAt(0).toUpperCase() || "T"}</Text>
        <View style={[styles.onlineBadge, { backgroundColor: theme.colors.success, borderColor: theme.colors.surface }]} />
      </View>

      <View style={styles.info}>
        <WardaText variant="body" weight="bold" color={theme.colors.text}>
          {d.name}
        </WardaText>
        <WardaText variant="caption" color={theme.colors.textMuted}>
          Warda Dedicated Courier
        </WardaText>
        <View style={styles.ratingBox}>
          <Ionicons name="star" size={13} color={theme.colors.warning} />
          <WardaText variant="caption" color={theme.colors.textMuted}>
            {d.rating} {d.vehicle ? `· ${d.vehicle}` : ""}
          </WardaText>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.icon, { backgroundColor: theme.colors.surface }]}
        activeOpacity={0.8}
        onPress={() => router.push({ pathname: "/chat", params: { orderId } })}
      >
        <Ionicons name="chatbubble-ellipses" size={20} color={theme.colors.brand} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.icon, { backgroundColor: theme.colors.successSurface }]}
        activeOpacity={0.8}
        onPress={handleCall}
      >
        <Feather name="phone" size={20} color={theme.colors.success} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 24,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "800",
  },
  onlineBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1.5,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 4,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
