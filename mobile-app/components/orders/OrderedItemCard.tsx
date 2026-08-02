import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  item: {
    id: number;
    title: string;
    shop: string;
    address: string;
    status: string;
    image: any;
  };
}

export default function OrderedItemCard({
  item,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Image */}

      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Details */}

      <View style={styles.info}>
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {item.title}
        </Text>

        <Text style={styles.address}>
          Delivery · {item.address}
        </Text>

        <Text style={styles.shop}>
          From {item.shop}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color:
                item.status === "Delivered"
                  ? "#34C759"
                  : "#D4588A",
            },
          ]}
        >
          {item.status}
        </Text>
      </View>

      {/* Track Button */}

      <TouchableOpacity style={styles.trackButton}>
        <Text style={styles.trackText}>
          Track
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#FCF6F8",
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1E2D",
  },

  address: {
    marginTop: 4,
    fontSize: 13,
    color: "#8E8292",
  },

  shop: {
    marginTop: 2,
    fontSize: 12,
    color: "#D4588A",
    fontWeight: "600",
  },

  status: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
  },

  trackButton: {
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D4588A",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#D4588A",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },

  trackText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});