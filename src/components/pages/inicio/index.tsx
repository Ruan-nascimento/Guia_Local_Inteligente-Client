import { DefaultScreen } from "@/components/defaultScreen";
import { ErrorScreen } from "@/components/errorScreen";
import { Header } from "@/components/header";
import { LoadingSearch } from "@/components/loadingSearch";
import { ResultScreen } from "@/components/resultsScreen";
import { placesMock } from "@/data/places";
import type { AddressData } from "@/interfaces/cepService.interface";
import type { ScreenState } from "@/interfaces/screenState.interface";
import type { WeatherData } from "@/interfaces/weatherService.interface";
import { searchRegion } from "@/services/searchRegion";
import { addRecentCep } from "@/utils/addRecentCep";
import { useState } from "react";



export const InicioPage = () => {
    const [cep, setCep] = useState("");
    const [screenState, setScreenState] = useState<ScreenState>("idle");

    const [address, setAddress] = useState<AddressData | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [places, setPlaces] = useState(placesMock);
    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState("Todos");
    const [error, setError] = useState("");

    async function handleSearch(searchCep?: string | unknown) {
        const targetCep = typeof searchCep === "string" ? searchCep : cep;
        try {
            setScreenState("loading");
            setError("");
            setAddress(null);
            setWeather(null);
            setPlaces([]);
            setLoading(true);

            const result = await searchRegion(targetCep);

            setAddress(result.address);
            setWeather(result.weather);
            setPlaces(result.places);

            //função para adicionar o cep na lista de cep's recentes no localStorage
            addRecentCep(targetCep);

            setTimeout(() => {
                setScreenState("success");
            }, 700);
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Não foi possível encontrar essa região.";

            setError(message);

            setTimeout(() => {
                setScreenState("error");
            }, 700);
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setCep("");
        setAddress(null);
        setWeather(null);
        setError("");
        setCategory("Todos");
        setScreenState("idle");
    }

    const filteredPlaces =
        category === "Todos"
            ? places
            : places.filter((place) => place.category === category);

    return (
        <div className="min-h-dvh w-screen bg-[#020617] text-white">
            <Header setScreenState={setScreenState} />

            <main className="p-6 pb-28">
                {screenState === "idle" && (<DefaultScreen
                    cep={cep}
                    setCep={setCep}
                    onSearch={handleSearch}
                    loading={loading}
                />)}

                {screenState === "loading" && <LoadingSearch />}

                {screenState === "success" && address && weather && (
                    <ResultScreen
                        address={address}
                        weather={weather}
                        category={category}
                        setCategory={setCategory}
                        filteredPlaces={filteredPlaces}
                    />
                )}

                {screenState === "error" && (
                    <ErrorScreen
                        cep={cep}
                        setCep={setCep}
                        error={error}
                        onSearch={handleSearch}
                        onReset={handleReset}
                    />
                )}
            </main>

        </div>
    );
}