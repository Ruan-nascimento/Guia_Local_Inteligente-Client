import { CardCityNameAndCEP } from "../cardCityNameAndCEP";
import { AddressInformations } from "../addresInformations";
import { WeatherCondition } from "../weatherCondition";
import { LocalsPerRegion } from "../localsPerRegion";
import type { AddressData, WeatherData, Place } from "@/hooks/useSearch";

export interface ResultScreenProps {
    address: AddressData;
    weather: WeatherData;
    category: string;
    setCategory: (category: string) => void;
    filteredPlaces: Place[];
}

export function ResultScreen({
    address,
    weather,
    category,
    setCategory,
    filteredPlaces,
}: ResultScreenProps) {
    return (
        <section className="animate-[fadeIn_0.3s_ease] space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Coluna da Esquerda: Informações gerais */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-4 lg:sticky lg:top-6">
                    <CardCityNameAndCEP
                        localidade={address.localidade}
                        uf={address.uf}
                        cep={address.cep}
                    />

                    <AddressInformations
                        logradouro={address.logradouro}
                        bairro={address.bairro}
                        localidade={address.localidade}
                        uf={address.uf}
                        cep={address.cep}
                    />

                    <WeatherCondition
                        temperature={weather.temperature}
                        condition={weather.condition}
                        max={weather.max}
                        min={weather.min}
                    />
                </div>

                {/* Coluna da Direita: Locais recomendados */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                    <h2 className="text-xl font-bold">Explore locais úteis</h2>

                    <div className="flex gap-2 overflow-x-auto sem-scrollbar pb-1">
                        {[
                            "Todos",
                            "Restaurante",
                            "Mercado",
                            "Farmácia",
                            "Hospital",
                            "Escola",
                            "Banco",
                            "Padaria",
                            "Academia",
                            "Turismo",
                        ].map((item) => (
                            <button
                                key={item}
                                onClick={() => setCategory(item)}
                                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition cursor-pointer ${
                                    category === item
                                        ? "bg-emerald-500 text-white"
                                        : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <LocalsPerRegion
                        filteredPlaces={filteredPlaces}
                    />
                </div>
            </div>

            <p className="text-center text-xs text-slate-500 pt-4 border-t border-slate-800/40">
                Locais obtidos por dados públicos do OpenStreetMap. Algumas informações podem estar incompletas.
            </p>
        </section>
    );
}