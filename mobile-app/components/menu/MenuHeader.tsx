import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Props {
  onSearchPress?: () => void;
}

export default function MenuHeader({ onSearchPress }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Gift Collections</Text>
        <Text style={styles.subtitle}>Curated luxury flowers & sweet treats</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={onSearchPress || (() => router.push("/(tabs)/search"))}
        >
          <Feather name="search" size={20} color={RainbowColors.inkBlack} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: RainbowColors.cloudSurface }]}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/cart")}
        >
          <Feather name="shopping-bag" size={20} color={RainbowColors.tangerine} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  subtitle: {
    fontSize: 13,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
});