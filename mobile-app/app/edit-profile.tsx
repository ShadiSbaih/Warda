import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../constants/Colors";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

export default function EditProfileScreen() {
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
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.pureWhite} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color={RainbowColors.inkBlack} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
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
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Sarah Al-Ghamdi"
                placeholderTextColor="#A0A0A0"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={email}
                editable={false}
                placeholder="sarah@warda.app"
                placeholderTextColor="#A0A0A0"
              />
              <Text style={styles.helpText}>Email cannot be changed.</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
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
          <TouchableOpacity
            style={[styles.saveBtn, isLoading && { opacity: 0.7 }]}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.saveBtnText}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
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
    color: RainbowColors.stone,
    marginBottom: 8,
  },
  input: {
    backgroundColor: RainbowColors.pureWhite,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
    borderRadius: RainbowRadii.cards,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: RainbowColors.inkBlack,
  },
  inputDisabled: {
    backgroundColor: RainbowColors.cloudSurface,
    color: RainbowColors.stone,
  },
  helpText: {
    fontSize: 11.5,
    color: RainbowColors.stone,
    marginTop: 6,
    marginLeft: 4,
  },
  bottomArea: {
    padding: 24,
    paddingBottom: 40,
  },
  saveBtn: {
    backgroundColor: RainbowColors.tangerine,
    height: 56,
    borderRadius: RainbowRadii.pills,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  saveBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});
