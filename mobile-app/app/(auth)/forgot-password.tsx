import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleReset = async () => {
    if (!email.trim()) {
      setErrorMsg("Please enter your email address");
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    // Simulate password reset email send
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Feather name="arrow-left" size={22} color="#1E1E2D" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Feather name="lock" size={30} color="#D4588A" />
            </View>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter the email associated with your account and we'll send you
              instructions to reset your password.
            </Text>
          </View>

          {sent ? (
            <View style={styles.successBox}>
              <Feather name="check-circle" size={28} color="#2E7D32" />
              <Text style={styles.successTitle}>Check Your Inbox</Text>
              <Text style={styles.successText}>
                We've sent a password reset link to{" "}
                <Text style={{ fontWeight: "700" }}>{email}</Text>.
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/(auth)/login")}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>Back to Sign In</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              {errorMsg && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  placeholder="example@warda.app"
                  placeholderTextColor="#AAA"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleReset}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Send Reset Link</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1E2D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#7E7E8F",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  form: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderColor: "#ECECEC",
    borderRadius: 16,
    paddingHorizontal: 18,
    fontSize: 15.5,
    backgroundColor: "#FAFAFA",
    color: "#1E1E2D",
  },
  button: {
    height: 56,
    backgroundColor: "#D4588A",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
  },
  errorBox: {
    backgroundColor: "#FFEBEE",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  successBox: {
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C8E6C9",
    gap: 12,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
  },
  successText: {
    fontSize: 14.5,
    color: "#4CAF50",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
});
