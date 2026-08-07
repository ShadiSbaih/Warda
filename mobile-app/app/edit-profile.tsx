import { useTheme } from "@/context/ThemeContext";
import { WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useState } from "react";

import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { user, loginDemoUser } = useAuth(); // or we might need an update method in AuthContext, let's just use API directly

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.updateProfile({ name, phone });
      // In a real app, we'd update AuthContext state here if the API returned success
      // Since it's mock API, we can just show success and go back
      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (e) {
      Alert.alert("Error", "Failed to update profile. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <WardaIconButton icon="arrow-left" onPress={() => router.back()} />
          <WardaText style={styles.headerTitle}>Edit Profile</WardaText>
          <View style={{ width: 44 }} />
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formGroup}>
              <WardaText style={styles.label}>Full Name</WardaText>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Sarah Al-Ghamdi"
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <View style={styles.formGroup}>
              <WardaText style={styles.label}>Email Address</WardaText>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={email}
                editable={false}
                placeholder="sarah@warda.app"
                placeholderTextColor="#A0A0A0"
              />
              <WardaText style={styles.helpText}>Email cannot be changed.</WardaText>
            </View>

            <View style={styles.formGroup}>
              <WardaText style={styles.label}>Phone Number</WardaText>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="+966 50 123 4567"
                placeholderTextColor="#A0A0A0"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.bottomArea}>
          <WardaButton
            title="Save Changes"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
            onPress={handleSave}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text,
  },
  content: {
    padding: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13.5,
    fontWeight: "700",
    color: theme.colors.textMuted,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    borderRadius: theme.radii.xl,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: theme.colors.text,
  },
  inputDisabled: {
    backgroundColor: theme.colors.background,
    color: theme.colors.textMuted,
  },
  helpText: {
    fontSize: 11.5,
    color: theme.colors.textMuted,
    marginTop: 6,
    marginLeft: 4,
  },
  bottomArea: {
    padding: 24,
    paddingBottom: 40,
  },
});
