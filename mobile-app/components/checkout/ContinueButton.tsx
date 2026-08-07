import { useTheme } from "@/context/ThemeContext";
import { WardaButton } from "@/components/ui";
import React from "react";

import { useRouter } from "expo-router";

export default function ContinueButton() {
  const router = useRouter();

  return (
    <WardaButton
      title="Continue"
      iconRight="arrow-right"
      size="lg"
      onPress={() => router.push("/payment")}
      style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 40 }}
    />
  );
}