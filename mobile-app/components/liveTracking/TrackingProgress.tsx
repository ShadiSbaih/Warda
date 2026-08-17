import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "../../context/ThemeContext";
import { WardaText } from "../ui";

const STATUS_STEPS: Record<string, number> = {
  confirmed: 1,
  preparing: 2,
  on_the_way: 3,
  delivered: 4,
};

interface Props {
  status?: string;
  driverLocation?: { latitude: number; longitude: number };
  destination?: { latitude: number; longitude: number };
}

export default function TrackingProgress({ status = "confirmed" }: Props) {
  const { theme } = useTheme();
  const currentStep = STATUS_STEPS[status] || 1;
  const heading =
    status === "delivered"
      ? "Delivered with love"
      : status === "on_the_way"
      ? "Heading your way"
      : status === "preparing"
      ? "Preparing your gift"
      : "Order confirmed";

  const captions: Record<string, string> = {
    delivered: "Your gift has been delivered. Enjoy the moment!",
    on_the_way: "Your courier has collected the bouquet and is heading to the destination.",
    preparing: "Our florists are hand-arranging your gift with care.",
    confirmed: "We received your order and will begin preparing it shortly.",
  };

  return (
    <>
      <View style={styles.headerRow}>
        <WardaText variant="h2" color={theme.colors.text}>
          {heading}
        </WardaText>
        <View style={styles.etaBadge}>
          <View style={[styles.etaDot, { backgroundColor: theme.colors.success }]} />
          <WardaText variant="caption" weight="bold" color={theme.colors.success}>
            {status === "delivered" ? "Completed" : status === "on_the_way" ? "Live tracking active" : "In progress"}
          </WardaText>
        </View>
      </View>

      <View style={styles.progress}>
        <Step icon="check" active={currentStep >= 1} theme={theme} />
        <Line active={currentStep >= 2} theme={theme} />
        <Step icon="package" active={currentStep >= 2} theme={theme} />
        <Line active={currentStep >= 3} theme={theme} />
        <Step icon="moped" material active={currentStep >= 3} pulse={status === "on_the_way"} theme={theme} />
        <Line active={currentStep >= 4} theme={theme} />
        <Step icon="home" active={currentStep >= 4} theme={theme} />
      </View>

      <WardaText variant="caption" color={theme.colors.textMuted} style={styles.caption}>
        {captions[status] || captions.confirmed}
      </WardaText>
    </>
  );
}

function Step({
  icon,
  active,
  ion,
  material,
  pulse,
  theme,
}: {
  icon: string;
  active: boolean;
  ion?: boolean;
  material?: boolean;
  pulse?: boolean;
  theme: any;
}) {
  return (
    <View
      style={[
        styles.circle,
        {
          backgroundColor: active ? theme.colors.brand : theme.colors.background,
          borderColor: pulse ? theme.colors.brand : "transparent",
        },
        pulse && styles.pulseCircle,
      ]}
    >
      {material ? (
        <MaterialCommunityIcons name={icon as any} size={16} color={active ? theme.colors.textInverse : theme.colors.textMuted} />
      ) : ion ? (
        <Ionicons name={icon as any} size={14} color={active ? theme.colors.textInverse : theme.colors.textMuted} />
      ) : (
        <Feather name={icon as any} size={14} color={active ? theme.colors.textInverse : theme.colors.textMuted} />
      )}
    </View>
  );
}

function Line({ active, theme }: { active: boolean; theme: any }) {
  return <View style={[styles.line, { backgroundColor: active ? theme.colors.brand : theme.colors.borderSubtle }]} />;
}

const styles = StyleSheet.create({
  headerRow: {
    marginBottom: 4,
  },
  etaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  etaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  pulseCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2.5,
  },
  line: {
    flex: 1,
    height: 3,
    borderRadius: 999,
  },
  caption: {
    marginTop: 14,
    lineHeight: 20,
  },
});
