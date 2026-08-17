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

export default function RegisterScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name.trim()) {
      setErrorMsg("Please enter your full name");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Please enter your email address");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const result = await register({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      password,
    });
    setLoading(false);
    if (result.success) {
      router.replace("/(tabs)/home");
    } else {
      setErrorMsg(result.error || "Registration failed. Please try again.");
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
            <BlurView intensity={75} tint="light" style={styles.glassCard}>
              <WardaText variant="h1" align="center" style={styles.title}>
                Create Account
              </WardaText>
              <WardaText variant="body" align="center" color={theme.colors.text} style={{ opacity: 0.8, marginBottom: 28 }}>
                Create your account to send gifts to those you love.
              </WardaText>

              {errorMsg && (
                <View style={[styles.errorBox, { backgroundColor: theme.colors.errorSurface, borderColor: "#FFCDD2" }]}>
                  <WardaText variant="caption" align="center" color={theme.colors.error}>
                    {errorMsg}
                  </WardaText>
                </View>
              )}

              <WardaInput
                label="Full Name"
                placeholder="e.g. Sarah Connor"
                leftIcon="user"
                value={name}
                onChangeText={(t) => {
                  setName(t);
                  if (errorMsg) setErrorMsg(null);
                }}
                containerStyle={styles.inputGroup}
                style={styles.input}
              />

              <WardaInput
                label="Email Address"
                placeholder="example@warda.app"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="mail"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (errorMsg) setErrorMsg(null);
                }}
                containerStyle={styles.inputGroup}
                style={styles.input}
              />

              <WardaInput
                label="Phone Number"
                placeholder="+966 50 123 4567"
                keyboardType="phone-pad"
                leftIcon="phone"
                value={phone}
                onChangeText={(t) => {
                  setPhone(t);
                  if (errorMsg) setErrorMsg(null);
                }}
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
                    onChangeText={(t) => {
                      setPassword(t);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    style={[styles.passwordInput, { color: theme.colors.text }]}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>

              <WardaButton
                title="Create Account"
                size="lg"
                loading={loading}
                disabled={loading}
                onPress={handleRegister}
              />

              <View style={styles.bottom}>
                <WardaText variant="body" color={theme.colors.text} style={{ opacity: 0.8 }}>
                  Already have an account?
                </WardaText>
                <TouchableOpacity onPress={() => router.back()}>
                  <WardaText variant="body" weight="bold" color={theme.colors.brand}>
                    Sign In
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
  scroll: {
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
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
});
