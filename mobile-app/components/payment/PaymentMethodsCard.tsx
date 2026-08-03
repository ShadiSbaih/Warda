import React, { useRef, useState } from "react";
import { RainbowColors, RainbowRadii } from "../../constants/Colors";
import {
  Alert,
  Animated,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

import CardInputForm from "./CardInputForm";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PaymentResult {
  method: "apple" | "card_saved" | "card_new";
  transactionId?: string;
  last4?: string;
  brand?: string;
  paymentIntentId?: string;
}

interface Props {
  amount: number;
  onPaymentComplete?: (result: PaymentResult) => void;
}

// ── Radio Button ──────────────────────────────────────────────────────────────

const RadioButton = ({ active }: { active: boolean }) => (
  <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
    {active && <View style={styles.radioInner} />}
  </View>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function PaymentMethodsCard({
  amount,
  onPaymentComplete,
}: Props) {
  const [selected, setSelected] = useState<"apple" | "card_saved" | "card_new">("apple");
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(400)).current;

  const openCardModal = () => {
    setCardModalVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  const closeCardModal = () => {
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 260,
      useNativeDriver: true,
    }).start(() => setCardModalVisible(false));
  };

  const handleCardSuccess = (result: {
    transactionId: string;
    last4: string;
    brand: string;
    paymentIntentId: string;
  }) => {
    closeCardModal();
    setSelected("card_new");
    onPaymentComplete?.({
      method: "card_new",
      ...result,
    });
  };

  const handleCardError = (message: string) => {
    Alert.alert("Payment Failed", message, [{ text: "Try Again" }]);
  };

  return (
    <>
      <View style={styles.container}>
      {/* 3D inset gloss — top-edge white shimmer, inflated-card effect */}
      <LinearGradient
        colors={["rgba(255,255,255,0.55)", "rgba(255,255,255,0.0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.55 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
        <Text style={styles.sectionTitle}>Payment Method</Text>

        {/* Apple Pay */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setSelected("apple")}
          activeOpacity={0.7}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <FontAwesome5 name="apple-pay" size={26} color="#111" />
            </View>
            <Text style={styles.title}>Apple Pay</Text>
          </View>
          <RadioButton active={selected === "apple"} />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Saved card */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setSelected("card_saved")}
          activeOpacity={0.7}
        >
          <View style={styles.left}>
            <Image
              source={require("../../assets/images/payment/mastercard.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>Mastercard</Text>
              <Text style={styles.subtitle}>•••• •••• •••• 9010</Text>
            </View>
          </View>
          <RadioButton active={selected === "card_saved"} />
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Add new card */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            setSelected("card_new");
            openCardModal();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.left}>
            <View style={[styles.iconBox, styles.addIconBox]}>
              <Feather name="credit-card" size={20} color={RainbowColors.tangerine} />
            </View>
            <View>
              <Text style={styles.title}>New Credit / Debit Card</Text>
              <Text style={styles.subtitle}>Enter card details securely</Text>
            </View>
          </View>
          <RadioButton active={selected === "card_new"} />
        </TouchableOpacity>
      </View>

      {/* ── Card Entry Modal ────────────────────────────────────────────────── */}
      <Modal
        visible={cardModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeCardModal}
        statusBarTranslucent
      >
        <View style={modal.overlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={closeCardModal}
            activeOpacity={1}
          />

          <Animated.View
            style={[modal.sheet, { transform: [{ translateY: slideAnim }] }]}
          >
            {/* Handle */}
            <View style={modal.handle} />

            {/* Header */}
            <View style={modal.header}>
              <Text style={modal.title}>Pay with Card</Text>
              <TouchableOpacity onPress={closeCardModal} style={modal.closeBtn}>
                <Ionicons name="close" size={22} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Amount badge */}
            <View style={modal.amountBadge}>
              <Text style={modal.amountLabel}>Amount due</Text>
              <Text style={modal.amountValue}>${amount.toFixed(2)}</Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <CardInputForm
                amount={amount}
                onSuccess={handleCardSuccess}
                onError={handleCardError}
              />
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 4,
  },

  row: {
    height: 76,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  addIconBox: {
    backgroundColor: "#FFF0F6",
  },

  cardImage: {
    width: 38,
    height: 38,
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  subtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 18,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterActive: { borderColor: RainbowColors.tangerine },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: RainbowColors.tangerine,
  },
});

const modal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: RainbowColors.pureWhite,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingBottom: 40,
    maxHeight: "90%",
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
  },

  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  amountBadge: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF5F9",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FFD6E9",
  },

  amountLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },

  amountValue: {
    fontSize: 22,
    fontWeight: "800",
    color: RainbowColors.tangerine,
  },
});