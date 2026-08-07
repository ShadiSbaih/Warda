import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: keyof typeof Feather.glyphMap;
  rightIcon?: keyof typeof Feather.glyphMap;
  containerStyle?: ViewStyle;
}

export default function WardaInput({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...rest
}: Props) {
  const { theme } = useTheme();

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.textMuted }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputBox,
          {
            backgroundColor: theme.colors.background,
            borderColor: error ? theme.colors.error : theme.colors.borderSubtle,
            borderRadius: theme.radii.md,
          },
        ]}
      >
        {leftIcon && (
          <Feather
            name={leftIcon}
            size={18}
            color={error ? theme.colors.error : theme.colors.textMuted}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          placeholderTextColor={theme.colors.textPlaceholder}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              paddingLeft: leftIcon ? 4 : theme.spacing[3],
              paddingRight: rightIcon ? 4 : theme.spacing[3],
            },
            style,
          ]}
          {...rest}
        />
        {rightIcon && (
          <Feather
            name={rightIcon}
            size={18}
            color={error ? theme.colors.error : theme.colors.textMuted}
            style={styles.rightIcon}
          />
        )}
      </View>
      {error ? (
        <Text style={[styles.hint, { color: theme.colors.error }]}>{error}</Text>
      ) : helper ? (
        <Text style={[styles.hint, { color: theme.colors.textMuted }]}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    height: "100%",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  hint: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },
});
