import { useRouter } from "expo-router";
import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
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
            <BlurView intensity={75} tint="light" style={styles.glassCard}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Create your account to send gifts to those you love.
              </Text>

              {errorMsg && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  placeholder="e.g. Sarah Connor"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  placeholder="example@warda.app"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  placeholder="+966 50 123 4567"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    style={styles.passwordInput}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={20}
                      color="rgba(0,0,0,0.6)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color={RainbowColors.pureWhite} />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <View style={styles.bottom}>
                <Text style={styles.text}>Already have an account?</Text>

                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.login}>Sign In</Text>
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
    backgroundColor: RainbowColors.pureWhite,
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
    fontSize: 32,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: RainbowColors.inkBlack,
    opacity: 0.7,
    marginBottom: 28,
    lineHeight: 22,
    textAlign: "center",
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
  inputGroup: {
    marginBottom: 16,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    paddingRight: 16,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 18,
    fontSize: 15.5,
    color: RainbowColors.inkBlack,
  },
  eyeIcon: {
    padding: 4,
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
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: RainbowColors.pureWhite,
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  text: {
    fontSize: 15,
    color: RainbowColors.inkBlack,
    opacity: 0.8,
  },
  login: {
    marginLeft: 6,
    color: RainbowColors.tangerine,
    fontWeight: "800",
    fontSize: 15,
  },
});