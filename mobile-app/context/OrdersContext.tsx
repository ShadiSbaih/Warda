import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem } from "./CartContext";
import { ordersAPI } from "../services/api";

export interface OrderDriver {
  name: string;
  phone: string;
  plate: string;
  rating: number;
  vehicle: string;
  avatar?: any;
}

export interface Order {
  id: string;
  orderNumber: string;
  title: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  wrappingTotal: number;
  total: number;
  status: "confirmed" | "preparing" | "on_the_way" | "delivered" | "cancelled";
  address: string;
  shop: string;
  recipientName: string;
  giftMessage?: string;
  isAnonymous?: boolean;
  paymentMethod: string;
  createdAt: string;
  deliveryTimeSlot?: string;
  driver: OrderDriver;
  review?: {
    rating: number;
    tags?: string[];
    comment?: string;
  };
}

export interface OrdersContextType {
  orders: Order[];
  activeOrder: Order | null;
  deliveredOrders: Order[];
  getOrder: (id: string) => Order | undefined;
  placeOrder: (orderData: Partial<Order>) => Promise<Order>;
  createOrder: (orderData: Partial<Order>) => Promise<Order>;
  cancelOrder: (id: string) => void;
  addReview: (orderId: string, rating: number, comment?: string, tags?: string[]) => void;
  addOrderReview: (orderId: string, rating: number, tags: string[], comment?: string) => void;
}

const ORDERS_STORAGE_KEY = "@warda_orders_v1";

const initialOrders: Order[] = [];

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    (async () => {
      try {
        const res = await ordersAPI.getOrders();
        if (res.success && res.orders) {
          setOrders(res.orders);
        } else {
          // Fallback to local storage if API fails or is unavailable
          const saved = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setOrders(parsed);
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

  const placeOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `#WD-${randomNum}`,
      title: orderData.items && orderData.items[0] ? orderData.items[0].title : "Gift Delivery",
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      discount: orderData.discount || 0,
      deliveryFee: orderData.deliveryFee || 0,
      wrappingTotal: orderData.wrappingTotal || 5,
      total: orderData.total || 0,
      status: "on_the_way",
      address: orderData.address || "King Fahd Road, Al Olaya, Riyadh",
      shop: "Warda Luxury Boutique",
      recipientName: orderData.recipientName || "My Loved One",
      giftMessage: orderData.giftMessage || "Enjoy your special surprise 🌹",
      isAnonymous: orderData.isAnonymous || false,
      paymentMethod: orderData.paymentMethod || "Credit Card",
      createdAt: new Date().toISOString(),
      deliveryTimeSlot: orderData.deliveryTimeSlot || "Today (Express 1-Hour)",
      driver: {
        name: "Ahmed Al-Otaibi",
        phone: "+966 50 123 4567",
        plate: "KSA 4821",
        rating: 4.9,
        vehicle: "White Lexus ES",
      },
    };

    try {
      await ordersAPI.createOrder(newOrder);
    } catch (e) {
      console.log("Failed to sync order to backend:", e);
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
      o.id === id ? { ...o, status: "cancelled" as const } : o
    );
    saveOrders(updated);
  };

  const addOrderReview = (orderId: string, rating: number, tags: string[], comment?: string) => {
    const updated = orders.map((o) =>
      o.id === orderId
        ? { ...o, review: { rating, tags, comment }, status: "delivered" as const }
        : o
    );
    saveOrders(updated);
  };

  const addReview = (orderId: string, rating: number, comment?: string, tags?: string[]) => {
    addOrderReview(orderId, rating, tags || ["Luxury Gift", "Fast Delivery"], comment);
  };

  const activeOrder = orders.find((o) => o.status === "on_the_way" || o.status === "preparing" || o.status === "confirmed") || null;
  const deliveredOrders = orders.filter((o) => o.status === "delivered" || o.status === "cancelled");

  return (
    <OrdersContext.Provider
      value={{
        orders,
        activeOrder,
        deliveredOrders,
        getOrder,
        placeOrder,
        createOrder: placeOrder,
        cancelOrder,
        addOrderReview,
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
