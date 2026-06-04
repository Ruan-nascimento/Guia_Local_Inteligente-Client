import { useState, useCallback, useEffect } from "react";
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

export function useFavorites() {
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

  return {
    favorites,
    isLoading,
    add,
    remove,
    isFavorite,
    refresh: list,
  };
}
