import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useTheme } from "../context/ThemeContext";
import DriverCard from "../components/liveTracking/DriverCard";
import LiveTrackingHeader from "../components/liveTracking/LiveTrackingHeader";
import MapSection from "../components/liveTracking/MapSection";
import OrderDetailsButton from "../components/liveTracking/OrderDetailsButton";
import TrackingProgress from "../components/liveTracking/TrackingProgress";
import { useSocket } from "../hooks/useSocket";
import { ordersAPI } from "../services/api";
import { Order } from "../context/OrdersContext";

const Riyadh = { latitude: 24.7136, longitude: 46.6753 };

export default function LiveTrackingScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [driverLocation, setDriverLocation] = useState(Riyadh);
  const { joinOrder, on } = useSocket();

  const loadOrder = async () => {
    if (!orderId) return;
    try {
      const res = await ordersAPI.getOrderById(orderId);
      if (res.success && res.order) {
        const mapped = { ...res.order, id: res.order._id || res.order.id } as Order;
        setOrder(mapped);
        if (mapped.driverLocation) {
          setDriverLocation({ latitude: mapped.driverLocation.lat, longitude: mapped.driverLocation.lng });
        }
      }
    } catch (e) {
      console.log("Failed to load order:", e);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;
    joinOrder(orderId);
    const cleanupLocation = on("locationUpdate", (payload: any) => {
      if (payload?.location) {
        setDriverLocation({ latitude: payload.location.lat, longitude: payload.location.lng });
      }
    });
    const cleanupStatus = on("statusUpdate", (payload: any) => {
      if (payload?.status) {
        setOrder((prev) => (prev ? { ...prev, status: payload.status } : prev));
      }
    });
    return () => {
      cleanupLocation?.();
      cleanupStatus?.();
    };
  }, [orderId, joinOrder, on]);

  const deliveryLat = order?.deliveryAddress?.coordinates?.lat;
  const deliveryLng = order?.deliveryAddress?.coordinates?.lng;
  const destination =
    typeof deliveryLat === "number" && typeof deliveryLng === "number"
      ? { latitude: deliveryLat, longitude: deliveryLng }
      : { latitude: 24.71, longitude: 46.68 };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <MapSection driverLocation={driverLocation} destination={destination} status={order?.status} />
        <SafeAreaView style={styles.headerSafeArea} edges={["top", "left", "right"]}>
          <LiveTrackingHeader />
        </SafeAreaView>
        <View style={[styles.bottomSheet, { backgroundColor: theme.colors.surface }, theme.shadows.xl]}>
          <View style={[styles.handle, { backgroundColor: theme.colors.border }]} />
          <TrackingProgress status={order?.status} driverLocation={driverLocation} destination={destination} />
          <DriverCard orderId={orderId} driver={order?.driver} />
          <OrderDetailsButton onPress={() => router.push({ pathname: "/tracking", params: { orderId } })} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSafeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 35,
  },
  handle: {
    alignSelf: "center",
    width: 45,
    height: 5,
    borderRadius: 100,
    marginBottom: 16,
  },
});
