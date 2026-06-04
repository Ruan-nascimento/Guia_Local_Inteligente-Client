import { DefaultScreen } from "@/components/defaultScreen";
import { ErrorScreen } from "@/components/errorScreen";
import { Header } from "@/components/header";
import { LoadingSearch } from "@/components/loadingSearch";
import { ResultScreen } from "@/components/resultsScreen";
import { useSearch } from "@/hooks/useSearch";
import { useAuth } from "@/providers/AuthProvider";
import { addRecentCep } from "@/utils/addRecentCep";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export const InicioPage = () => {
    const [cep, setCep] = useState("");
    const [category, setCategory] = useState("Todos");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth();
    const { data, error, screenState, setScreenState, search, reset } = useSearch();

    async function handleSearch(searchCep?: string | unknown) {
        const targetCep = typeof searchCep === "string" ? searchCep : cep;

        if (!user) {
            navigate("/login", { replace: true });
            return;
        }

        setLoading(true);

        await search(targetCep);

        addRecentCep(targetCep);

        setLoading(false);
    }

    function handleReset() {
        setCep("");
        setCategory("Todos");
        reset();
    }

    const places = data?.places ?? [];

    const filteredPlaces =
        category === "Todos"
            ? places
            : places.filter((place) => place.category === category);

    return (
        <div className="min-h-dvh w-screen bg-[#020617] text-white">
            <Header setScreenState={setScreenState} />

            <main className="p-6 pb-28 md:pb-12 max-w-5xl mx-auto w-full">
                {screenState === "idle" && (<DefaultScreen
                    cep={cep}
                    setCep={setCep}
                    onSearch={handleSearch}
                    loading={loading}
                />)}

                {screenState === "loading" && <LoadingSearch />}

                {screenState === "success" && data?.address && data?.weather && (
                    <ResultScreen
                        address={data.address}
                        weather={data.weather}
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