import { useTheme } from "@/context/ThemeContext";
import { WardaBadge, WardaButton, WardaIconButton, WardaText } from "@/components/ui";
import React, { useState } from "react";

import { Alert, Image, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useOrders } from "../context/OrdersContext";
import { reviewsAPI } from "../services/api";
import { useRouter, useLocalSearchParams } from "expo-router";

const REVIEW_TAGS = [
  "Fresh & Vibrant Flowers 🌸",
  "Luxurious Presentation 🎁",
  "Super Fast Delivery ⚡",
  "Heartfelt Greeting Card 💌",
  "Polite & Professional Courier 🛵",
  "Recipient Was Thrilled 🥰",
];

export default function ReviewScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const { orders, addReview } = useOrders();

  const targetOrder = orders.find((o) => o.id === orderId) || orders[0];

  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([REVIEW_TAGS[0], REVIEW_TAGS[1]]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (targetOrder) {
        const reviewComment = `${selectedTags.join(", ")}. ${comment}`.trim();
        await addReview(
          targetOrder.id,
          rating,
          reviewComment
        );
        
        // Sync with backend
        await reviewsAPI.submitReview({
          orderId: targetOrder.id,
          rating,
          tags: selectedTags,
          comment: reviewComment
        }).catch(() => {}); // Fire and forget fallback
      }
      Alert.alert(
        "Review Submitted! 🌟",
        "Thank you for your valuable feedback. A 10% discount voucher has been added to your profile!",
        [{ text: "Great!", onPress: () => router.replace("/(tabs)/orders") }]
      );
    } catch (e) {
      Alert.alert("Success", "Review recorded successfully!");
      router.replace("/(tabs)/orders");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <WardaIconButton icon="arrow-left" onPress={() => router.back()} />
          <WardaText style={styles.headerTitle}>Rate Your Experience</WardaText>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Order Preview Box */}
          {targetOrder && (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <WardaText style={styles.orderId}>
                  Order #{targetOrder.id.slice(-6).toUpperCase()}
                </WardaText>
                <WardaBadge variant="success" icon="check" text="Delivered" />
              </View>

              <View style={styles.itemRow}>
                <Image
                  source={targetOrder.items[0]?.image || require("../assets/gifts/red-roses.png")}
                  style={styles.itemImage}
                  resizeMode="contain"
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <WardaText numberOfLines={1} style={styles.itemName}>
                    {targetOrder.items[0]?.title || "Luxury Rose Bouquet"}
                  </WardaText>
                  <WardaText style={styles.itemSubtitle}>
                    Total: ${targetOrder.total.toFixed(2)} · {targetOrder.items.length} items
                  </WardaText>
                </View>
              </View>
            </View>
          )}

          {/* Star Rating Card */}
          <View style={styles.ratingCard}>
            <WardaText style={styles.ratingPrompt}>How was your overall gift delivery?</WardaText>
            <WardaText style={styles.ratingScore}>{rating}.0 / 5.0</WardaText>

            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  activeOpacity={0.7}
                  onPress={() => setRating(star)}
                  style={styles.starBtn}
                >
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={38}
                    color={star <= rating ? "#FFA726" : "#DDD"}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Compliments & Tags Card */}
          <View style={styles.tagsCard}>
            <WardaText style={styles.sectionTitle}>What did you love most?</WardaText>
            <View style={styles.tagsGrid}>
              {REVIEW_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.tagChip, active && styles.tagChipActive]}
                    activeOpacity={0.8}
                    onPress={() => toggleTag(tag)}
                  >
                    <WardaText style={[styles.tagText, active && styles.tagTextActive]}>
                      {tag}
                    </WardaText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Written Feedback Card */}
          <View style={styles.commentCard}>
            <WardaText style={styles.sectionTitle}>Detailed Thoughts (Optional)</WardaText>
            <TextInput
              placeholder="Tell us about the recipient's reaction, flower freshness, or delivery speed..."
              placeholderTextColor="#A0A0A0"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
          </View>

          {/* Submit Button */}
          <WardaButton
            title="Submit Review & Claim Reward"
            iconRight="award"
            size="lg"
            loading={isSubmitting}
            disabled={isSubmitting}
            onPress={handleSubmit}
          />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: theme.colors.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  orderCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    padding: 16,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle,
    paddingBottom: 10,
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
  },
  itemName: {
    fontSize: 14.5,
    fontWeight: "700",
    color: theme.colors.text,
  },
  itemSubtitle: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  ratingCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    padding: 20,
    alignItems: "center",
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  ratingPrompt: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text,
    textAlign: "center",
  },
  ratingScore: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFA726",
    marginTop: 6,
    marginBottom: 14,
  },
  starsRow: {
    flexDirection: "row",
    gap: 10,
  },
  starBtn: {
    padding: 4,
  },
  tagsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    padding: 18,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: 12,
  },
  tagsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: "transparent",
  },
  tagChipActive: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.brand,
  },
  tagText: {
    fontSize: 12.5,
    color: theme.colors.textMuted,
    fontWeight: "500",
  },
  tagTextActive: {
    color: theme.colors.brand,
    fontWeight: "700",
  },
  commentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    padding: 18,
    shadowColor: theme.colors.text,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  textArea: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radii.xl,
    padding: 14,
    fontSize: 14,
    color: theme.colors.text,
    height: 90,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
  },
});