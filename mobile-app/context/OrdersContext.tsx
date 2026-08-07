import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ordersAPI } from "../services/api";
import { CartItem } from "./CartContext";

export interface OrderDriver {
  name: string;
  phone: string;
  plate: string;
  rating: number;
  vehicle: string;
  avatar?: string;
}

export interface DriverLocation {
  lat: number;
  lng: number;
  updatedAt?: string;
}

export interface OrderAddress {
  title?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  coordinates?: { lat: number | null; lng: number | null };
}

export interface OrderItem {
  product: string;
  title: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  wrappingColor?: string;
  wrappingName?: string;
  giftMessage?: string;
  recipientName?: string;
  isAnonymous?: boolean;
  customPhotoUrl?: string;
}

export interface Order {
  id: string;
  _id?: string;
  orderNumber: string;
  title: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  wrappingTotal: number;
  total: number;
  status: "confirmed" | "preparing" | "on_the_way" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  address: string;
  deliveryAddress?: OrderAddress;
  shop: string;
  recipientName: string;
  giftMessage?: string;
  isAnonymous?: boolean;
  paymentMethod: string;
  createdAt: string;
  deliveryTimeSlot?: string;
  driver?: OrderDriver;
  driverLocation?: DriverLocation;
  review?: {
    rating: number;
    tags?: string[];
    comment?: string;
  };
}

export interface PlaceOrderInput {
  items: CartItem[];
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  wrappingTotal?: number;
  total?: number;
  address?: string;
  deliveryAddress?: OrderAddress;
  deliveryTimeSlot?: string;
  recipientName?: string;
  giftMessage?: string;
  isAnonymous?: boolean;
}

export interface OrdersContextType {
  orders: Order[];
  activeOrder: Order | null;
  deliveredOrders: Order[];
  getOrder: (id: string) => Order | undefined;
  placeOrder: (orderData: PlaceOrderInput) => Promise<Order>;
  cancelOrder: (id: string) => Promise<boolean>;
  addReview: (orderId: string, rating: number, comment?: string, tags?: string[]) => void;
}

const ORDERS_STORAGE_KEY = "@warda_orders_v1";

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const normalizeOrder = (raw: any): Order => ({
  ...raw,
  id: raw._id?.toString() || raw.id?.toString(),
  title:
    raw.items && raw.items[0]
      ? raw.items[0].title || "Gift Delivery"
      : "Gift Delivery",
  address:
    raw.deliveryAddress?.address || raw.address || "King Fahd Road, Al Olaya, Riyadh",
  deliveryTimeSlot: raw.deliverySlot || "Express Now",
  paymentMethod: raw.paymentMethod || "Cash on Delivery",
});

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await ordersAPI.getOrders();
        if (res.success && Array.isArray(res.orders)) {
          setOrders(res.orders.map(normalizeOrder));
        } else {
          const saved = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setOrders(parsed.map(normalizeOrder));
            }
          }
        }
      } catch (e) {
        console.log("Error loading orders:", e);
      }
    })();
  }, []);

  const saveOrders = async (list: Order[]) => {
    setOrders(list);
    try {
      await AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.log("Error saving orders:", e);
    }
  };

  const getOrder = (id: string) => {
    return orders.find((o) => o.id === id || o.orderNumber === id);
  };

  const placeOrder = async (orderData: PlaceOrderInput): Promise<Order> => {
    const orderItems: OrderItem[] = orderData.items.map((item) => ({
      product: (item.productId?.toString?.() || item.id).toString(),
      title: item.title || "Gift Item",
      image: typeof item.image === "string" ? item.image : undefined,
      quantity: item.quantity,
      unitPrice: item.price,
      wrappingColor: item.wrappingColor,
      wrappingName: item.wrappingName,
      giftMessage: item.giftMessage,
      recipientName: item.recipientName,
      isAnonymous: item.isAnonymous,
    }));

    const payload = {
      items: orderItems,
      deliveryAddress: orderData.deliveryAddress || {
        address: orderData.address || "King Fahd Road, Al Olaya, Riyadh",
      },
      recipientName: orderData.recipientName,
      recipientPhone: (orderData.deliveryAddress as any)?.phone,
      giftMessage: orderData.giftMessage,
      isAnonymous: orderData.isAnonymous,
      deliverySlot: orderData.deliveryTimeSlot,
      discountCode: undefined, // wired up when coupon API is finalized
    };

    let newOrder: Order;
    try {
      const res = await ordersAPI.createOrder(payload);
      if (!res.success || !res.order) {
        throw new Error(res.message || "Failed to create order");
      }
      newOrder = normalizeOrder(res.order);
    } catch (e: any) {
      // Offline / demo fallback
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      newOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: `#WD-${randomNum}`,
        title: orderItems[0]?.title || "Gift Delivery",
        items: orderItems,
        subtotal: orderData.subtotal || 0,
        discount: orderData.discount || 0,
        deliveryFee: orderData.deliveryFee || 0,
        wrappingTotal: orderData.wrappingTotal || 0,
        total: orderData.total || 0,
        status: "confirmed",
        paymentStatus: "pending",
        address: (orderData.deliveryAddress as any)?.address || orderData.address || "Riyadh",
        deliveryAddress: orderData.deliveryAddress,
        shop: "Warda Luxury Boutique",
        recipientName: orderData.recipientName || "My Loved One",
        giftMessage: orderData.giftMessage || "Enjoy your special surprise 🌹",
        isAnonymous: orderData.isAnonymous || false,
        paymentMethod: "Cash on Delivery",
        createdAt: new Date().toISOString(),
        deliveryTimeSlot: orderData.deliveryTimeSlot || "Express Now",
        driver: {
          name: "Tariq Al-Harbi",
          phone: "+966 50 123 4567",
          plate: "KSA 4821",
          rating: 4.9,
          vehicle: "White Lexus ES",
        },
        driverLocation: { lat: 24.7136, lng: 46.6753 },
      };
    }

    const updated = [newOrder, ...orders];
    await saveOrders(updated);
    return newOrder;
  };

  const cancelOrder = async (id: string) => {
    try {
      await ordersAPI.cancelOrder(id);
    } catch (e) {
      console.log("Failed to cancel order on backend:", e);
    }

    const updated = orders.map((o) =>
      o.id === id
        ? { ...o, status: "cancelled" as const }
        : o
    );
    await saveOrders(updated);
    return true;
  };

  const addReview = (orderId: string, rating: number, comment?: string, tags?: string[]) => {
    const updated = orders.map((o) =>
      o.id === orderId
        ? { ...o, review: { rating, tags: tags || ["Luxury Gift", "Fast Delivery"], comment }, status: "delivered" as const }
        : o
    );
    saveOrders(updated);
  };

  const activeOrder =
    orders.find(
      (o) =>
        o.status === "confirmed" ||
        o.status === "preparing" ||
        o.status === "on_the_way"
    ) || null;

  const deliveredOrders = orders.filter(
    (o) => o.status === "delivered" || o.status === "cancelled"
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        activeOrder,
        deliveredOrders,
        getOrder,
        placeOrder,
        cancelOrder,
        addReview,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};
