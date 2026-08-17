import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React, { useEffect, useState } from "react";
import { Alert, View, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { adminAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboardScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await adminAPI.getDashboard();
      if (res.success && res.dashboard) {
        setStats(res.dashboard);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => Alert.alert("Sign out", "Sign out of the admin account?", [
    { text: "Cancel", style: "cancel" },
    { text: "Sign out", style: "destructive", onPress: async () => { await logout(); router.replace("/(auth)/login"); } },
  ]);

  return (
    <>
      <StatusBar backgroundColor={theme.colors.surface} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <WardaText style={styles.headerTitle}>Admin Dashboard</WardaText>
          <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
            <Feather name="log-out" size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Analytics Section */}
          <WardaText style={styles.sectionTitle}>Overview</WardaText>
          
          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator color={theme.colors.brand} />
            </View>
          ) : (
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
                  <Feather name="dollar-sign" size={20} color="#10B981" />
                </View>
                <WardaText style={styles.statValue}>${stats?.revenue?.toFixed(2) || "0.00"}</WardaText>
                <WardaText style={styles.statLabel}>Total Revenue</WardaText>
              </View>
              
              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
                  <Feather name="users" size={20} color="#3B82F6" />
                </View>
                <WardaText style={styles.statValue}>{stats?.users || 0}</WardaText>
                <WardaText style={styles.statLabel}>Users</WardaText>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: "rgba(245, 158, 11, 0.1)" }]}>
                  <Feather name="shopping-bag" size={20} color="#F59E0B" />
                </View>
                <WardaText style={styles.statValue}>{stats?.orders || 0}</WardaText>
                <WardaText style={styles.statLabel}>Orders</WardaText>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: "rgba(139, 92, 246, 0.1)" }]}>
                  <Feather name="box" size={20} color="#8B5CF6" />
                </View>
                <WardaText style={styles.statValue}>{stats?.products || 0}</WardaText>
                <WardaText style={styles.statLabel}>Products</WardaText>
              </View>
            </View>
          )}

          <WardaText style={[styles.sectionTitle, { marginTop: 24 }]}>Management</WardaText>
          
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push("/admin/manage-products")}
            activeOpacity={0.8}
          >
            <View style={styles.cardIcon}>
              <Feather name="box" size={24} color={theme.colors.brand} />
            </View>
            <View style={styles.cardTextContainer}>
              <WardaText style={styles.cardTitle}>Manage Products</WardaText>
              <WardaText style={styles.cardSubtitle}>Add or remove products from the catalog</WardaText>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.text} style={{ opacity: 0.3 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push("/admin/manage-categories" as any)}
            activeOpacity={0.8}
          >
            <View style={[styles.cardIcon, { backgroundColor: "rgba(139, 92, 246, 0.1)" }]}>
              <Feather name="grid" size={24} color="#8B5CF6" />
            </View>
            <View style={styles.cardTextContainer}>
              <WardaText style={styles.cardTitle}>Manage Categories</WardaText>
              <WardaText style={styles.cardSubtitle}>Edit app categories and collections</WardaText>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.text} style={{ opacity: 0.3 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push("/admin/manage-users" as any)}
            activeOpacity={0.8}
          >
            <View style={[styles.cardIcon, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
              <Feather name="users" size={24} color="#3B82F6" />
            </View>
            <View style={styles.cardTextContainer}>
              <WardaText style={styles.cardTitle}>Manage Users</WardaText>
              <WardaText style={styles.cardSubtitle}>View and change user roles</WardaText>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.text} style={{ opacity: 0.3 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push("/admin/manage-orders" as any)}
            activeOpacity={0.8}
          >
            <View style={[styles.cardIcon, { backgroundColor: "rgba(245, 158, 11, 0.1)" }]}>
              <Feather name="shopping-bag" size={24} color="#F59E0B" />
            </View>
            <View style={styles.cardTextContainer}>
              <WardaText style={styles.cardTitle}>Manage Orders</WardaText>
              <WardaText style={styles.cardSubtitle}>View all orders and update statuses</WardaText>
            </View>
            <Feather name="chevron-right" size={20} color={theme.colors.text} style={{ opacity: 0.3 }} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
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
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  signOutButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
    marginBottom: 4,
  },
  loadingBox: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
  },
  statLabel: {
    fontSize: 13,
    color: theme.colors.textMuted,
    fontWeight: "600",
    marginTop: 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 127, 80, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: theme.colors.text,
    opacity: 0.6,
  },
});
