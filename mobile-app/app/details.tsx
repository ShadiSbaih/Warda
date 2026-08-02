import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomCheckout from "../components/details/BottomCheckout";
import CategoryChips from "../components/details/CategoryChips";
import DetailsHeader from "../components/details/DetailsHeader";
import ProductInfoCard from "../components/details/ProductInfoCard";
import RelatedProductCard from "../components/details/RelatedProductCard";
import WrappingColorPicker from "../components/details/WrappingColorPicker";

import { relatedProducts } from "../data/relatedProducts";

export default function DetailsScreen() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        <DetailsHeader
          image={require("../assets/gifts/red-roses.png")}
        />

        {/* Product Info */}

        <ProductInfoCard
          title="Red Roses Bouquet"
          price="$85"
          rating={4.9}
          reviews="1.2K"
          time="60 mins"
          description="A luxurious bouquet of fresh red roses carefully arranged with soft green leaves and elegant wrapping. Perfect for expressing love and appreciation on special occasions."
        />

        {/* Categories / Occasions */}

        <CategoryChips />

        {/* Wrapping Color */}

        <WrappingColorPicker
          availableColors={["#E53935", "#F48FB1", "#FFFFFF", "#FFD700"]}
        />

        {/* Section */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Similar Gifts
          </Text>

          <Text style={styles.seeAll}>
            See All
          </Text>
        </View>

        {/* Related Products */}

        <View style={styles.relatedContainer}>
          {relatedProducts.map((item) => (
            <RelatedProductCard
              key={item.id}
              item={item}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom */}

     <BottomCheckout
  price={18}
  onAddToCart={() => router.push("/checkout")}
/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  content: {
    paddingBottom: 130,
  },

  sectionHeader: {
    marginTop: 30,
    marginBottom: 8,

    marginHorizontal: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 24,

    fontWeight: "700",

    color: "#222",
  },

  seeAll: {
    fontSize: 15,

    fontWeight: "600",

    color: "#D4588A",
  },

  relatedContainer: {
    paddingBottom: 30,
  },
});