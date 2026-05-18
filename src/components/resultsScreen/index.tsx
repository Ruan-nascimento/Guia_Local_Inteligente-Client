import { CardCityNameAndCEP } from "../cardCityNameAndCEP";
import { AddressInformations } from "../addresInformations";
import { WeatherCondition } from "../weatherCondition";
import { LocalsPerRegion } from "../localsPerRegion";
import type { AddressData } from "@/interfaces/cepService.interface";
import type { WeatherData } from "@/interfaces/weatherService.interface";
import type { LocalsPerRegionProps } from "@/interfaces/localsPerRegion.interface";

export interface ResultScreenProps {
    address: AddressData;
    weather: WeatherData;
    category: string;
    setCategory: (category: string) => void;
    filteredPlaces: LocalsPerRegionProps[];
}

export function ResultScreen({
    address,
    weather,
    category,
    setCategory,
    filteredPlaces,
}: ResultScreenProps) {
    return (
        <section className="space-y-4 animate-[fadeIn_0.3s_ease]">

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
                        className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition ${category === item
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-900 text-slate-300 border border-slate-800"
                            }`}
                    >
                        {item}
                    </button>
                )
                )}
            </div>

            <LocalsPerRegion
                filteredPlaces={filteredPlaces}
            />

            <p className="text-center text-xs text-slate-500">
                Locais obtidos por dados públicos do OpenStreetMap. Algumas informações podem estar incompletas.
            </p>
        </section>
    );
}