import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

interface UserCardProps {
  name: string;
  email: string;
  onEditPress?: () => void;
}

export default function UserCard({ name, email, onEditPress }: UserCardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.xl,
          ...theme.shadows.md,
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: theme.colors.brandLight,
              borderColor: theme.colors.background,
            },
          ]}
        >
          <Text style={[styles.avatarText, { color: theme.colors.brand }]}>
            {name ? name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
        <View style={[styles.vipBadge, { backgroundColor: theme.colors.brand, borderColor: theme.colors.surface }]}>
          <Feather name="award" size={12} color={theme.colors.textInverse} />
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <WardaText variant="h3" weight="extrabold" numberOfLines={1}>
            {name || "Guest User"}
          </WardaText>
          <View style={[styles.tierPill, { backgroundColor: theme.colors.warningSurface }]}>
            <WardaText variant="caption" color={theme.colors.warning}>
              VIP
            </WardaText>
          </View>
        </View>
        <WardaText variant="body" color={theme.colors.textMuted} numberOfLines={1}>
          {email || "user@warda.app"}
        </WardaText>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onEditPress}
        style={[styles.editBtn, { backgroundColor: theme.colors.background }]}
      >
        <Feather name="edit-2" size={18} color={theme.colors.brand} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "800",
  },
  vipBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 3,
  },
  tierPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  editBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
});
