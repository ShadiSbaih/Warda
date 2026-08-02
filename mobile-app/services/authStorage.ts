import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@warda_auth_token";
const USER_KEY = "@warda_auth_user";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

export const authStorage = {
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error("Error saving auth token:", e);
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
      console.error("Error getting auth token:", e);
      return null;
    }
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error("Error removing auth token:", e);
    }
  },

  async saveUser(user: StoredUser): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Error saving user:", e);
    }
  },

  async getUser(): Promise<StoredUser | null> {
    try {
      const data = await AsyncStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error getting user:", e);
      return null;
    }
  },

  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error("Error removing user:", e);
    }
  },

  async clearAuth(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    } catch (e) {
      console.error("Error clearing auth:", e);
    }
  },
};
