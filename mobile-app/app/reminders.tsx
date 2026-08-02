import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

interface Reminder {
  id: number;
  title: string;
  person: string;
  date: string;
  occasion: "birthday" | "anniversary" | "graduation" | "other";
  daysLeft: number;
}

const occasionConfig = {
  birthday:    { label: "Birthday",    icon: "gift",      color: "#FF9800", bg: "#FFF3E0" },
  anniversary: { label: "Anniversary",   icon: "heart",     color: "#E91E63", bg: "#FCE4EC" },
  graduation:  { label: "Graduation",         icon: "award",     color: "#7B1FA2", bg: "#F3E5F5" },
  other:       { label: "Other Occasion",  icon: "star",      color: "#1565C0", bg: "#E3F2FD" },
};

const sampleReminders: Reminder[] = [
  { id: 1, title: "Birthday Mom",       person: "Mom",   date: "August 15",   occasion: "birthday",    daysLeft: 13 },
  { id: 2, title: "Anniversary",         person: "Wife", date: "September 20",  occasion: "anniversary", daysLeft: 49 },
  { id: 3, title: "Graduation Brother",            person: "Brother",   date: "June 5",    occasion: "graduation",  daysLeft: 306 },
  { id: 4, title: "Majed's Birthday", person: "Majed",  date: "August 30",  occasion: "birthday",    daysLeft: 28 },
];

export default function RemindersScreen() {
  const router = useRouter();
  const [reminders, setReminders] = useState(sampleReminders);

  const handleDelete = (id: number) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Feather name="arrow-right" size={22} color="#1A1A2E" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Occasion Reminders</Text>

            <TouchableOpacity style={styles.addBtn}>
              <Feather name="plus" size={22} color="#D4588A" />
            </TouchableOpacity>
          </View>

          {/* Info Banner */}
          <View style={styles.banner}>
            <Feather name="bell" size={20} color="#D4588A" />
            <Text style={styles.bannerText}>
              We'll remind you 1 day before the occasion so you can send your gift on time 🌹
            </Text>
          </View>

          {/* Reminders List */}
          {reminders.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name="calendar" size={56} color="#F8D7E8" />
              <Text style={styles.emptyTitle}>No occasions yet</Text>
              <Text style={styles.emptySubtitle}>
                Add your loved ones' occasions so you don't miss them
              </Text>
            </View>
          ) : (
            <View style={styles.list}>
              {reminders.map((reminder) => {
                const config = occasionConfig[reminder.occasion];
                return (
                  <View key={reminder.id} style={styles.card}>
                    {/* Icon */}
                    <View style={[styles.cardIcon, { backgroundColor: config.bg }]}>
                      <Feather
                        name={config.icon as any}
                        size={22}
                        color={config.color}
                      />
                    </View>

                    {/* Info */}
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>{reminder.title}</Text>

                      <Text style={styles.cardMeta}>
                        {config.label} · {reminder.date}
                      </Text>

                      {/* Days left badge */}
                      <View
                        style={[
                          styles.daysBadge,
                          reminder.daysLeft <= 7 && styles.daysBadgeUrgent,
                        ]}
                      >
                        <Text
                          style={[
                            styles.daysText,
                            reminder.daysLeft <= 7 && styles.daysTextUrgent,
                          ]}
                        >
                          {reminder.daysLeft <= 0
                            ? "Today! 🎉"
                            : `${reminder.daysLeft} days left`}
                        </Text>
                      </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.cardActions}>
                      <TouchableOpacity
                        style={styles.sendGiftBtn}
                        activeOpacity={0.8}
                        onPress={() => router.push("/(tabs)/menu")}
                      >
                        <Feather name="gift" size={14} color="#FFFFFF" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleDelete(reminder.id)}
                        activeOpacity={0.8}
                      >
                        <Feather name="trash-2" size={14} color="#C5A8B8" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6F9",
  },

  content: {
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A2E",
  },

  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FCE4EC",
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#FCE4EC",
    borderRadius: 14,
    padding: 14,
  },

  bannerText: {
    flex: 1,
    fontSize: 13,
    color: "#B03A72",
    lineHeight: 20,
    textAlign: "right",
  },

  list: {
    marginHorizontal: 20,
    marginTop: 20,
    gap: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A2E",
    textAlign: "right",
  },

  cardMeta: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
    textAlign: "right",
  },

  daysBadge: {
    alignSelf: "flex-end",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },

  daysBadgeUrgent: {
    backgroundColor: "#FCE4EC",
  },

  daysText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888",
  },

  daysTextUrgent: {
    color: "#D4588A",
  },

  cardActions: {
    gap: 8,
    marginLeft: 10,
  },

  sendGiftBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FDF6F9",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyState: {
    alignItems: "center",
    paddingTop: 80,
    gap: 12,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A2E",
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
