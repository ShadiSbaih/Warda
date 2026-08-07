import { useTheme } from "@/context/ThemeContext";
import { WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { trackingAPI } from "../../services/api";

const Riyadh = { lat: 24.7136, lng: 46.6753 };

let MapView: any;
let Marker: any;
if (Platform.OS !== "web") {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function DriverLocationScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  const [lat, setLat] = useState(Riyadh.lat.toString());
  const [lng, setLng] = useState(Riyadh.lng.toString());
  const [saving, setSaving] = useState(false);

  const handleMapPress = (e: any) => {
    const coordinate = e.nativeEvent?.coordinate;
    if (coordinate) {
      setLat(coordinate.latitude.toFixed(6));
      setLng(coordinate.longitude.toFixed(6));
    }
  };

  const saveLocation = async () => {
    if (!orderId) {
      Alert.alert("Error", "Order ID is missing");
      return;
    }
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (isNaN(latitude) || isNaN(longitude)) {
      Alert.alert("Error", "Enter valid latitude and longitude");
      return;
    }

    setSaving(true);
    try {
      const res = await trackingAPI.updateDriverLocation(orderId, latitude, longitude);
      if (res.success) {
        Alert.alert("Location Updated", "Driver location has been broadcast to the customer.", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Error", res.message || "Failed to update location");
      }
    } catch (e: any) {
      Alert.alert("Error", e?.message || "Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <WardaIconButton icon="arrow-left" onPress={() => router.back()} variant="ghost" />
        <WardaText style={styles.headerTitle}>Set Driver Location</WardaText>
        <View style={{ width: 44 }} />
      </View>

      {Platform.OS === "web" ? (
        <View style={styles.webFallback}>
          <Feather name="map" size={48} color={theme.colors.textMuted} />
          <WardaText style={styles.webTitle}>Web Map Placeholder</WardaText>
          <WardaText style={styles.webSub}>Enter coordinates manually below.</WardaText>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: Riyadh.lat,
            longitude: Riyadh.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={handleMapPress}
        >
          <Marker
            coordinate={{ latitude: parseFloat(lat) || Riyadh.lat, longitude: parseFloat(lng) || Riyadh.lng }}
          />
        </MapView>
      )}

      <View style={styles.panel}>
        <WardaText style={styles.panelTitle}>Driver Coordinates</WardaText>

        <View style={styles.inputRow}>
          <View style={styles.inputBox}>
            <WardaText style={styles.inputLabel}>Latitude</WardaText>
            <TextInput
              style={styles.input}
              value={lat}
              onChangeText={setLat}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputBox}>
            <WardaText style={styles.inputLabel}>Longitude</WardaText>
            <TextInput
              style={styles.input}
              value={lng}
              onChangeText={setLng}
              keyboardType="numeric"
            />
          </View>
        </View>

        <WardaButton
          title="Update Driver Location"
          size="lg"
          loading={saving}
          disabled={saving}
          onPress={saveLocation}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  map: {
    flex: 1,
  },
  webFallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    gap: 10,
  },
  webTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  webSub: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  panel: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  inputBox: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.textMuted,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: "rgba(0,0,0,0.02)",
    color: theme.colors.text,
  },
});
