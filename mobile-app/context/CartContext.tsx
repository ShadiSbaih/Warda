import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartAPI, couponsAPI } from "../services/api";

export interface CartItem {
  id: string; // unique cart item id (e.g. productId-wrapping)
  productId: number;
  title: string;
  price: number;
  image: any;
  quantity: number;
  wrappingColor?: string;
  wrappingName?: string;
  giftMessage?: string;
  recipientName?: string;
  isAnonymous?: boolean;
  category?: string;
}

interface PromoCode {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  description: string;
}

const VALID_PROMOS: Record<string, PromoCode> = {
  WARDA20: { code: "WARDA20", discountPercent: 0.2, description: "20% off entire order" },
  WELCOME: { code: "WELCOME", discountFixed: 15, description: "$15 off welcome discount" },
  VIP50: { code: "VIP50", discountPercent: 0.5, description: "VIP 50% discount" },
  GIFT10: { code: "GIFT10", discountFixed: 10, description: "$10 off gift delivery" },
};

interface CartContextType {
  items: CartItem[];
  itemsCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  wrappingTotal: number;
  total: number;
  appliedPromo: PromoCode | null;
  addToCart: (product: any, quantity?: number, options?: Partial<CartItem>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => Promise<{ success: boolean; message: string }>;
  removePromo: () => void;
}

const CART_STORAGE_KEY = "@warda_cart_v1";

const initialCartItems: CartItem[] = [];

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
          }
        }
      } catch (e) {
        console.log("Error loading cart:", e);
      }
    })();
  }, []);

  // Save to storage and sync to backend
  const saveCart = async (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
      // Fire-and-forget sync to backend
      cartAPI.syncCart(newItems).catch(() => {});
    } catch (e) {
      console.log("Error saving cart:", e);
    }
  };

  const addToCart = (product: any, quantity = 1, options: Partial<CartItem> = {}) => {
    const rawPrice = typeof product.price === "string" 
      ? parseFloat(product.price.replace("$", "")) 
      : (product.price || 50);
    
    const wrappingColor = options.wrappingColor || (product.wrappingColors ? product.wrappingColors[0] : "#E53935");
    const cartItemId = `${product.id}-${wrappingColor}-${options.recipientName || "default"}`;

    const existingIndex = items.findIndex((i) => i.id === cartItemId);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = [...items];
      updated[existingIndex].quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        title: product.name || product.title || "Luxury Gift",
        price: rawPrice,
        image: product.image || require("../assets/gifts/red-roses.png"),
        quantity,
        wrappingColor,
        wrappingName: options.wrappingName || "Luxury Silk",
        giftMessage: options.giftMessage || "A special gift just for you 🎁",
        recipientName: options.recipientName || "My Loved One",
        isAnonymous: options.isAnonymous || false,
        category: product.category || "Gifts",
      };
      updated = [newItem, ...items];
    }

    saveCart(updated);
  };

  const removeFromCart = (cartItemId: string) => {
    const updated = items.filter((item) => item.id !== cartItemId);
    saveCart(updated);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const updated = items.map((item) =>
      item.id === cartItemId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const applyPromo = async (code: string) => {
    const normalized = code.trim().toUpperCase();
    
    try {
      const res = await couponsAPI.validateCoupon(normalized);
      if (res.success && res.data) {
        setAppliedPromo(res.data);
        return { success: true, message: `Promo '${res.data.code}' applied successfully!` };
      }
    } catch (e) {
      console.log("Coupon validation error:", e);
    }

    // Fallback to local hardcoded promos if API fails
    const promo = VALID_PROMOS[normalized];
    if (promo) {
      setAppliedPromo(promo);
      return { success: true, message: `Promo '${promo.code}' applied successfully!` };
    }
    return { success: false, message: "Invalid promo code. Try WARDA20 or WELCOME" };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Calculations
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const wrappingTotal = items.length > 0 ? 5 : 0; // Flat gift wrapping service
  const deliveryFee = subtotal > 150 || items.length === 0 ? 0 : 10;

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discount = subtotal * appliedPromo.discountPercent;
    } else if (appliedPromo.discountFixed) {
      discount = Math.min(subtotal, appliedPromo.discountFixed);
    }
  }

  const total = Math.max(0, subtotal + wrappingTotal + deliveryFee - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        itemsCount,
        subtotal,
        discount,
        deliveryFee,
        wrappingTotal,
        total,
        appliedPromo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
