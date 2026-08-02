import React from "react";
import {  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface UserCardProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onEditPress?: () => void;
}

export default function UserCard({
  name,
  email,
  onEditPress,
}: UserCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name ? name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
        <View style={styles.vipBadge}>
          <Feather name="award" size={12} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name || "Guest User"}</Text>
          <View style={styles.tierPill}>
            <Text style={styles.tierText}>VIP Member</Text>
          </View>
        </View>
        <Text style={styles.email}>{email || "user@warda.app"}</Text>
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={onEditPress}
        activeOpacity={0.8}
      >
        <Feather name="edit-2" size={16} color="#D4588A" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F8D7E8",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#D4588A",
  },
  vipBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#D4588A",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  tierPill: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tierText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.3,
  },
  email: {
    fontSize: 13,
    color: "#888",
    marginTop: 3,
  },
  editBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
  },
});