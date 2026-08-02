import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomPlaceOrder from "../components/payment/BottomPlaceOrder";
import DeliveryInfoCard from "../components/payment/DeliveryInfoCard";
import MapCard from "../components/payment/MapCard";
import PaymentHeader from "../components/payment/PaymentHeader";
import PaymentMethodsCard, {
  type PaymentResult,
} from "../components/payment/PaymentMethodsCard";
import { useCart } from "../context/CartContext";

export default function PaymentScreen() {
  const { total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<
    "apple" | "card_saved" | "card_new"
  >("apple");

  const [completedPayment, setCompletedPayment] =
    useState<PaymentResult | null>(null);

  const handlePaymentComplete = (result: PaymentResult) => {
    setPaymentMethod(result.method);
    setCompletedPayment(result);
  };

  const orderAmount = total > 0 ? total : 85.0;

  return (
    <>
      <StatusBar backgroundColor="#FDF6F9" barStyle="dark-content" />

      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <PaymentHeader />

          {/* Map Preview */}
          <MapCard />

          {/* Delivery Information */}
          <DeliveryInfoCard />

          {/* Payment Methods */}
          <PaymentMethodsCard
            amount={orderAmount}
            onPaymentComplete={handlePaymentComplete}
          />

          {/* Place Order button */}
          <BottomPlaceOrder
            amount={orderAmount}
            paymentMethod={paymentMethod}
            paymentIntentId={completedPayment?.paymentIntentId}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6F9",
  },
  content: {
    paddingTop: 10,
    paddingBottom: 40,
  },
});