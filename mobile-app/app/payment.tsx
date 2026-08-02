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

// Hard-coded demo amount — replace with cart total from your store
const ORDER_AMOUNT = 23.0;

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState<
    "apple" | "card_saved" | "card_new"
  >("apple");

  const [completedPayment, setCompletedPayment] =
    useState<PaymentResult | null>(null);

  const handlePaymentComplete = (result: PaymentResult) => {
    setPaymentMethod(result.method);
    setCompletedPayment(result);
  };

  return (
    <>
      <StatusBar backgroundColor="#F8F8F8" barStyle="dark-content" />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <PaymentHeader />

          {/* Map */}
          <MapCard />

          {/* Delivery Information */}
          <DeliveryInfoCard />

          {/* Payment Methods — opens card modal when "New Card" is tapped */}
          <PaymentMethodsCard
            amount={ORDER_AMOUNT}
            onPaymentComplete={handlePaymentComplete}
          />

          {/* Place Order button */}
          <BottomPlaceOrder
            amount={ORDER_AMOUNT}
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
    backgroundColor: "#F8F8F8",
  },

  content: {
    paddingTop: 10,
    paddingBottom: 40,
  },
});