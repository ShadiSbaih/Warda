import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React, { useState } from "react";

import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";

interface Props {
  onDateChange?: (date: Date | null) => void;
}

const quickOptions = [
  { id: "now", label: "Now", icon: "zap" },
  { id: "this-evening", label: "This Evening", icon: "sunset" },
  { id: "tomorrow-am", label: "Tomorrow Morning", icon: "sun" },
  { id: "custom", label: "Custom Date", icon: "calendar" },
] as const;

type OptionId = typeof quickOptions[number]["id"];

export default function DeliveryScheduler({ onDateChange }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedOption, setSelectedOption] = useState<OptionId>("now");
  const [showPicker, setShowPicker] = useState(false);
  const [customDate, setCustomDate] = useState(new Date());

  const openAndroidPicker = () => {
    try {
      if (DateTimePickerAndroid && typeof DateTimePickerAndroid.open === "function") {
        DateTimePickerAndroid.open({
          value: customDate,
          mode: "date",
          is24Hour: true,
          minimumDate: new Date(),
          onChange: (event: DateTimePickerEvent, date?: Date) => {
            if (event.type === "set" && date) {
              setCustomDate(date);
              onDateChange?.(date);
            }
          },
        });
      }
    } catch (err) {
      console.warn("DateTimePickerAndroid error:", err);
    }
  };

  const handleOptionPress = (id: OptionId) => {
    setSelectedOption(id);

    if (id === "now") {
      onDateChange?.(null);
    } else if (id === "this-evening") {
      const d = new Date();
      d.setHours(20, 0, 0, 0);
      onDateChange?.(d);
    } else if (id === "tomorrow-am") {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      d.setHours(9, 0, 0, 0);
      onDateChange?.(d);
    } else if (id === "custom") {
      if (Platform.OS === "android") {
        openAndroidPicker();
      } else {
        setShowPicker(true);
      }
    }
  };

  const handleDatePicked = (_: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setCustomDate(date);
      onDateChange?.(date);
    }
  };

  const formattedDate = customDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Feather name="clock" size={18} color={theme.colors.brand} />
        </View>
        <WardaText style={styles.headerTitle}>Delivery Schedule</WardaText>
      </View>

      {/* Options */}
      <View style={styles.optionsGrid}>
        {quickOptions.map((opt) => (
          <TouchableOpacity
            key={opt.id}
            style={[
              styles.optionBtn,
              selectedOption === opt.id && styles.optionBtnActive,
            ]}
            onPress={() => handleOptionPress(opt.id)}
            activeOpacity={0.8}
          >
            <Feather
              name={opt.icon as any}
              size={16}
              color={selectedOption === opt.id ? theme.colors.surface : theme.colors.textMuted}
            />
            <WardaText
              style={[
                styles.optionLabel,
                selectedOption === opt.id && styles.optionLabelActive,
              ]}
            >
              {opt.label}
            </WardaText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom date preview */}
      {selectedOption === "custom" && (
        <TouchableOpacity
          style={styles.datePreview}
          onPress={() => {
            if (Platform.OS === "android") {
              openAndroidPicker();
            } else {
              setShowPicker(true);
            }
          }}
          activeOpacity={0.8}
        >
          <Feather name="calendar" size={15} color={theme.colors.brand} />
          <WardaText style={styles.dateText}>{formattedDate}</WardaText>
          <Feather name="edit-2" size={13} color="#C5A8B8" />
        </TouchableOpacity>
      )}

      {Platform.OS === "ios" && showPicker && (
        <DateTimePicker
          value={customDate}
          mode="date"
          display="spinner"
          onChange={handleDatePicked}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 18,
    padding: 16,
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FCE4EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A2E",
  },

  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  optionBtnActive: {
    backgroundColor: theme.colors.brand,
    borderColor: theme.colors.brand,
  },

  optionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },

  optionLabelActive: {
    color: theme.colors.textInverse,
  },

  datePreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },

  dateText: {
    flex: 1,
    fontSize: 14,
    color: "#1A1A2E",
    fontWeight: "500",
    textAlign: "right",
  },
});
