import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Props {
  orderId?: string;
}

export default function DriverCard({ orderId }: Props) {
  const router = useRouter();

  const handleCall = () => {
    Alert.alert(
      "Calling Courier",
      "Calling Tariq Al-Harbi at +966 55 892 1478...",
      [{ text: "End Call" }]
    );
  };

  return (
    <View style={styles.container}>
      {/* 3D inset gloss — top-edge white shimmer, inflated-card effect */}
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={styles.avatarBox}>
        <Text style={styles.avatarText}>T</Text>
        <View style={styles.onlineBadge} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>Tariq Al-Harbi</Text>
        <Text style={styles.role}>Warda Dedicated Courier</Text>
        <View style={styles.ratingBox}>
          <Ionicons name="star" size={13} color="#FFA726" />
          <Text style={styles.ratingText}>4.9 (1,420 deliveries)</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.icon}
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/chat",
            params: { orderId },
          })
        }
      >
        <Ionicons name="chatbubble-ellipses" size={20} color={RainbowColors.tangerine} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.icon, { backgroundColor: "#ECFDF5" }]}
        activeOpacity={0.8}
        onPress={handleCall}
      >
        <Feather name="phone" size={20} color="#10B981" />
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
    backgroundColor: RainbowColors.cloudSurface,
    padding: 14,
    borderRadius: RainbowRadii.cards,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: RainbowColors.cloudSurface,
    position: "relative",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: RainbowColors.tangerine,
  },
  onlineBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1.5,
    borderColor: RainbowColors.pureWhite,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  role: {
    fontSize: 11.5,
    color: RainbowColors.stone,
    marginTop: 1,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: RainbowColors.stone,
    fontWeight: "600",
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});