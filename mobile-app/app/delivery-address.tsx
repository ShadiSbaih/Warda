import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";

import {
    StatusBar,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import AddressCard from "../components/delivery/AddressCard";
import ConfirmButton from "../components/delivery/ConfirmButton";
import DeliveryHeader from "../components/delivery/DeliveryHeader";
import AddressMap from "../components/delivery/AddressMap";

// A small fallback Region type to replace the one from react-native-maps
export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default function DeliveryAddressScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
    const router = useRouter();

    const [region, setRegion] = useState<Region>({
      latitude: 24.7136,
      longitude: 46.6753,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    const [address, setAddress] = useState("Loading...");
    const [isLoadingAddress, setIsLoadingAddress] = useState(true);

    useEffect(() => {
      reverseGeocode(region);
    }, []);

    const reverseGeocode = async (loc: { latitude: number; longitude: number }) => {
      setIsLoadingAddress(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
           setAddress("Permission to access location was denied");
           setIsLoadingAddress(false);
           return;
        }

        const result = await Location.reverseGeocodeAsync({
          latitude: loc.latitude,
          longitude: loc.longitude,
        });

        if (result.length > 0) {
          const first = result[0];
          const name = first.name || first.street || "";
          const city = first.city || first.subregion || first.region || "";
          const fullAddress = `${name}${name && city ? ', ' : ''}${city}`;
          setAddress(fullAddress || "Unknown location");
        } else {
          setAddress("Unknown location");
        }
      } catch (error) {
        console.log(error);
        setAddress("Could not get address");
      } finally {
        setIsLoadingAddress(false);
      }
    };

    const handleRegionChangeComplete = (newRegion: Region) => {
      setRegion(newRegion);
      reverseGeocode(newRegion);
    };

    const handleConfirm = async () => {
      try {
        await AsyncStorage.setItem("@warda_selected_address", JSON.stringify({
          title: "Selected Location",
          subtitle: address,
          latitude: region.latitude,
          longitude: region.longitude
        }));
        
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/(tabs)/profile");
        }
      } catch (error) {
        console.error("Failed to save address:", error);
      }
    };

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        {/* Header */}

        <DeliveryHeader />

        {/* Map */}
        <AddressMap 
          region={region} 
          onRegionChangeComplete={handleRegionChangeComplete} 
        />

        {/* Bottom Card */}

        <View style={styles.bottomCard}>
          <AddressCard address={address} isLoading={isLoadingAddress} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </SafeAreaView>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },

  mapContainer: {
    flex: 1,
    marginTop: 10,
  },

  bottomCard: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: theme.colors.surface,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    paddingTop: 10,
    paddingBottom: 30,

    shadowColor: theme.colors.text,
    shadowOpacity: 0.12,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: -4,
    },

    elevation: 20,
    zIndex: 100,
  },
});