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
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login, loginDemoUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim()) {
      setErrorMsg("Please enter your email address");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your password");
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    const result = await login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      router.replace("/(tabs)/home");
    } else {
      setErrorMsg(result.error || "Invalid email or password");
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    await loginDemoUser();
    setLoading(false);
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to send gifts to your loved ones.
          </Text>

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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#AAA"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errorMsg) setErrorMsg(null);
              }}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotBtn}
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoBtn}
            onPress={handleDemoSignIn}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.demoBtnText}>Quick Sign In as Guest</Text>
          </TouchableOpacity>

          <View style={styles.bottom}>
            <Text style={styles.bottomPrompt}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.signup}>Create Account</Text>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E1E2D",
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#7E7E8F",
    marginBottom: 28,
    lineHeight: 22,
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
  inputGroup: {
    marginBottom: 16,
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
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: 2,
  },
  forgot: {
    color: "#D4588A",
    fontSize: 14,
    fontWeight: "600",
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
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.3,
  },
  demoBtn: {
    height: 50,
    backgroundColor: "#FFF0F5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#F8D7E8",
  },
  demoBtnText: {
    color: "#D4588A",
    fontWeight: "600",
    fontSize: 15,
  },
  bottom: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomPrompt: {
    fontSize: 15,
    color: "#666",
  },
  signup: {
    marginLeft: 6,
    color: "#D4588A",
    fontWeight: "700",
    fontSize: 15,
  },
});