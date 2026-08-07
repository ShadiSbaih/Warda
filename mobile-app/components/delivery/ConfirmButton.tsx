import { useTheme } from "@/context/ThemeContext";
import { WardaButton } from "@/components/ui";
import React from "react";

import { useRouter } from "expo-router";

interface Props {
  onPress?: () => void;
}

export default function ConfirmButton({ onPress }: Props) {
  const router = useRouter();

  return (
    <WardaButton
      title="Confirm Pin Location"
      onPress={onPress || (() => router.back())}
      size="lg"
      style={{ marginHorizontal: 20, marginBottom: 24 }}
    />
  );
}