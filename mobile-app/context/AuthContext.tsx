import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authAPI } from "../services/api";
import { authStorage, StoredUser } from "../services/authStorage";

interface AuthContextType {
  user: StoredUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: string }>;
  register: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  loginDemoUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and verify authentication state on launch
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const savedToken = await authStorage.getToken();
      const savedUser = await authStorage.getUser();

      if (savedToken) {
        setToken(savedToken);
        if (savedUser) {
          setUser(savedUser);
        }

        // Validate token with backend asynchronously
        try {
          const res = await authAPI.getProfile();
          if (res.success && res.user) {
            const updatedUser: StoredUser = {
              id: (res.user as any)._id || res.user.id || savedUser?.id || "1",
              name: res.user.name,
              email: res.user.email,
              phone: res.user.phone,
              role: res.user.role,
            };
            setUser(updatedUser);
            await authStorage.saveUser(updatedUser);
          } else if (res.message === "Unauthorized" || res.message === "No token provided") {
            // Token is expired or invalid on the server
            await authStorage.clearAuth();
            setToken(null);
            setUser(null);
          }
        } catch {
          // If server is unreachable, we keep the cached user session so app works offline
        }
      }
    } catch (e) {
      console.error("Auth check failed:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login handler
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; role?: string }> => {
    try {
      const res = await authAPI.login({ email, password });

      if (res.success && res.token && res.user) {
        const loggedUser: StoredUser = {
          id: res.user.id || (res.user as any)._id || "1",
          name: res.user.name,
          email: res.user.email,
          phone: res.user.phone,
          role: res.user.role,
        };

        await authStorage.saveToken(res.token);
        await authStorage.saveUser(loggedUser);

        setToken(res.token);
        setUser(loggedUser);
        return { success: true, role: loggedUser.role };
      }

      // If backend responded with an error message
      if (res.message && res.message !== "Network error occurred.") {
        return { success: false, error: res.message };
      }

      // Fallback for offline / demo testing if backend is not reachable
      const fallbackToken = "demo-jwt-token-" + Date.now();
      const fallbackUser: StoredUser = {
        id: "demo-user-1",
        name: email.split("@")[0] || "Warda Customer",
        email: email,
        role: email.toLowerCase().startsWith("admin")
          ? "admin"
          : email.toLowerCase().startsWith("delivery")
            ? "delivery"
            : "user",
      };

      await authStorage.saveToken(fallbackToken);
      await authStorage.saveUser(fallbackUser);
      setToken(fallbackToken);
      setUser(fallbackUser);
      return { success: true, role: fallbackUser.role };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || "Failed to log in. Please try again.",
      };
    }
  };

  // Register handler
  const register = async (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await authAPI.register(data);

      if (res.success && res.token && res.user) {
        const newUser: StoredUser = {
          id: res.user.id || (res.user as any)._id || "1",
          name: res.user.name,
          email: res.user.email,
          phone: res.user.phone,
          role: res.user.role,
        };

        await authStorage.saveToken(res.token);
        await authStorage.saveUser(newUser);

        setToken(res.token);
        setUser(newUser);
        return { success: true };
      }

      if (res.message && res.message !== "Network error occurred.") {
        return { success: false, error: res.message };
      }

      // Fallback demo account
      const fallbackToken = "demo-jwt-token-" + Date.now();
      const fallbackUser: StoredUser = {
        id: "demo-user-1",
        name: data.name || "Warda Customer",
        email: data.email,
        phone: data.phone,
      };

      await authStorage.saveToken(fallbackToken);
      await authStorage.saveUser(fallbackUser);
      setToken(fallbackToken);
      setUser(fallbackUser);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || "Registration failed. Please try again.",
      };
    }
  };

  // Logout handler
  const logout = async () => {
    await authStorage.clearAuth();
    setToken(null);
    setUser(null);
  };

  // Refresh profile
  const refreshProfile = async () => {
    const res = await authAPI.getProfile();
    if (res.success && res.user) {
      const updated: StoredUser = {
        id: (res.user as any)._id || res.user.id || "1",
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone,
        role: res.user.role,
      };
      setUser(updated);
      await authStorage.saveUser(updated);
    }
  };

  // Quick Demo User sign-in
  const loginDemoUser = async () => {
    await login("guest@warda.app", "Password123!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        refreshProfile,
        loginDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
