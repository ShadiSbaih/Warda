import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import BottomPlaceOrder from "../components/payment/BottomPlaceOrder";
import DeliveryInfoCard from "../components/payment/DeliveryInfoCard";
import MapCard from "../components/payment/MapCard";
import PaymentHeader from "../components/payment/PaymentHeader";
import PaymentMethodsCard from "../components/payment/PaymentMethodsCard";

export default function PaymentScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { checkoutState } = useLocalSearchParams();
  const parsedCheckoutState = checkoutState ? JSON.parse(checkoutState as string) : {};

  return (
    <>
      <StatusBar backgroundColor={theme.colors.surface} barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <PaymentHeader />
          <MapCard />
          <DeliveryInfoCard
            address={parsedCheckoutState.deliveryAddress}
            recipientName={parsedCheckoutState.recipientName}
            recipientPhone={parsedCheckoutState.recipientPhone}
            deliverySlot={parsedCheckoutState.selectedSlot}
          />
          <PaymentMethodsCard />
          <BottomPlaceOrder checkoutState={parsedCheckoutState} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 40,
  },
});
