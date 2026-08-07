import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import { useTheme } from "../context/ThemeContext";
import { WardaButton, WardaCard, WardaIconButton, WardaInput, WardaText } from "../components/ui";
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
  const { theme } = useTheme();
  const { items, updateQuantity, removeFromCart, total } = useCart();

  const [selectedSlot, setSelectedSlot] = useState("now");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState({
    title: "Home / Al Olaya",
    subtitle: "King Fahd Branch Rd, Building 42, Apt 301, Riyadh",
  });

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("@warda_selected_address").then((res) => {
        if (res) setDeliveryAddress(JSON.parse(res));
      });
    }, [])
  );

  const displayItems = items.length > 0 ? items : [];

  const handlePhotoUpload = async () => {
    if (hasPhoto) {
      setHasPhoto(false);
      setPhotoUri(null);
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
      setHasPhoto(true);
    }
  };

  const Section = ({ title, action, icon, children }: any) => (
    <WardaCard style={{ marginBottom: 16 }}>
      <View style={styles.sectionHeader}>
        <WardaText variant="h3">{title}</WardaText>
        {action ? (
          <TouchableOpacity activeOpacity={0.8} onPress={action.onPress}>
            <WardaText variant="caption" weight="bold" color={theme.colors.brand}>
              {action.label}
            </WardaText>
          </TouchableOpacity>
        ) : icon ? (
          icon
        ) : null}
      </View>
      {children}
    </WardaCard>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <WardaIconButton icon="arrow-left" onPress={() => router.back()} />
          <WardaText variant="h2">Checkout & Review</WardaText>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Section
            title={`Gifts in Order (${displayItems.length})`}
            action={{ label: "Edit Bag", onPress: () => router.push("/(tabs)/cart") }}
          >
            {displayItems.length === 0 ? (
              <View style={styles.emptyCartBox}>
                <View style={[styles.emptyIconCircle, { backgroundColor: theme.colors.brandLight }]}>
                  <Ionicons name="gift-outline" size={32} color={theme.colors.brand} />
                </View>
                <WardaText variant="h3" style={{ marginTop: 10 }}>
                  Your gift bag is empty
                </WardaText>
                <WardaText variant="caption" align="center" color={theme.colors.textMuted} style={{ marginVertical: 12, paddingHorizontal: 20 }}>
                  Explore our catalog to select luxury flowers or sweets
                </WardaText>
                <WardaButton title="Browse Gifts" size="sm" onPress={() => router.push("/(tabs)/menu")} />
              </View>
            ) : (
              displayItems.map((cartItem) => (
                <View key={cartItem.id} style={[styles.itemRow, { borderBottomColor: theme.colors.borderSubtle }]}>
                  <View style={[styles.itemImageWrapper, { backgroundColor: theme.colors.background }]}>
                    <Image source={cartItem.image} style={styles.itemImage} resizeMode="contain" />
                  </View>
                  <View style={styles.itemDetails}>
                    <WardaText variant="body" weight="bold" numberOfLines={1}>
                      {cartItem.title}
                    </WardaText>
                    {cartItem.wrappingName && (
                      <WardaText variant="caption" color={theme.colors.textMuted}>
                        Wrapping: {cartItem.wrappingName}
                      </WardaText>
                    )}
                    <WardaText variant="body" weight="bold" color={theme.colors.brand}>
                      ${(cartItem.price * cartItem.quantity).toFixed(2)}
                    </WardaText>
                  </View>
                  <View style={[styles.qtyBox, { backgroundColor: theme.colors.background }]}>
                    <TouchableOpacity
                      style={[styles.qtyBtn, { backgroundColor: theme.colors.surface }]}
                      onPress={() =>
                        cartItem.quantity > 1 ? updateQuantity(cartItem.id, cartItem.quantity - 1) : removeFromCart(cartItem.id)
                      }
                    >
                      <Feather name="minus" size={14} color={theme.colors.text} />
                    </TouchableOpacity>
                    <WardaText variant="body" weight="bold">
                      {cartItem.quantity}
                    </WardaText>
                    <TouchableOpacity
                      style={[styles.qtyBtn, { backgroundColor: theme.colors.surface }]}
                      onPress={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                    >
                      <Feather name="plus" size={14} color={theme.colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </Section>

          <Section
            title="Delivery Destination"
            action={{ label: "Change", onPress: () => router.push("/delivery-address") }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/delivery-address")}
              style={[styles.addressRow, { backgroundColor: theme.colors.background }]}
            >
              <View style={[styles.addressIconCircle, { backgroundColor: theme.colors.brandLight }]}>
                <Ionicons name="location-sharp" size={20} color={theme.colors.brand} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <WardaText variant="body" weight="bold">
                  {deliveryAddress.title}
                </WardaText>
                <WardaText variant="caption" color={theme.colors.textMuted} numberOfLines={1}>
                  {deliveryAddress.subtitle}
                </WardaText>
              </View>
              <Feather name="chevron-right" size={18} color={theme.colors.textMuted} />
            </TouchableOpacity>
          </Section>

          <Section
            title="Select Delivery Time"
            icon={<Feather name="clock" size={16} color={theme.colors.brand} />}
          >
            <View style={styles.slotsGrid}>
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <TouchableOpacity
                    key={slot.id}
                    activeOpacity={0.85}
                    onPress={() => setSelectedSlot(slot.id)}
                    style={[
                      styles.slotCard,
                      { backgroundColor: theme.colors.background, borderColor: isSelected ? theme.colors.brand : "transparent" },
                    ]}
                  >
                    <View style={[styles.slotRadio, { borderColor: theme.colors.brand }]}>
                      {isSelected && <View style={[styles.slotRadioInner, { backgroundColor: theme.colors.brand }]} />}
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <WardaText variant="body" weight={isSelected ? "bold" : "semibold"} color={isSelected ? theme.colors.brand : theme.colors.text}>
                        {slot.title}
                      </WardaText>
                      <WardaText variant="caption" color={theme.colors.textMuted}>
                        {slot.subtitle}
                      </WardaText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Section>

          <Section
            title="Recipient & Gift Note"
            icon={<MaterialCommunityIcons name="card-text-outline" size={18} color={theme.colors.brand} />}
          >
            <WardaInput
              label="Recipient Name"
              placeholder="e.g. Sarah Al-Otaibi"
              value={recipientName}
              onChangeText={setRecipientName}
              containerStyle={styles.formGroup}
            />
            <WardaInput
              label="Recipient Contact Phone"
              placeholder="+966 50 123 4567"
              keyboardType="phone-pad"
              value={recipientPhone}
              onChangeText={setRecipientPhone}
              containerStyle={styles.formGroup}
            />
            <TextInput
              placeholder="Happy Birthday! Wishing you all the joy and elegance... 🌸"
              placeholderTextColor={theme.colors.textPlaceholder}
              value={giftNote}
              onChangeText={setGiftNote}
              multiline
              numberOfLines={3}
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.borderSubtle,
                  borderRadius: theme.radii.md,
                  color: theme.colors.text,
                },
              ]}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handlePhotoUpload}
              style={[
                styles.photoUploadRow,
                { backgroundColor: hasPhoto ? theme.colors.successSurface : theme.colors.background },
                { borderColor: hasPhoto ? theme.colors.success : theme.colors.borderSubtle },
              ]}
            >
              <View style={[styles.photoIcon, { backgroundColor: theme.colors.surface }]}>
                <Feather name={hasPhoto ? "check-circle" : "image"} size={18} color={hasPhoto ? theme.colors.success : theme.colors.brand} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <WardaText variant="body" weight="bold">
                  {hasPhoto ? "Photo Attached" : "Attach Printed Photo Card (Free)"}
                </WardaText>
                <WardaText variant="caption" color={theme.colors.textMuted}>
                  {hasPhoto ? "High-res glossy photo will be included" : "Tap to attach memory photo"}
                </WardaText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} onPress={() => setIsAnonymous(!isAnonymous)} style={[styles.anonymousRow, { backgroundColor: theme.colors.background }]}>
              <View style={styles.anonymousLeft}>
                <View style={[styles.anonymousIcon, { backgroundColor: theme.colors.surface }]}>
                  <MaterialCommunityIcons name="incognito" size={20} color={theme.colors.info} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <WardaText variant="body" weight="bold">
                    Secret / Anonymous Gift
                  </WardaText>
                  <WardaText variant="caption" color={theme.colors.textMuted}>
                    We will hide your name & identity from the delivery note
                  </WardaText>
                </View>
              </View>
              <View
                style={[
                  styles.switchTrack,
                  { backgroundColor: isAnonymous ? theme.colors.brand : theme.colors.border },
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    { backgroundColor: theme.colors.surface, alignSelf: isAnonymous ? "flex-end" : "flex-start" },
                  ]}
                />
              </View>
            </TouchableOpacity>
          </Section>

          <PriceSummary />

          <WardaButton
            title="Proceed to Payment"
            iconRight="arrow-right"
            size="lg"
            disabled={displayItems.length === 0}
            onPress={() =>
              router.push({
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
                    deliveryAddress: deliveryAddress.subtitle,
                  }),
                },
              })
            }
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  emptyCartBox: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  itemImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 14,
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
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 8,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
  },
  addressIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  slotsGrid: {
    gap: 10,
  },
  slotCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  slotRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  slotRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  formGroup: {
    marginBottom: 12,
  },
  textArea: {
    minHeight: 90,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  photoUploadRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  photoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  anonymousRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 16,
  },
  anonymousLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  anonymousIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  switchTrack: {
    width: 46,
    height: 26,
    borderRadius: 999,
    padding: 3,
    justifyContent: "center",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
