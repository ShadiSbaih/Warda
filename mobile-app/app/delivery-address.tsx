import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { RainbowColors, RainbowRadii } from "../constants/Colors";
import {
    StatusBar,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";

import AddressCard from "../components/delivery/AddressCard";
import ConfirmButton from "../components/delivery/ConfirmButton";
import DeliveryHeader from "../components/delivery/DeliveryHeader";
import LocationPin from "../components/delivery/LocationPin";

export default function DeliveryAddressScreen() {
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
        backgroundColor={RainbowColors.pureWhite}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        {/* Header */}

        <DeliveryHeader />

        {/* Map */}

        <View style={styles.mapContainer}>
          <MapView 
            style={StyleSheet.absoluteFillObject}
            initialRegion={region}
            onRegionChangeComplete={handleRegionChangeComplete}
            showsUserLocation={true}
          />
          <LocationPin />
        </View>

        {/* Bottom Card */}

        <View style={styles.bottomCard}>
          <AddressCard address={address} isLoading={isLoadingAddress} />
          <ConfirmButton onPress={handleConfirm} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
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

    backgroundColor: RainbowColors.pureWhite,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    paddingTop: 10,
    paddingBottom: 30,

    shadowColor: RainbowColors.inkBlack,
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