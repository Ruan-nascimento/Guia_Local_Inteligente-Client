import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { api } from "@/lib/axios";

export interface Favorite {
  id: string;
  placeId: string;
  name: string;
  category: string;
  description: string | null;
  rating: number | null;
  hours: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
}

interface AddFavoritePayload {
  placeId: string;
  name: string;
  category: string;
  description?: string | null;
  rating?: number | null;
  hours?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface FavoritesContextType {
  favorites: Favorite[];
  isLoading: boolean;
  add: (payload: AddFavoritePayload) => Promise<Favorite>;
  remove: (placeId: string) => Promise<void>;
  isFavorite: (placeId: string) => boolean;
  refresh: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const list = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Favorite[]>("/api/favorites");
      setFavorites(response.data);
    } catch {
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const add = useCallback(async (payload: AddFavoritePayload) => {
    const response = await api.post<Favorite>("/api/favorites", payload);
    setFavorites((prev) => [response.data, ...prev]);
    return response.data;
  }, []);

  const remove = useCallback(async (placeId: string) => {
    await api.delete(`/api/favorites/${placeId}`);
    setFavorites((prev) => prev.filter((f) => f.placeId !== placeId));
  }, []);

  const isFavorite = useCallback(
    (placeId: string) => {
      return favorites.some((f) => f.placeId === placeId);
    },
    [favorites]
  );

  useEffect(() => {
    list();
  }, [list]);

  return (
    <FavoritesContext.Provider value={{ favorites, isLoading, add, remove, isFavorite, refresh: list }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
