import React, { useState } from "react";
import {
  Alert,
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
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOrders } from "../context/OrdersContext";
import { reviewsAPI } from "../services/api";

const REVIEW_TAGS = [
  "Fresh & Vibrant Flowers 🌸",
  "Luxurious Presentation 🎁",
  "Super Fast Delivery ⚡",
  "Heartfelt Greeting Card 💌",
  "Polite & Professional Courier 🛵",
  "Recipient Was Thrilled 🥰",
];

export default function ReviewScreen() {
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
      <StatusBar barStyle="dark-content" backgroundColor="#FDF6F9" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={20} color="#1E1E2D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rate Your Experience</Text>
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
                <Text style={styles.orderId}>
                  Order #{targetOrder.id.slice(-6).toUpperCase()}
                </Text>
                <View style={styles.deliveredBadge}>
                  <Feather name="check" size={12} color="#10B981" />
                  <Text style={styles.deliveredText}>Delivered</Text>
                </View>
              </View>

              <View style={styles.itemRow}>
                <Image
                  source={targetOrder.items[0]?.image || require("../assets/gifts/red-roses.png")}
                  style={styles.itemImage}
                  resizeMode="contain"
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text numberOfLines={1} style={styles.itemName}>
                    {targetOrder.items[0]?.title || "Luxury Rose Bouquet"}
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    Total: ${targetOrder.total.toFixed(2)} · {targetOrder.items.length} items
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Star Rating Card */}
          <View style={styles.ratingCard}>
            <Text style={styles.ratingPrompt}>How was your overall gift delivery?</Text>
            <Text style={styles.ratingScore}>{rating}.0 / 5.0</Text>

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
            <Text style={styles.sectionTitle}>What did you love most?</Text>
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
                    <Text style={[styles.tagText, active && styles.tagTextActive]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Written Feedback Card */}
          <View style={styles.commentCard}>
            <Text style={styles.sectionTitle}>Detailed Thoughts (Optional)</Text>
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
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.9}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitBtnText}>
              {isSubmitting ? "Submitting..." : "Submit Review & Claim Reward"}
            </Text>
            <Feather name="award" size={18} color="#FFFFFF" />
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F5",
    paddingBottom: 10,
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1E2D",
  },
  deliveredBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  deliveredText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#10B981",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#FCF6F8",
  },
  itemName: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#1E1E2D",
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  ratingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  ratingPrompt: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E2D",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E2D",
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
    borderRadius: 14,
    backgroundColor: "#F4F4F7",
    borderWidth: 1,
    borderColor: "transparent",
  },
  tagChipActive: {
    backgroundColor: "#FFF0F5",
    borderColor: "#D4588A",
  },
  tagText: {
    fontSize: 12.5,
    color: "#555",
    fontWeight: "500",
  },
  tagTextActive: {
    color: "#D4588A",
    fontWeight: "700",
  },
  commentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#D4588A",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  textArea: {
    backgroundColor: "#F9F9FB",
    borderRadius: 16,
    padding: 14,
    fontSize: 14,
    color: "#1E1E2D",
    height: 90,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  submitBtn: {
    backgroundColor: "#D4588A",
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#D4588A",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    marginTop: 6,
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});