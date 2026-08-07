import { useTheme } from "@/context/ThemeContext";
import { WardaText } from "@/components/ui";
import React, { useState } from "react";

import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  onMessageChange?: (message: string) => void;
  onCardStyleChange?: (style: "formal" | "romantic" | "funny") => void;
}

const cardStyles = [
  { id: "formal",   label: "Formal",    icon: "briefcase" },
  { id: "romantic", label: "Romantic",   icon: "heart" },
  { id: "funny",    label: "Funny",     icon: "smile" },
] as const;

export default function GiftMessageInput({
  onMessageChange,
  onCardStyleChange,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [message, setMessage] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<"formal" | "romantic" | "funny">("romantic");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMessageChange = (text: string) => {
    setMessage(text);
    onMessageChange?.(text);
  };

  const handleStyleSelect = (style: "formal" | "romantic" | "funny") => {
    setSelectedStyle(style);
    onCardStyleChange?.(style);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <View style={styles.iconWrap}>
            <Feather name="edit-3" size={18} color={theme.colors.brand} />
          </View>
          <WardaText style={styles.headerTitle}>Gift Message</WardaText>
        </View>

        <Feather
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#999"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.body}>
          {/* Card Style */}
          <WardaText style={styles.label}>Card Type</WardaText>

          <View style={styles.styleRow}>
            {cardStyles.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[
                  styles.styleChip,
                  selectedStyle === s.id && styles.styleChipActive,
                ]}
                onPress={() => handleStyleSelect(s.id)}
                activeOpacity={0.8}
              >
                <Feather
                  name={s.icon as any}
                  size={14}
                  color={selectedStyle === s.id ? theme.colors.surface : theme.colors.textMuted}
                />
                <WardaText
                  style={[
                    styles.styleLabel,
                    selectedStyle === s.id && styles.styleLabelActive,
                  ]}
                >
                  {s.label}
                </WardaText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Message Input */}
          <WardaText style={styles.label}>Write your message</WardaText>

          <TextInput
            style={styles.input}
            placeholder="e.g. Happy birthday, love you so much 🌹"
            placeholderTextColor="#C5A8B8"
            value={message}
            onChangeText={handleMessageChange}
            multiline
            maxLength={200}
            textAlign="right"
          />

          <WardaText style={styles.charCount}>{message.length}/200</WardaText>
        </View>
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
    shadowColor: theme.colors.brand,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
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

  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#FDF0F5",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textMuted,
    marginTop: 14,
    marginBottom: 8,
    textAlign: "right",
  },

  styleRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
  },

  styleChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  styleChipActive: {
    backgroundColor: theme.colors.brand,
    borderColor: theme.colors.brand,
  },

  styleLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textMuted,
  },

  styleLabelActive: {
    color: theme.colors.textInverse,
  },

  input: {
    backgroundColor: theme.colors.background,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: theme.colors.borderSubtle,
    padding: 14,
    fontSize: 15,
    color: "#1A1A2E",
    minHeight: 100,
    textAlignVertical: "top",
  },

  charCount: {
    fontSize: 12,
    color: "#C5A8B8",
    textAlign: "left",
    marginTop: 6,
  },
});
