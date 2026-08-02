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

import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import PrimaryButton from "../../components/auth/PrimaryButton";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // TODO: Register API

    router.replace("/(tabs)/home");
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
        >
          <AuthHeader
            title="Create Account"
            subtitle="Create your account to send gifts to those you love."
          />

          <View style={styles.form}>
            <AuthInput
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />

            <AuthInput
              label="Email Address"
              placeholder="ahmed@gmail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <AuthInput
              label="Phone Number"
              placeholder="050 123 4567"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <PasswordInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
            />

            <PrimaryButton
              title="Create Account"
              onPress={handleRegister}
            />

            <View style={styles.bottom}>
              <Text style={styles.text}>
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={() => router.back()}
              >
                <Text style={styles.login}>
                  Sign In
                </Text>
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
    marginTop: 35,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
  },

  text: {
    fontSize: 16,
    color: "#777",
  },

  login: {
    marginLeft: 5,
    color: "#D4588A",
    fontWeight: "700",
    fontSize: 16,
  },
});