import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RainbowColors } from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { adminAPI } from "../../services/api";

export default function AdminDashboardScreen() {
  const router = useRouter();
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

  return (
    <>
      <StatusBar backgroundColor={RainbowColors.pureWhite} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Analytics Section */}
          <Text style={styles.sectionTitle}>Overview</Text>
          
          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator color={RainbowColors.tangerine} />
            </View>
          ) : (
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: "rgba(16, 185, 129, 0.1)" }]}>
                  <Feather name="dollar-sign" size={20} color="#10B981" />
                </View>
                <Text style={styles.statValue}>${stats?.revenue?.toFixed(2) || "0.00"}</Text>
                <Text style={styles.statLabel}>Total Revenue</Text>
              </View>
              
              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: "rgba(59, 130, 246, 0.1)" }]}>
                  <Feather name="users" size={20} color="#3B82F6" />
                </View>
                <Text style={styles.statValue}>{stats?.users || 0}</Text>
                <Text style={styles.statLabel}>Users</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: "rgba(245, 158, 11, 0.1)" }]}>
                  <Feather name="shopping-bag" size={20} color="#F59E0B" />
                </View>
                <Text style={styles.statValue}>{stats?.orders || 0}</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: "rgba(139, 92, 246, 0.1)" }]}>
                  <Feather name="box" size={20} color="#8B5CF6" />
                </View>
                <Text style={styles.statValue}>{stats?.products || 0}</Text>
                <Text style={styles.statLabel}>Products</Text>
              </View>
            </View>
          )}

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Management</Text>
          
          <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push("/admin/manage-products")}
            activeOpacity={0.8}
          >
            <View style={styles.cardIcon}>
              <Feather name="box" size={24} color={RainbowColors.tangerine} />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Manage Products</Text>
              <Text style={styles.cardSubtitle}>Add or remove products from the catalog</Text>
            </View>
            <Feather name="chevron-right" size={20} color={RainbowColors.inkBlack} style={{ opacity: 0.3 }} />
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
              <Text style={styles.cardTitle}>Manage Categories</Text>
              <Text style={styles.cardSubtitle}>Edit app categories and collections</Text>
            </View>
            <Feather name="chevron-right" size={20} color={RainbowColors.inkBlack} style={{ opacity: 0.3 }} />
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
              <Text style={styles.cardTitle}>Manage Users</Text>
              <Text style={styles.cardSubtitle}>View and change user roles</Text>
            </View>
            <Feather name="chevron-right" size={20} color={RainbowColors.inkBlack} style={{ opacity: 0.3 }} />
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
              <Text style={styles.cardTitle}>Manage Orders</Text>
              <Text style={styles.cardSubtitle}>View all orders and update statuses</Text>
            </View>
            <Feather name="chevron-right" size={20} color={RainbowColors.inkBlack} style={{ opacity: 0.3 }} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: RainbowColors.cloudSurface,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    letterSpacing: -0.5,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
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
    backgroundColor: RainbowColors.pureWhite,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    shadowColor: RainbowColors.inkBlack,
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
    color: RainbowColors.inkBlack,
  },
  statLabel: {
    fontSize: 13,
    color: RainbowColors.stone,
    fontWeight: "600",
    marginTop: 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.pureWhite,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    shadowColor: RainbowColors.inkBlack,
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
    color: RainbowColors.inkBlack,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: RainbowColors.inkBlack,
    opacity: 0.6,
  },
});
