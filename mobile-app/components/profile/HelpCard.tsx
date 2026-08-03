import React from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface HelpCardProps {
  onContactSupport?: () => void;
  onFAQPress?: () => void;
}

export default function HelpCard({
  onContactSupport,
  onFAQPress,
}: HelpCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="headset" size={26} color={RainbowColors.tangerine} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>24/7 Luxury Concierge</Text>
          <Text style={styles.subtitle}>
            Need assistance with special wrapping, custom notes, or express timing?
          </Text>
        </View>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.chatBtn}
          activeOpacity={0.85}
          onPress={onContactSupport}
        >
          <Ionicons name="chatbubbles" size={16} color={RainbowColors.pureWhite} />
          <Text style={styles.chatBtnText}>Live Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.faqBtn}
          activeOpacity={0.85}
          onPress={onFAQPress}
        >
          <Feather name="help-circle" size={16} color={RainbowColors.inkBlack} />
          <Text style={styles.faqBtnText}>FAQ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 18,
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 20,
    shadowColor: "#5a5a7a",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  subtitle: {
    fontSize: 12.5,
    color: RainbowColors.stone,
    marginTop: 3,
    lineHeight: 18,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  chatBtn: {
    flex: 1,
    height: 44,
    backgroundColor: RainbowColors.tangerine,
    borderRadius: RainbowRadii.buttons,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  chatBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 14,
    fontWeight: "700",
  },
  faqBtn: {
    flex: 1,
    height: 44,
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: RainbowRadii.buttons,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  faqBtnText: {
    color: RainbowColors.inkBlack,
    fontSize: 14,
    fontWeight: "600",
  },
});