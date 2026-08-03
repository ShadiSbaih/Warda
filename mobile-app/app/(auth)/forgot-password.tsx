import { useRouter } from "expo-router";
import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import { authAPI } from "../../services/api";
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
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

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

    try {
      const res = await authAPI.forgotPassword({ email });
      if (res.success) {
        setSent(true);
      } else {
        setErrorMsg(res.message || "Failed to send reset link.");
      }
    } catch (e) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/auth-bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
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
              <Feather name="arrow-left" size={22} color={RainbowColors.inkBlack} />
            </TouchableOpacity>

            <BlurView intensity={75} tint="light" style={styles.glassCard}>
              <View style={styles.header}>
                <View style={styles.iconCircle}>
                  <Feather name="lock" size={28} color={RainbowColors.tangerine} />
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
                      placeholderTextColor="rgba(0,0,0,0.4)"
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
                      <ActivityIndicator color={RainbowColors.pureWhite} />
                    ) : (
                      <Text style={styles.buttonText}>Send Reset Link</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  glassCard: {
    borderRadius: 24,
    padding: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: RainbowColors.inkBlack,
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 22,
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
    color: RainbowColors.inkBlack,
    marginBottom: 6,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    paddingHorizontal: 18,
    fontSize: 15.5,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    color: RainbowColors.inkBlack,
  },
  button: {
    height: 56,
    backgroundColor: RainbowColors.tangerine,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: RainbowColors.pureWhite,
    fontWeight: "700",
    fontSize: 17,
  },
  errorBox: {
    backgroundColor: "rgba(255, 235, 238, 0.9)",
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    gap: 12,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E7D32",
  },
  successText: {
    fontSize: 14.5,
    color: RainbowColors.inkBlack,
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
});
