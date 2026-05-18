import { CardSimple } from "@/components/cardSimple";
import { ErrorScreen } from "@/components/errorScreen";
import { FindSection } from "@/components/findSection";
import { Header } from "@/components/header";
import { LoadingSearch } from "@/components/loadingSearch";
import { ResultScreen } from "@/components/resultsScreen";
import { placesMock } from "@/data/places";
import { getAddressByCep } from "@/services/cepService";
import { getCoordinates } from "@/services/geoCodingService";
import { getWeather } from "@/services/weatherService";
import { useState } from "react";

type ScreenState = "idle" | "loading" | "success" | "error";

export const InicioPage = () => {
    const [cep, setCep] = useState("");
    const [screenState, setScreenState] = useState<ScreenState>("idle");

    const [address, setAddress] = useState<any>(null);
    const [weather, setWeather] = useState<any>(null);
    const [places, setPlaces] = useState(placesMock);

    const [category, setCategory] = useState("Todos");
    const [error, setError] = useState("");

    async function handleSearch() {
        try {
            setScreenState("loading");
            setError("");
            setAddress(null);
            setWeather(null);

            const addressData = await getAddressByCep(cep);

            const coords = await getCoordinates(addressData.localidade);

            const weatherData = await getWeather(
                coords.latitude,
                coords.longitude
            );

            setAddress(addressData);
            setWeather(weatherData);
            setPlaces(placesMock);

            setTimeout(() => {
                setScreenState("success");
            }, 700);
        } catch (err: any) {
            setError(err.message || "Não foi possível encontrar essa região.");

            setTimeout(() => {
                setScreenState("error");
            }, 700);
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
            <Header />

            <main className="p-6 pb-28">
                {screenState === "idle" && (
                    <>
                        <FindSection
                            cep={cep}
                            setCep={setCep}
                            onSearch={handleSearch}
                            loading={false}
                        />

                        <section className="mt-8">
                            <div className="flex flex-nowrap items-stretch justify-between gap-2 sm:gap-4 overflow-x-auto pb-2">
                                <CardSimple typer="endereco" />
                                <CardSimple typer="clima" />
                                <CardSimple typer="local" />
                            </div>
                        </section>
                    </>
                )}

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