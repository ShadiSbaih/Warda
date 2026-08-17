import { useTheme } from "@/context/ThemeContext";
import { WardaAvatar, WardaBadge, WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Alert, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { adminAPI } from "../../services/api";

export default function ManageUsersScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "user" });

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

  const openUserForm = (user?: any) => {
    setEditingId(user?._id || null);
    setForm({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", password: "", role: user?.role || "user" });
    setFormOpen(true);
  };

  const saveUser = async () => {
    if (!form.name.trim() || !form.email.trim() || (!editingId && !form.password.trim())) {
      Alert.alert("Missing details", editingId ? "Name and email are required." : "Name, email, and password are required.");
      return;
    }
    setUpdating(editingId || "new");
    const response = editingId
      ? await adminAPI.updateUser(editingId, { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), role: form.role })
      : await adminAPI.createUser({ ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
    if (response.success) {
      setUsers((current) => editingId
        ? current.map((item) => item._id === editingId ? response.user : item)
        : [response.user, ...current]);
      setFormOpen(false);
      setForm({ name: "", email: "", phone: "", password: "", role: "user" });
    } else Alert.alert("Error", response.message || "Could not save user");
    setUpdating(null);
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
        <WardaIconButton icon="arrow-left" onPress={() => router.back()} variant="ghost" />
        <WardaText style={styles.headerTitle}>Manage Users</WardaText>
        <WardaIconButton icon={formOpen ? "x" : "plus"} variant="secondary" onPress={() => formOpen ? setFormOpen(false) : openUserForm()} />
      </View>

      {formOpen && <View style={styles.form}>
        <WardaText style={styles.formTitle}>{editingId ? "Edit User" : "Add User"}</WardaText>
        {(["name", "email", "phone"] as const).map((field) => (
          <TextInput key={field} style={styles.input} placeholder={field[0].toUpperCase() + field.slice(1)} value={form[field]} onChangeText={(value) => setForm((current) => ({ ...current, [field]: value }))} keyboardType={field === "email" ? "email-address" : "default"} autoCapitalize={field === "email" ? "none" : "words"} />
        ))}
        {!editingId && <TextInput style={styles.input} placeholder="Temporary password" value={form.password} onChangeText={(value) => setForm((current) => ({ ...current, password: value }))} secureTextEntry />}
        <View style={styles.roleRow}>
          {["user", "delivery", "admin"].map((role) => <TouchableOpacity key={role} onPress={() => setForm((current) => ({ ...current, role }))} style={[styles.roleChip, form.role === role && { backgroundColor: theme.colors.brand }]}><WardaText color={form.role === role ? theme.colors.textInverse : theme.colors.text}>{role}</WardaText></TouchableOpacity>)}
        </View>
        <WardaButton title={editingId ? "Update User" : "Create User"} size="md" loading={updating !== null} disabled={updating !== null} onPress={saveUser} />
      </View>}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.brand} />
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
              <View style={styles.card}>
              <View style={styles.cardInfo}>
                <WardaAvatar name={item.name} size="md" />
                <View style={{ flex: 1 }}>
                  <WardaText style={styles.name}>{item.name}</WardaText>
                  <WardaText style={styles.email}>{item.email}</WardaText>
                  <WardaBadge
                    variant={item.role === "admin" ? "error" : item.role === "delivery" ? "warning" : "default"}
                    text={item.role}
                    style={{ marginTop: 6 }}
                  />
                </View>
              </View>

              <View style={styles.actions}>
                <WardaIconButton
                  icon="edit-2"
                  variant="secondary"
                  size="sm"
                  onPress={() => openUserForm(item)}
                />
                <WardaIconButton
                  icon="trash-2"
                  variant="danger"
                  size="sm"
                  onPress={() => handleDelete(item._id)}
                />
              </View>
            </View>
          )}
        />
      )}
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
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    shadowColor: theme.colors.text,
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
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: 6,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  form: { padding: 16, gap: 10, borderBottomWidth: 1, borderBottomColor: theme.colors.borderSubtle, backgroundColor: theme.colors.background },
  formTitle: { fontSize: 16, fontWeight: "800", color: theme.colors.text },
  input: { height: 44, borderWidth: 1, borderColor: theme.colors.borderSubtle, borderRadius: 12, paddingHorizontal: 12, color: theme.colors.text, backgroundColor: theme.colors.surface },
  roleRow: { flexDirection: "row", gap: 8, marginBottom: 4 },
  roleChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.borderSubtle },
});
