import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaButton, WardaIconButton, WardaInput, WardaText } from "../../components/ui";
import { authAPI } from "../../services/api";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { theme } = useTheme();

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

  const inputBase = {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 20,
    color: theme.colors.text,
  };

  return (
    <ImageBackground
      source={require("../../assets/images/auth-bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <WardaIconButton
              icon="arrow-left"
              onPress={() => router.back()}
              style={styles.backBtn}
            />

            <BlurView intensity={75} tint="light" style={styles.glassCard}>
              <View style={styles.header}>
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.brandLight }]}>
                  <Feather name="lock" size={28} color={theme.colors.brand} />
                </View>
                <WardaText variant="h1" align="center" style={styles.title}>
                  Reset Password
                </WardaText>
                <WardaText variant="body" align="center" color={theme.colors.text} style={{ opacity: 0.8 }}>
                  Enter the email associated with your account and we'll send you instructions to reset your password.
                </WardaText>
              </View>

              {sent ? (
                <View style={[styles.successBox, { backgroundColor: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.5)" }]}>
                  <Feather name="check-circle" size={28} color={theme.colors.success} />
                  <WardaText variant="h3" align="center" color={theme.colors.success}>
                    Check Your Inbox
                  </WardaText>
                  <WardaText variant="body" align="center" color={theme.colors.text} style={{ opacity: 0.8 }}>
                    We've sent a password reset link to{" "}
                    <WardaText variant="body" weight="bold" color={theme.colors.text}>
                      {email}
                    </WardaText>
                    .
                  </WardaText>
                  <WardaButton title="Back to Sign In" onPress={() => router.replace("/(auth)/login")} />
                </View>
              ) : (
                <View style={{ marginTop: 8 }}>
                  {errorMsg && (
                    <View style={[styles.errorBox, { backgroundColor: theme.colors.errorSurface, borderColor: "#FFCDD2" }]}>
                      <WardaText variant="caption" align="center" color={theme.colors.error}>
                        {errorMsg}
                      </WardaText>
                    </View>
                  )}

                  <WardaInput
                    label="Email Address"
                    placeholder="example@warda.app"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    leftIcon="mail"
                    value={email}
                    onChangeText={(t) => {
                      setEmail(t);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    containerStyle={styles.inputGroup}
                    style={[styles.input, inputBase]}
                  />

                  <WardaButton
                    title="Send Reset Link"
                    size="lg"
                    loading={loading}
                    disabled={loading}
                    onPress={handleReset}
                  />
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
    backgroundColor: "#FFFFFF",
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
    marginBottom: 20,
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    marginBottom: 10,
  },
  errorBox: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 56,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  successBox: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
  },
});
