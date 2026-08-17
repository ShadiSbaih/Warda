import Constants from "expo-constants";
import { Platform } from "react-native";
import { authStorage, StoredUser } from "./authStorage";

// Determine base API URL according to environment
const getBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // Attempt to resolve host from Expo dev server
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants as any).manifest2?.extra?.expoClient?.hostUri;

  if (hostUri) {
    const host = hostUri.split(":")[0];
    return `http://${host}:3000/api`;
  }

  // Android Emulator default loopback
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000/api";
  }

  // iOS simulator / Web default
  return "http://localhost:3000/api";
};

export const API_BASE_URL = getBaseUrl();

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: StoredUser;
  [key: string]: any;
}

export async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = await authStorage.getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Request failed with status ${response.status}`,
      };
    }

    return data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      return {
        success: false,
        message: "Request timed out. Using offline cache.",
      };
    }
    return {
      success: false,
      message: error.message || "Network error occurred.",
    };
  }
}

// 1. Authentication API
export const authAPI = {
  async register(body: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  async login(body: { email: string; password: string }) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  async getProfile() {
    return request("/auth/profile", {
      method: "GET",
    });
  },

  async updateProfile(body: Partial<StoredUser>) {
    return request("/profile/update", {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  async forgotPassword(body: { email: string }) {
    return request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};

// 2. Products & Catalog API
export const productsAPI = {
  async getProducts(params?: { category?: string; search?: string }) {
    const query = params ? `?category=${params.category || ""}&search=${params.search || ""}` : "";
    return request(`/products${query}`, { method: "GET" });
  },

  async getProductById(id: string | number) {
    return request(`/products/${id}`, { method: "GET" });
  },

  async getCategories() {
    return request("/categories", { method: "GET" });
  },

  async createProduct(productData: any) {
    return request("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },

  async updateProduct(id: string, productData: any) {
    return request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  },

  async deleteProduct(id: string | number) {
    return request(`/products/${id}`, { method: "DELETE" });
  },
};

// 2.5 Shops API
export const shopsAPI = {
  async getShops() {
    return request("/shops", { method: "GET" });
  },
};

// 2.8 Admin API
export const adminAPI = {
  async getDashboard() {
    return request("/admin/dashboard", { method: "GET" });
  },
  async getUsers() {
    return request("/users", { method: "GET" });
  },
  async createUser(data: { name: string; email: string; phone?: string; password: string; role: string }) {
    return request("/users", { method: "POST", body: JSON.stringify(data) });
  },
  async updateUser(id: string, data: { name?: string; email?: string; phone?: string; role?: string }) {
    return request(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) });
  },
  async updateUserRole(id: string, role: string) {
    return request(`/users/${id}/role`, { 
      method: "PUT",
      body: JSON.stringify({ role })
    });
  },
  async deleteUser(id: string) {
    return request(`/users/${id}`, { method: "DELETE" });
  },
  async updateOrderStatus(id: string, status: string) {
    return request(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
  },
  async updateOrderPaymentStatus(id: string, paymentStatus: string) {
    return request(`/orders/${id}/payment`, {
      method: "PATCH",
      body: JSON.stringify({ paymentStatus })
    });
  },
  async getAllOrders() {
    return request("/orders/all", { method: "GET" });
  },
  async getCategories() {
    return request("/categories", { method: "GET" });
  },
  async createCategory(data: { name: string, image: string }) {
    return request("/categories", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },
  async updateCategory(id: string, data: { name: string, image: string }) {
    return request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  async deleteCategory(id: string) {
    return request(`/categories/${id}`, { method: "DELETE" });
  }
};

// 3. Orders API
export const ordersAPI = {
  async getOrders() {
    return request("/orders", { method: "GET" });
  },

  async getOrderById(id: string) {
    return request(`/orders/${id}`, { method: "GET" });
  },

  async createOrder(orderData: any) {
    return request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  async cancelOrder(id: string) {
    return request(`/orders/${id}/cancel`, {
      method: "PATCH",
    });
  },
};

// Delivery workspace API
export const deliveryAPI = {
  async getOrders() {
    return request("/orders/delivery", { method: "GET" });
  },

  async updateStatus(id: string, status: string, note?: string) {
    return request(`/orders/${id}/delivery-status`, {
      method: "PATCH",
      body: JSON.stringify({ status, note }),
    });
  },
};

// 3.5 Tracking API
export const trackingAPI = {
  async getDriverLocation(orderId: string) {
    return request(`/tracking/${orderId}/location`, { method: "GET" });
  },

  async updateDriverLocation(orderId: string, lat: number, lng: number) {
    return request(`/tracking/${orderId}/location`, {
      method: "PUT",
      body: JSON.stringify({ lat, lng }),
    });
  },
};

// 4. Cart API
export const cartAPI = {
  async getCart() {
    return request("/cart", { method: "GET" });
  },

  async syncCart(items: any[]) {
    return request("/cart/sync", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
  },

  async addToCart(productId: string | number, quantity: number, options?: any) {
    return request("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity, ...options }),
    });
  },
};

// 5. Reminders API
export const remindersAPI = {
  async getReminders() {
    return request("/reminders", { method: "GET" });
  },

  async createReminder(reminder: any) {
    return request("/reminders", {
      method: "POST",
      body: JSON.stringify(reminder),
    });
  },

  async deleteReminder(id: string | number) {
    return request(`/reminders/${id}`, { method: "DELETE" });
  },
};

// 6. Reviews API
export const reviewsAPI = {
  async submitReview(reviewData: { orderId: string; rating: number; tags?: string[]; comment?: string }) {
    return request("/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
    });
  },
};

// 7. Coupons API
export const couponsAPI = {
  async validateCoupon(code: string) {
    return request(`/coupons/validate?code=${encodeURIComponent(code)}`, {
      method: "GET",
    });
  },
};

// 8. Chat API
export const chatAPI = {
  async getMessages(orderId: string) {
    return request(`/chat/${orderId}`, { method: "GET" });
  },

  async sendMessage(orderId: string, message: string) {
    return request(`/chat/${orderId}`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
};

// 9. Favorites API
export const favoritesAPI = {
  async getFavorites() {
    return request("/favorites", { method: "GET" });
  },

  async toggleFavorite(productId: string | number) {
    return request(`/favorites/${productId}/toggle`, {
      method: "POST",
    });
  },
};
