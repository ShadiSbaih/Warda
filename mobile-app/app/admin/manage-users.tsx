import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { adminAPI } from "../../services/api";

export default function ManageUsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers();
      if (res.success && res.users) {
        setUsers(res.users);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (user: any) => {
    Alert.alert(
      "Change Role",
      `Select a new role for ${user.name}`,
      [
        { text: "User", onPress: () => updateRole(user._id, "user") },
        { text: "Delivery", onPress: () => updateRole(user._id, "delivery") },
        { text: "Admin", onPress: () => updateRole(user._id, "admin") },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const updateRole = async (id: string, role: string) => {
    setUpdating(id);
    try {
      const res = await adminAPI.updateUserRole(id, role);
      if (res.success) {
        setUsers(users.map(u => u._id === id ? { ...u, role } : u));
      } else {
        Alert.alert("Error", res.message || "Failed to update role");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
          setUpdating(id);
          try {
            const res = await adminAPI.deleteUser(id);
            if (res.success) {
              setUsers(users.filter(u => u._id !== id));
            } else {
              Alert.alert("Error", res.message || "Failed to delete user");
            }
          } catch (e) {
            console.log(e);
          } finally {
            setUpdating(null);
          }
      } }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={RainbowColors.inkBlack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Users</Text>
        <View style={{ width: 44 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={RainbowColors.tangerine} />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name?.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>{item.role}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={[styles.actionBtn, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]} 
                  onPress={() => handleRoleChange(item)}
                  disabled={updating === item._id}
                >
                  <Feather name="edit-2" size={16} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionBtn, { backgroundColor: "rgba(239, 68, 68, 0.1)" }]}
                  onPress={() => handleDelete(item._id)}
                  disabled={updating === item._id}
                >
                  {updating === item._id ? (
                    <ActivityIndicator size="small" color="#EF4444" />
                  ) : (
                    <Feather name="trash-2" size={16} color="#EF4444" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
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
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 20,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: RainbowColors.pureWhite,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: RainbowColors.stone,
    marginBottom: 6,
  },
  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: RainbowColors.cloudSurface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RainbowRadii.pills,
  },
  roleText: {
    fontSize: 11,
    fontWeight: "700",
    color: RainbowColors.tangerine,
    textTransform: "uppercase",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
