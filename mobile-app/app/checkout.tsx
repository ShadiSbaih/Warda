import React from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import CheckoutProductCard from "../components/checkout/CheckoutProductCard";
import ContinueButton from "../components/checkout/ContinueButton";
import DeliveryCard from "../components/checkout/DeliveryCard";
import PriceSummary from "../components/checkout/PriceSummary";
import GiftMessageInput from "../components/checkout/GiftMessageInput";
import DeliveryScheduler from "../components/checkout/DeliveryScheduler";
import AnonymousToggle from "../components/checkout/AnonymousToggle";
import CustomPhotoUpload from "../components/checkout/CustomPhotoUpload";

import { checkoutItems } from "../data/checkoutData";

export default function CheckoutScreen() {
  return (
    <>
      <StatusBar
        backgroundColor="#FDF6F9"
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}

          <CheckoutHeader />

          {/* Products */}

          <CheckoutProductCard
            item={checkoutItems[0]}
          />

          <CheckoutProductCard
            item={checkoutItems[1]}
          />

          {/* Delivery */}

          <DeliveryCard />

          {/* Gift Message */}

          <GiftMessageInput />

          {/* Delivery Schedule */}

          <DeliveryScheduler />

          {/* Anonymous Delivery */}

          <AnonymousToggle />

          {/* Custom Photo */}

          <CustomPhotoUpload />

          {/* Price Summary */}

          <PriceSummary />

          {/* Continue */}

          <ContinueButton />
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