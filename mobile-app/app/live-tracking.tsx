import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

import DriverCard from "../components/liveTracking/DriverCard";
import LiveTrackingHeader from "../components/liveTracking/LiveTrackingHeader";
import MapSection from "../components/liveTracking/MapSection";
import OrderDetailsButton from "../components/liveTracking/OrderDetailsButton";
import TrackingProgress from "../components/liveTracking/TrackingProgress";

export default function LiveTrackingScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.container}>
        {/* Map */}
        <MapSection />

        {/* Floating Header */}
        <SafeAreaView style={styles.headerSafeArea} edges={["top", "left", "right"]}>
          <LiveTrackingHeader />
        </SafeAreaView>

        {/* Bottom Sheet */}
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />

          <TrackingProgress />

          <DriverCard orderId={orderId} />

          <OrderDetailsButton
            onPress={() =>
              router.push({
                pathname: "/tracking",
                params: { orderId },
              })
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 35,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -5 },
    elevation: 20,
  },
  handle: {
    alignSelf: "center",
    width: 45,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D6D6D6",
    marginBottom: 16,
  },
});