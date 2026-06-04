import { useState, useCallback } from "react";
import { api } from "@/lib/axios";

export interface AddressData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface WeatherData {
  temperature: number;
  max: number;
  min: number;
  condition: string;
}

export interface Place {
  id: number;
  name: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
  rating: number | null;
  hours: string;
}

export interface SearchResult {
  address: AddressData;
  weather: WeatherData;
  places: Place[];
}

type SearchState = "idle" | "loading" | "success" | "error";

export function useSearch() {
  const [data, setData] = useState<SearchResult | null>(null);
  const [error, setError] = useState("");
  const [screenState, setScreenState] = useState<SearchState>("idle");

  const search = useCallback(async (cep: string) => {
    try {
      setScreenState("loading");
      setError("");
      setData(null);

      const response = await api.get<SearchResult>(`/api/search/${cep}`);

      setData(response.data);

      setTimeout(() => {
        setScreenState("success");
      }, 700);
    } catch (err) {
      let message = "Não foi possível encontrar essa região.";

      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        message = axiosErr.response?.data?.message || message;
      }

      setError(message);

      setTimeout(() => {
        setScreenState("error");
      }, 700);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError("");
    setScreenState("idle");
  }, []);

  return {
    data,
    error,
    screenState,
    setScreenState,
    search,
    reset,
  };
}
