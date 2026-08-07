import { useTheme } from "@/context/ThemeContext";
import { WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useState } from "react";

import { Alert, Modal, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
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
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />

      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <WardaIconButton icon="arrow-left" onPress={() => router.back()} />

          <WardaText style={styles.headerTitle}>Occasion Reminders</WardaText>

          <WardaIconButton icon="plus" variant="primary" onPress={() => setModalVisible(true)} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Info Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Feather name="bell" size={18} color={theme.colors.brand} />
            </View>
            <WardaText style={styles.bannerText}>
              Never miss a milestone! We'll notify you 24 hours before so your custom bouquet arrives on time 🌹
            </WardaText>
          </View>

          {/* Reminders List */}
          {reminders.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBox}>
                <Ionicons name="calendar-outline" size={48} color={theme.colors.brand} />
              </View>
              <WardaText style={styles.emptyTitle}>No Occasions Saved</WardaText>
              <WardaText style={styles.emptySubtitle}>
                Add birthdays, anniversaries, and graduations of your loved ones to get timely delivery reminders.
              </WardaText>
              <WardaButton
                title="Add First Reminder"
                icon="plus"
                size="md"
                onPress={() => setModalVisible(true)}
              />
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
                      <WardaText style={styles.cardTitle}>{reminder.title}</WardaText>
                      <WardaText style={styles.cardMeta}>
                        For {reminder.person} · {config.label} · {reminder.date}
                      </WardaText>

                      {/* Days left badge */}
                      <View
                        style={[
                          styles.daysBadge,
                          reminder.daysLeft <= 7 && styles.daysBadgeUrgent,
                        ]}
                      >
                        <WardaText
                          style={[
                            styles.daysText,
                            reminder.daysLeft <= 7 && styles.daysTextUrgent,
                          ]}
                        >
                          {reminder.daysLeft <= 0
                            ? "Today! 🎉"
                            : `${reminder.daysLeft} days left`}
                        </WardaText>
                      </View>
                    </View>

                    {/* Actions */}
                    <View style={styles.cardActions}>
                      <TouchableOpacity
                        style={styles.sendGiftBtn}
                        activeOpacity={0.85}
                        onPress={() => router.push("/(tabs)/menu")}
                      >
                        <Feather name="gift" size={16} color={theme.colors.surface} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => removeReminder(reminder.id)}
                        activeOpacity={0.8}
                      >
                        <Feather name="trash-2" size={15} color={theme.colors.textMuted} />
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
                <WardaText style={styles.modalTitle}>Add Occasion Reminder</WardaText>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Feather name="x" size={18} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.formGroup}>
                  <WardaText style={styles.inputLabel}>Occasion Title</WardaText>
                  <TextInput
                    placeholder="e.g. Mom's Birthday / Wedding Anniversary"
                    placeholderTextColor="#A0A0A0"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.modalInput}
                  />
                </View>

                <View style={styles.formGroup}>
                  <WardaText style={styles.inputLabel}>Person / Loved One</WardaText>
                  <TextInput
                    placeholder="e.g. Sarah / Mom / Dearest"
                    placeholderTextColor="#A0A0A0"
                    value={person}
                    onChangeText={setPerson}
                    style={styles.modalInput}
                  />
                </View>

                <View style={styles.formGroup}>
                  <WardaText style={styles.inputLabel}>Date (e.g. August 24 or Sep 15)</WardaText>
                  <TextInput
                    placeholder="e.g. August 24"
                    placeholderTextColor="#A0A0A0"
                    value={date}
                    onChangeText={setDate}
                    style={styles.modalInput}
                  />
                </View>

                <View style={styles.formGroup}>
                  <WardaText style={styles.inputLabel}>Occasion Category</WardaText>
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
                        <WardaText
                          style={[
                            styles.occChipText,
                            occasion === occ && styles.occChipTextActive,
                          ]}
                        >
                          {OCCASION_CONFIG[occ].label}
                        </WardaText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <WardaButton
                  title="Save Reminder"
                  size="lg"
                  onPress={handleSaveReminder}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.text,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 8,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  bannerIcon: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.surface,
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
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
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
    color: theme.colors.text,
  },
  cardMeta: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  daysBadge: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  daysBadgeUrgent: {
    backgroundColor: theme.colors.background,
  },
  daysText: {
    fontSize: 11,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  daysTextUrgent: {
    color: theme.colors.brand,
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
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.brand,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.background,
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
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.text,
  },
  emptySubtitle: {
    fontSize: 13.5,
    color: theme.colors.textMuted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: theme.colors.surface,
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
    color: theme.colors.text,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  formGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textMuted,
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
  occasionPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  occChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.background,
  },
  occChipActive: {
    backgroundColor: theme.colors.brand,
  },
  occChipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },
  occChipTextActive: {
    color: theme.colors.textInverse,
    fontWeight: "700",
  },
});
