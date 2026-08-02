import { Feather } from "@expo/vector-icons";

export interface NotificationItem {
  id: number;
  category: "All" | "Orders" | "Promotions";
  icon: keyof typeof Feather.glyphMap;
  title: string;
  message: string;
  time: string;
}

export const notifications: NotificationItem[] = [
  {
    id: 1,
    category: "Orders",
    icon: "truck",
    title: "Your order is on the way!",
    message:
      "Your gift has been picked up and is on its way 🚴",
    time: "5 min",
  },

  {
    id: 2,
    category: "Promotions",
    icon: "tag",
    title: "20% off Rose Bouquets today only!",
    message:
      "Today only! Send a beautiful bouquet to someone special 🌹",
    time: "1h",
  },

  {
    id: 3,
    category: "Promotions",
    icon: "gift",
    title: "Voucher Earned",
    message:
      "You earned a $5 voucher from your last order. Apply it now!",
    time: "2h",
  },

  {
    id: 4,
    category: "Orders",
    icon: "check-circle",
    title: "Order Delivered",
    message:
      "Have a great day! Don't forget to rate our service ⭐",
    time: "4h",
  },

  {
    id: 5,
    category: "Promotions",
    icon: "trending-up",
    title: "Trending Near You",
    message:
      "Warda Gifts is getting popular, 100+ orders this week!",
    time: "8h",
  },
];