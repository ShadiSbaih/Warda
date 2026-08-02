import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Reminder, useReminders } from "../context/RemindersContext";

const OCCASION_CONFIG: Record<
  Reminder["occasion"],
  { label: string; icon: keyof typeof Feather.glyphMap; color: string; bg: string }
> = {
  birthday: { label: "Birthday", icon: "gift", color: "#FF9800", bg: "#FFF3E0" },
  anniversary: { label: "Anniversary", icon: "heart", color: "#E91E63", bg: "#FCE4EC" },
  graduation: { label: "Graduation", icon: "award", color: "#7B1FA2", bg: "#F3E5F5" },
  other: { label: "Special Moment", icon: "star", color: "#1565C0", bg: "#E3F2FD" },
};

export default function RemindersScreen() {
  const router = useRouter();
  const { reminders, addReminder, removeReminder } = useReminders();

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [date, setDate] = useState("");
  const [daysLeft, setDaysLeft] = useState("7");
  const [occasion, setOccasion] = useState<Reminder["occasion"]>("birthday");

  const handleSaveReminder = async () => {
    if (!title.trim() || !person.trim() || !date.trim()) {
      Alert.alert("Missing Fields", "Please enter the occasion title, person name, and date.");
      return;
    }

    await addReminder({
      title: title.trim(),
      person: person.trim(),
      date: date.trim(),
      occasion,
      daysLeft: parseInt(daysLeft, 10) || 7,
    });

    setTitle("");
    setPerson("");
    setDate("");
    setDaysLeft("7");
    setModalVisible(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />

      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#1E1E2D" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Occasion Reminders</Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Info Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Feather name="bell" size={18} color="#D4588A" />
            </View>
            <Text style={styles.bannerText}>
              Never miss a milestone! We'll notify you 24 hours before so your custom bouquet arrives on time 🌹
            </Text>
          </View>

          {/* Reminders List */}
          {reminders.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBox}>
                <Ionicons name="calendar-outline" size={48} color="#D4588A" />
              </View>
              <Text style={styles.emptyTitle}>No Occasions Saved</Text>
              <Text style={styles.emptySubtitle}>
                Add birthdays, anniversaries, and graduations of your loved ones to get timely delivery reminders.
              </Text>
              <TouchableOpacity
                style={styles.createBtn}
                onPress={() => setModalVisible(true)}
              >
                <Feather name="plus" size={16} color="#FFFFFF" />
                <Text style={styles.createBtnText}>Add First Reminder</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.list}>
              {reminders.map((reminder) => {
                const config = OCCASION_CONFIG[reminder.occasion] || OCCASION_CONFIG.other;
                return (
                  <View key={reminder.id} style={styles.card}>
                    {/* Icon */}
                    <View style={[styles.cardIcon, { backgroundColor: config.bg }]}>
                      <Feather
                        name={config.icon}
                        size={22}
                        color={config.color}
                      />
                    </View>

                    {/* Info */}
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>{reminder.title}</Text>
                      <Text style={styles.cardMeta}>
                        For {reminder.person} · {config.label} · {reminder.date}
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
                        activeOpacity={0.85}
                        onPress={() => router.push("/(tabs)/menu")}
                      >
                        <Feather name="gift" size={16} color="#FFFFFF" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => removeReminder(reminder.id)}
                        activeOpacity={0.8}
                      >
                        <Feather name="trash-2" size={15} color="#A0A0A0" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>

        {/* Add Reminder Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Occasion Reminder</Text>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Feather name="x" size={18} color="#1E1E2D" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Occasion Title</Text>
                  <TextInput
                    placeholder="e.g. Mom's Birthday / Wedding Anniversary"
                    placeholderTextColor="#A0A0A0"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.modalInput}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Person / Loved One</Text>
                  <TextInput
                    placeholder="e.g. Sarah / Mom / Dearest"
                    placeholderTextColor="#A0A0A0"
                    value={person}
                    onChangeText={setPerson}
                    style={styles.modalInput}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Date (e.g. August 24 or Sep 15)</Text>
                  <TextInput
                    placeholder="e.g. August 24"
                    placeholderTextColor="#A0A0A0"
                    value={date}
                    onChangeText={setDate}
                    style={styles.modalInput}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Occasion Category</Text>
                  <View style={styles.occasionPicker}>
                    {(["birthday", "anniversary", "graduation", "other"] as const).map((occ) => (
                      <TouchableOpacity
                        key={occ}
                        style={[
                          styles.occChip,
                          occasion === occ && styles.occChipActive,
                        ]}
                        onPress={() => setOccasion(occ)}
                      >
                        <Text
                          style={[
                            styles.occChipText,
                            occasion === occ && styles.occChipTextActive,
                          ]}
                        >
                          {OCCASION_CONFIG[occ].label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.saveBtn}
                  activeOpacity={0.9}
                  onPress={handleSaveReminder}
                >
                  <Text style={styles.saveBtnText}>Save Reminder</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
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
    paddingVertical: 12,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 8,
    backgroundColor: "#FFF0F5",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F8D7E8",
  },
  bannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    flex: 1,
    fontSize: 12.5,
    color: "#B03A72",
    lineHeight: 18,
    fontWeight: "500",
  },
  list: {
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
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
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E2D",
  },
  cardMeta: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  daysBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F3F7",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  daysBadgeUrgent: {
    backgroundColor: "#FFF0F5",
  },
  daysText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888",
  },
  daysTextUrgent: {
    color: "#D4588A",
    fontWeight: "700",
  },
  cardActions: {
    gap: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  sendGiftBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F9F9FB",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  emptyIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  emptySubtitle: {
    fontSize: 13.5,
    color: "#888",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
    marginBottom: 20,
  },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D4588A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F3F7",
    justifyContent: "center",
    alignItems: "center",
  },
  formGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: "#F9F9FB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1E1E2D",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  occasionPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  occChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F3F3F7",
  },
  occChipActive: {
    backgroundColor: "#D4588A",
  },
  occChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#666",
  },
  occChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  saveBtn: {
    backgroundColor: "#D4588A",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
