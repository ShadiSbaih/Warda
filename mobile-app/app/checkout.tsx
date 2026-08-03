import React, { useState } from "react";
import { RainbowColors, RainbowRadii } from "../constants/Colors";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import ReviewHeader from "../components/checkout/ReviewHeader";
import PriceSummary from "../components/checkout/PriceSummary";
import { useCart } from "../context/CartContext";

const TIME_SLOTS = [
  { id: "now", title: "Express Now", subtitle: "Within 30–45 mins" },
  { id: "evening", title: "This Evening", subtitle: "6:00 PM – 9:00 PM" },
  { id: "tomorrow_morning", title: "Tomorrow Morning", subtitle: "9:00 AM – 12:00 PM" },
  { id: "tomorrow_evening", title: "Tomorrow Evening", subtitle: "5:00 PM – 8:00 PM" },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, total, appliedPromo, clearCart } = useCart();

  const [selectedSlot, setSelectedSlot] = useState("now");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState({
    title: "Home / Al Olaya",
    subtitle: "King Fahd Branch Rd, Building 42, Apt 301, Riyadh"
  });

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("@warda_selected_address").then((res) => {
        if (res) setDeliveryAddress(JSON.parse(res));
      });
    }, [])
  );

  // If cart is completely empty, use first product as a demo preview item or show empty state
  const displayItems = items.length > 0 ? items : [];

  const handlePhotoUpload = async () => {
    if (hasPhoto) {
      setHasPhoto(false);
      setPhotoUri(null);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
      setHasPhoto(true);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={RainbowColors.pureWhite} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <ReviewHeader title="Checkout & Review" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Order Items Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Gifts in Order ({displayItems.length})</Text>
              <TouchableOpacity onPress={() => router.push("/(tabs)/cart")}>
                <Text style={styles.editBtn}>Edit Bag</Text>
              </TouchableOpacity>
            </View>

            {displayItems.length === 0 ? (
              <View style={styles.emptyCartBox}>
                <Ionicons name="gift-outline" size={40} color={RainbowColors.tangerine} />
                <Text style={styles.emptyTitle}>Your gift bag is empty</Text>
                <Text style={styles.emptySubtitle}>Explore our catalog to select luxury flowers or sweets</Text>
                <TouchableOpacity
                  style={styles.exploreBtn}
                  onPress={() => router.push("/(tabs)/menu")}
                >
                  <Text style={styles.exploreBtnText}>Browse Gifts</Text>
                </TouchableOpacity>
              </View>
            ) : (
              displayItems.map((cartItem) => (
                <View key={cartItem.id} style={styles.itemRow}>
                  <View style={styles.itemImageWrapper}>
                    <Image
                      source={cartItem.image}
                      style={styles.itemImage}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.itemDetails}>
                    <Text numberOfLines={1} style={styles.itemName}>
                      {cartItem.title}
                    </Text>
                    {cartItem.wrappingName && (
                      <Text style={styles.itemOption}>
                        Wrapping: {cartItem.wrappingName}
                      </Text>
                    )}
                    <Text style={styles.itemPrice}>
                      ${(cartItem.price * cartItem.quantity).toFixed(2)}
                    </Text>
                  </View>

                  {/* Quantity Stepper */}
                  <View style={styles.qtyBox}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        cartItem.quantity > 1
                          ? updateQuantity(cartItem.id, cartItem.quantity - 1)
                          : removeFromCart(cartItem.id)
                      }
                    >
                      <Feather name="minus" size={14} color={RainbowColors.inkBlack} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                    >
                      <Feather name="plus" size={14} color={RainbowColors.inkBlack} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Delivery Destination Card */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Delivery Destination</Text>
              <TouchableOpacity onPress={() => router.push("/delivery-address")}>
                <Text style={styles.editBtn}>Change</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addressRow}
              activeOpacity={0.8}
              onPress={() => router.push("/delivery-address")}
            >
              <View style={styles.addressIconCircle}>
                <Ionicons name="location-sharp" size={20} color={RainbowColors.tangerine} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.addressTitle}>{deliveryAddress.title}</Text>
                <Text style={styles.addressSubtitle}>
                  {deliveryAddress.subtitle}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={RainbowColors.stone} />
            </TouchableOpacity>
          </View>

          {/* Delivery Time Scheduler */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Select Delivery Time</Text>
              <Feather name="clock" size={16} color={RainbowColors.tangerine} />
            </View>

            <View style={styles.slotsGrid}>
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.slotCard,
                      isSelected && styles.slotCardActive,
                    ]}
                    activeOpacity={0.85}
                    onPress={() => setSelectedSlot(slot.id)}
                  >
                    <View style={styles.slotRadio}>
                      {isSelected && <View style={styles.slotRadioInner} />}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text
                        style={[
                          styles.slotTitle,
                          isSelected && styles.slotTitleActive,
                        ]}
                      >
                        {slot.title}
                      </Text>
                      <Text style={styles.slotSub}>{slot.subtitle}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Recipient Details & Greeting Card Note */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recipient & Gift Note</Text>
              <MaterialCommunityIcons name="card-text-outline" size={18} color={RainbowColors.tangerine} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Recipient Name</Text>
              <TextInput
                placeholder="e.g. Sarah Al-Otaibi"
                placeholderTextColor="#A0A0A0"
                value={recipientName}
                onChangeText={setRecipientName}
                style={styles.textInput}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Recipient Contact Phone</Text>
              <TextInput
                placeholder="+966 50 123 4567"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                value={recipientPhone}
                onChangeText={setRecipientPhone}
                style={styles.textInput}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Personalized Gift Note</Text>
              <TextInput
                placeholder="Happy Birthday! Wishing you all the joy and elegance... 🌸"
                placeholderTextColor="#A0A0A0"
                value={giftNote}
                onChangeText={setGiftNote}
                multiline
                numberOfLines={3}
                style={[styles.textInput, styles.textArea]}
              />
            </View>

            {/* Custom Photo Upload Toggle */}
            <TouchableOpacity
              style={[
                styles.photoUploadRow,
                hasPhoto && styles.photoUploadRowActive,
              ]}
              activeOpacity={0.85}
              onPress={handlePhotoUpload}
            >
              <View style={styles.photoIcon}>
                <Feather
                  name={hasPhoto ? "check-circle" : "image"}
                  size={18}
                  color={hasPhoto ? "#10B981" : RainbowColors.tangerine}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.photoTitle}>
                  {hasPhoto ? "Photo Attached" : "Attach Printed Photo Card (Free)"}
                </Text>
                <Text style={styles.photoSub}>
                  {hasPhoto ? "High-res glossy photo will be included" : "Tap to attach memory photo"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Anonymous Gifting Toggle */}
            <TouchableOpacity
              style={styles.anonymousRow}
              activeOpacity={0.85}
              onPress={() => setIsAnonymous(!isAnonymous)}
            >
              <View style={styles.anonymousLeft}>
                <View style={styles.anonymousIcon}>
                  <MaterialCommunityIcons name="incognito" size={20} color="#6366F1" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.anonymousTitle}>Secret / Anonymous Gift</Text>
                  <Text style={styles.anonymousSub}>
                    We will hide your name & identity from the delivery note
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.switchTrack,
                  isAnonymous && styles.switchTrackActive,
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    isAnonymous && styles.switchThumbActive,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Price Summary */}
          <PriceSummary />

          {/* Bottom Action */}
          <View style={styles.bottomCtaWrapper}>
            <TouchableOpacity
              style={[
                styles.proceedBtn,
                displayItems.length === 0 && { opacity: 0.6 },
              ]}
              disabled={displayItems.length === 0}
              activeOpacity={0.9}
              onPress={() => router.push({
                pathname: "/payment",
                params: {
                  checkoutState: JSON.stringify({
                    recipientName,
                    recipientPhone,
                    giftNote,
                    isAnonymous,
                    selectedSlot,
                    hasPhoto,
                    photoUri,
                    deliveryAddress: deliveryAddress.subtitle
                  })
                }
              })}
            >
              <Text style={styles.proceedBtnText}>Proceed to Payment</Text>
              <Feather name="arrow-right" size={20} color={RainbowColors.pureWhite} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: RainbowColors.pureWhite,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: RainbowColors.pureWhite,
    borderRadius: RainbowRadii.cards,
    padding: 18,
    shadowColor: RainbowColors.inkBlack,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: RainbowColors.inkBlack,
  },
  editBtn: {
    fontSize: 13,
    fontWeight: "700",
    color: RainbowColors.tangerine,
  },
  emptyCartBox: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: RainbowColors.stone,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  exploreBtn: {
    backgroundColor: RainbowColors.cloudSurface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  exploreBtnText: {
    color: RainbowColors.tangerine,
    fontWeight: "700",
    fontSize: 13.5,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: RainbowColors.cloudSurface,
  },
  itemImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: 48,
    height: 48,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14.5,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  itemOption: {
    fontSize: 11.5,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: RainbowColors.tangerine,
    marginTop: 4,
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: RainbowRadii.pills,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 8,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 13,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.cloudSurface,
    padding: 14,
    borderRadius: RainbowRadii.cards,
  },
  addressIconCircle: {
    width: 40,
    height: 40,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.cloudSurface,
    justifyContent: "center",
    alignItems: "center",
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  addressSubtitle: {
    fontSize: 12,
    color: RainbowColors.stone,
    marginTop: 2,
  },
  slotsGrid: {
    gap: 10,
  },
  slotCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: RainbowRadii.cards,
    backgroundColor: RainbowColors.cloudSurface,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  slotCardActive: {
    backgroundColor: RainbowColors.cloudSurface,
    borderColor: RainbowColors.tangerine,
  },
  slotRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: RainbowColors.tangerine,
    justifyContent: "center",
    alignItems: "center",
  },
  slotRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: RainbowColors.tangerine,
  },
  slotTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  slotTitleActive: {
    color: RainbowColors.tangerine,
  },
  slotSub: {
    fontSize: 11.5,
    color: RainbowColors.stone,
    marginTop: 1,
  },
  formGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: "600",
    color: RainbowColors.stone,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: RainbowColors.cloudSurface,
    borderRadius: RainbowRadii.cards,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: RainbowColors.inkBlack,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  textArea: {
    height: 70,
    textAlignVertical: "top",
  },
  photoUploadRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: RainbowColors.cloudSurface,
    padding: 12,
    borderRadius: RainbowRadii.cards,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: RainbowColors.cloudSurface,
  },
  photoUploadRowActive: {
    backgroundColor: "#ECFDF5",
    borderColor: "#10B981",
  },
  photoIcon: {
    width: 36,
    height: 36,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  photoTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  photoSub: {
    fontSize: 11,
    color: RainbowColors.stone,
    marginTop: 1,
  },
  anonymousRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: RainbowColors.cloudSurface,
    padding: 12,
    borderRadius: RainbowRadii.cards,
  },
  anonymousLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  anonymousIcon: {
    width: 36,
    height: 36,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  anonymousTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: RainbowColors.inkBlack,
  },
  anonymousSub: {
    fontSize: 11,
    color: RainbowColors.stone,
    marginTop: 1,
  },
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.stone,
    padding: 2,
    justifyContent: "center",
  },
  switchTrackActive: {
    backgroundColor: RainbowColors.tangerine,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: RainbowRadii.pills,
    backgroundColor: RainbowColors.pureWhite,
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
  bottomCtaWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  proceedBtn: {
    backgroundColor: RainbowColors.tangerine,
    height: 56,
    borderRadius: RainbowRadii.pills,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: RainbowColors.tangerine,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  proceedBtnText: {
    color: RainbowColors.pureWhite,
    fontSize: 16,
    fontWeight: "700",
  },
});