import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import PrimaryButton from "../../components/auth/PrimaryButton";

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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
          <AuthHeader
            title="Create Account"
            subtitle="Create your account to send gifts to those you love."
          />

          <View style={styles.form}>
            {errorMsg && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            )}

            <AuthInput
              label="Full Name"
              placeholder="e.g. Sarah Connor"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errorMsg) setErrorMsg(null);
              }}
            />

            <AuthInput
              label="Email Address"
              placeholder="example@warda.app"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errorMsg) setErrorMsg(null);
              }}
            />

            <AuthInput
              label="Phone Number"
              placeholder="+966 50 123 4567"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errorMsg) setErrorMsg(null);
              }}
            />

            <PasswordInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errorMsg) setErrorMsg(null);
              }}
            />

            <PrimaryButton
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
            />

            <View style={styles.bottom}>
              <Text style={styles.text}>Already have an account?</Text>

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.login}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scroll: {
    paddingBottom: 40,
  },

  form: {
    paddingHorizontal: 24,
    marginTop: 20,
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

  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },

  text: {
    fontSize: 15,
    color: "#777",
  },

  login: {
    marginLeft: 6,
    color: "#D4588A",
    fontWeight: "700",
    fontSize: 15,
  },
});