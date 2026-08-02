import { Feather } from "@expo/vector-icons";

export interface ProfileMenuItem {
  id: number;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  route?: string;
}

export const profileMenu: ProfileMenuItem[] = [
  {
    id: 1,
    icon: "file-text",
    title: "My Orders",
    subtitle: "View past and current orders",
    route: "/orders",
  },
  {
    id: 2,
    icon: "heart",
    title: "Favorites",
    subtitle: "Your saved gifts",
    route: "/favorites",
  },
  {
    id: 3,
    icon: "bell",
    title: "Occasion Reminders",
    subtitle: "Never forget your loved ones' occasions",
    route: "/reminders",
  },
  {
    id: 4,
    icon: "tag",
    title: "My Vouchers",
    subtitle: "Check available discounts",
    route: "/vouchers",
  },
  {
    id: 5,
    icon: "credit-card",
    title: "Payment Methods",
    subtitle: "Manage cards and wallet",
    route: "/payment-methods",
  },
];