import { WardaInput } from "@/components/ui";
import React from "react";

import { KeyboardTypeOptions } from "react-native";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export default function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: Props) {
  return (
    <WardaInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      containerStyle={{ marginBottom: 18 }}
    />
  );
}
