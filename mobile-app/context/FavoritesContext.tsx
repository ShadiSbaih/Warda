import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { favoritesAPI } from "../services/api";

export interface FavoriteProduct {
  id: number;
  name?: string;
  title?: string;
  price: string | number;
  image: any;
  rating?: string | number;
  time?: string;
  category?: string;
}

interface FavoritesContextType {
  favorites: FavoriteProduct[];
  favoritesCount: number;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (product: any) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
}

const FAVORITES_STORAGE_KEY = "@warda_favorites_v1";

const initialFavorites: FavoriteProduct[] = [
  {
    id: 1,
    title: "Red Roses Bouquet",
    name: "Red Roses Bouquet",
    image: require("../assets/gifts/red-roses.png"),
    rating: "4.9",
    time: "60 mins",
    price: "85",
    category: "Rose Bouquets",
  },
  {
    id: 3,
    title: "White Roses Bouquet",
    name: "White Roses Bouquet",
    image: require("../assets/gifts/white-roses.png"),
    rating: "4.7",
    time: "60 mins",
    price: "95",
    category: "Rose Bouquets",
  },
];

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>(initialFavorites);

  useEffect(() => {
    (async () => {
      try {
        const res = await favoritesAPI.getFavorites();
        if (res.success && res.data) {
          setFavorites(res.data);
        } else {
          const saved = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setFavorites(parsed);
            }
          }
        }
      } catch (e) {
        console.log("Error loading favorites:", e);
      }
    })();
  }, []);

  const saveFavorites = async (list: FavoriteProduct[]) => {
    setFavorites(list);
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.log("Error saving favorites:", e);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  const toggleFavorite = (product: any) => {
    const id = product.id;
    if (isFavorite(id)) {
      const updated = favorites.filter((item) => item.id !== id);
      saveFavorites(updated);
    } else {
      const newFav: FavoriteProduct = {
        id: product.id,
        title: product.title || product.name || "Gift Item",
        name: product.name || product.title || "Gift Item",
        price: product.price || "85",
        image: product.image || require("../assets/gifts/red-roses.png"),
        rating: product.rating || "4.9",
        time: product.time || "45 mins",
        category: product.category || "Rose Bouquets",
      };
      saveFavorites([newFav, ...favorites]);
    }
    
    // Sync with backend
    favoritesAPI.toggleFavorite(id).catch(() => {});
  };

  const removeFavorite = (id: number) => {
    saveFavorites(favorites.filter((item) => item.id !== id));
  };

  const clearFavorites = () => {
    saveFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
