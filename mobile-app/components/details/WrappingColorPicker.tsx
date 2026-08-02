import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const COLORS = [
  { id: "red",    hex: "#E53935", label: "Red" },
  { id: "pink",   hex: "#F48FB1", label: "Pink" },
  { id: "white",  hex: "#F5F5F5", label: "White" },
  { id: "gold",   hex: "#FFD700", label: "Gold" },
  { id: "purple", hex: "#9C27B0", label: "Purple" },
  { id: "blue",   hex: "#1565C0", label: "Blue" },
  { id: "green",  hex: "#2E7D32", label: "Green" },
  { id: "black",  hex: "#1A1A2E", label: "Black" },
];

interface Props {
  availableColors?: string[]; // hex values from product
  onColorSelect?: (hex: string) => void;
}

export default function WrappingColorPicker({
  availableColors,
  onColorSelect,
}: Props) {
  const colors = availableColors
    ? COLORS.filter((c) => availableColors.includes(c.hex))
    : COLORS;

  const [selected, setSelected] = useState(colors[0]?.hex ?? "");

  const handleSelect = (hex: string) => {
    setSelected(hex);
    onColorSelect?.(hex);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Feather name="gift" size={18} color="#D4588A" />
        </View>
        <Text style={styles.headerTitle}>Wrapping Color</Text>

        {selected !== "" && (
          <View style={[styles.selectedDot, { backgroundColor: selected }]} />
        )}
      </View>

      {/* Color Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.colorRow}
      >
        {colors.map((color) => (
          <TouchableOpacity
            key={color.id}
            onPress={() => handleSelect(color.hex)}
            activeOpacity={0.8}
            style={styles.colorItem}
          >
            <View
              style={[
                styles.colorCircle,
                { backgroundColor: color.hex },
                selected === color.hex && styles.colorCircleActive,
                color.hex === "#F5F5F5" && styles.colorCircleBorder,
              ]}
            >
              {selected === color.hex && (
                <Feather
                  name="check"
                  size={14}
                  color={
                    color.hex === "#F5F5F5" || color.hex === "#FFD700"
                      ? "#333"
                      : "#FFF"
                  }
                />
              )}
            </View>
            <Text style={styles.colorLabel}>{color.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
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
    flex: 1,
  },

  selectedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#D4588A",
  },

  colorRow: {
    gap: 14,
    paddingHorizontal: 4,
  },

  colorItem: {
    alignItems: "center",
    gap: 6,
  },

  colorCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  colorCircleBorder: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },

  colorCircleActive: {
    borderWidth: 2.5,
    borderColor: "#D4588A",
    transform: [{ scale: 1.1 }],
  },

  colorLabel: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
  },
});
