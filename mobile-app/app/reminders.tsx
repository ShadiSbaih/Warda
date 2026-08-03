import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../constants/Colors";
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
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.pureWhite} />

      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color={RainbowColors.inkBlack} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Occasion Reminders</Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="plus" size={20} color={RainbowColors.pureWhite} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Info Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Feather name="bell" size={18} color={RainbowColors.tangerine} />
            </View>
            <Text style={styles.bannerText}>
              Never miss a milestone! We'll notify you 24 hours before so your custom bouquet arrives on time 🌹
            </Text>
          </View>

          {/* Reminders List */}
          {reminders.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBox}>
                <Ionicons name="calendar-outline" size={48} color={RainbowColors.tangerine} />
              </View>
              <Text style={styles.emptyTitle}>No Occasions Saved</Text>
              <Text style={styles.emptySubtitle}>
                Add birthdays, anniversaries, and graduations of your loved ones to get timely delivery reminders.
              </Text>
              <TouchableOpacity
                style={styles.createBtn}
                onPress={() => setModalVisible(true)}
              >
                <Feather name="plus" size={16} color={RainbowColors.pureWhite} />
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
                        <Feather name="gift" size={16} color={RainbowColors.pureWhite} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => removeReminder(reminder.id)}
                        activeOpacity={0.8}
                      >
                        <Feather name="trash-2" size={15} color={RainbowColors.stone} />
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
                  <Feather name="x" size={18} color={RainbowColors.inkBlack} />
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
    backgroundColor: RainbowColors.pureWhite,
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
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
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
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: RainbowRadii.cards,
    padding: 14,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  bannerIcon: {
    width: 36,
    height: 36,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
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
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
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
    color: RainbowColors.inkBlack,
  },
  cardMeta: {
    fontSize: 12,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  daysBadge: {
    alignSelf: "flex-start",
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: RainbowRadii.pills,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  daysBadgeUrgent: {
    backgroundColor: RainbowColors.cloudSurface,
  },
  daysText: {
    fontSize: 11,
    fontWeight: "600",
    color: RainbowColors.stone,
  },
  daysTextUrgent: {
    color: RainbowColors.tangerine,
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
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
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
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  emptySubtitle: {
    fontSize: 13.5,
    color: RainbowColors.stone,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
    marginBottom: 20,
  },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.tangerine,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RainbowRadii.pills,
    gap: 8,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 14,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: RainbowColors.pureWhite,
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
    color: RainbowColors.inkBlack,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  formGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: RainbowColors.stone,
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: RainbowColors.inkBlack,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  occasionPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  occChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
  },
  occChipActive: {
    backgroundColor: RainbowColors.tangerine,
  },
  occChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: RainbowColors.stone,
  },
  occChipTextActive: {
    color: RainbowColors.pureWhite,
    fontWeight: "700",
  },
  saveBtn: {
    backgroundColor: RainbowColors.tangerine,
    height: 52,
    borderRadius: RainbowRadii.pills,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  saveBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});
