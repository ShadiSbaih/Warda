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

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: StoredUser;
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
    const timeoutId = setTimeout(() => controller.abort(), 8000);

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
        message: "Request timed out. Please check your connection.",
      };
    }
    return {
      success: false,
      message: error.message || "Network error occurred.",
    };
  }
}

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
};
