import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { WardaButton, WardaInput, WardaText } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (emailValue = email, passwordValue = password) => {
    if (!emailValue.trim()) {
      setErrorMsg("Please enter your email address");
      return;
    }
    if (!passwordValue) {
      setErrorMsg("Please enter your password");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const result = await login(emailValue.trim(), passwordValue);
    setLoading(false);
    if (result.success) {
      router.replace("/(tabs)/home");
    } else {
      setErrorMsg(result.error || "Invalid email or password");
    }
  };

  const handleDemoSignIn = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrorMsg(null);
    handleLogin(demoEmail, demoPassword);
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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <BlurView intensity={75} tint="light" style={styles.glassCard}>
              <WardaText variant="h1" align="center" style={styles.title}>
                Welcome Back
              </WardaText>
              <WardaText variant="body" align="center" color={theme.colors.text} style={{ opacity: 0.8, marginBottom: 28 }}>
                Sign in to send gifts to your loved ones.
              </WardaText>

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
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errorMsg) setErrorMsg(null);
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                leftIcon="mail"
                containerStyle={styles.inputGroup}
                style={styles.input}
              />

              <View style={styles.inputGroup}>
                <WardaText variant="label" color={theme.colors.text}>Password</WardaText>
                <View style={[styles.passwordContainer, inputBase]}>
                  <Feather name="lock" size={18} color={theme.colors.textMuted} style={{ marginLeft: 16 }} />
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor={theme.colors.textPlaceholder}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    style={[styles.passwordInput, { color: theme.colors.text }]}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.forgotBtn}
                onPress={() => router.push("/(auth)/forgot-password")}
              >
                <WardaText variant="caption" weight="bold" color={theme.colors.brand}>
                  Forgot Password?
                </WardaText>
              </TouchableOpacity>

              <WardaButton
                title="Sign In"
                size="lg"
                loading={loading}
                disabled={loading}
                onPress={handleLogin}
              />

              <View style={styles.demoSection}>
                <WardaText variant="caption" weight="bold" color={theme.colors.textMuted} style={styles.demoLabel}>
                  TRY A DEMO ROLE
                </WardaText>

                <View style={styles.demoButtons}>
                  <TouchableOpacity
                    style={styles.demoButton}
                    disabled={loading}
                    onPress={() => handleDemoSignIn("user@warda.app", "password123")}
                  >
                    <Feather name="user" size={17} color={theme.colors.brand} />
                    <WardaText variant="body" weight="semibold">Customer</WardaText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.demoButton}
                    disabled={loading}
                    onPress={() => handleDemoSignIn("admin@warda.app", "password123")}
                  >
                    <Feather name="shield" size={17} color={theme.colors.brand} />
                    <WardaText variant="body" weight="semibold">Admin</WardaText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.demoButton}
                    disabled={loading}
                    onPress={() => handleDemoSignIn("delivery@warda.app", "password123")}
                  >
                    <Feather name="truck" size={17} color={theme.colors.brand} />
                    <WardaText variant="body" weight="semibold">Delivery</WardaText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottom}>
                <WardaText variant="body" color={theme.colors.text} style={{ opacity: 0.8 }}>
                  Don&apos;t have an account?
                </WardaText>
                <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                  <WardaText variant="body" weight="bold" color={theme.colors.brand}>
                    Create Account
                  </WardaText>
                </TouchableOpacity>
              </View>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  glassCard: {
    borderRadius: 24,
    padding: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  title: {
    marginBottom: 8,
  },
  errorBox: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    height: "100%",
    paddingHorizontal: 0,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderWidth: 1,
    paddingRight: 16,
    marginTop: 6,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontSize: 15,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 22,
    marginTop: 2,
  },
  demoSection: {
    marginTop: 22,
  },
  demoLabel: {
    letterSpacing: 0.7,
    marginBottom: 10,
  },
  demoButtons: {
    flexDirection: "row",
    gap: 8,
  },
  demoButton: {
    flex: 1,
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#F1D9D9",
    borderRadius: 14,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  bottom: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
