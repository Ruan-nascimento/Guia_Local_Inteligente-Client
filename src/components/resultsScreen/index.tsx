import { Clock, CloudSun, Heart, MapPin, Star } from "lucide-react";

export function ResultScreen({
    address,
    weather,
    category,
    setCategory,
    filteredPlaces,
}: any) {
    return (
        <section className="space-y-4 animate-[fadeIn_0.3s_ease]">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <MapPin className="text-emerald-400" />
                </div>

                <div>
                    <h2 className="text-xl font-bold">
                        {address.localidade}, {address.uf}
                    </h2>

                    <p className="text-emerald-400 text-sm font-semibold">
                        CEP {address.cep}
                    </p>
                </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                <h3 className="text-emerald-400 font-bold mb-4">
                    Endereço encontrado
                </h3>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-slate-400">Logradouro</p>
                        <p>{address.logradouro || "Não informado"}</p>
                    </div>

                    <div>
                        <p className="text-slate-400">Bairro</p>
                        <p>{address.bairro || "Não informado"}</p>
                    </div>

                    <div>
                        <p className="text-slate-400">Cidade/UF</p>
                        <p>
                            {address.localidade}, {address.uf}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400">CEP</p>
                        <p>{address.cep}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex justify-between items-center">
                <div>
                    <h3 className="text-emerald-400 font-bold mb-4">
                        Clima agora
                    </h3>

                    <div className="flex items-center gap-3">
                        <CloudSun className="text-emerald-400" size={36} />

                        <div>
                            <p className="text-3xl font-bold">
                                {weather.temperature}°C
                            </p>

                            <p className="text-slate-400 text-sm">
                                {weather.condition}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-sm border-l border-slate-700 pl-5">
                    <p className="text-slate-400">Máxima</p>
                    <p className="font-bold">{weather.max}°C</p>

                    <p className="text-slate-400 mt-2">Mínima</p>
                    <p className="font-bold">{weather.min}°C</p>
                </div>
            </div>

            <h2 className="text-xl font-bold">Explore locais úteis</h2>

            <div className="flex gap-2 overflow-x-auto sem-scrollbar pb-1">
                {["Todos", "Mercado", "Farmácia", "Escola", "Hospital", "Turismo"].map(
                    (item) => (
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

            <div className="space-y-3">
                {filteredPlaces.map((place: any) => (
                    <div
                        key={place.id}
                        className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex items-center gap-4"
                    >
                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                            <MapPin className="text-emerald-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold truncate">{place.name}</h3>

                            <p className="text-emerald-400 text-sm">
                                {place.category}
                            </p>

                            <p className="text-slate-400 text-xs truncate">
                                {place.description}
                            </p>
                        </div>

                        <div className="text-xs text-slate-400 shrink-0">
                            <p className="flex items-center gap-1">
                                <Star size={14} className="text-emerald-400" />
                                {place.rating}
                            </p>

                            <p className="flex items-center gap-1 mt-2">
                                <Clock size={14} />
                                {place.hours}
                            </p>
                        </div>

                        <Heart className="text-slate-400 shrink-0" />
                    </div>
                ))}
            </div>

            <p className="text-center text-xs text-slate-500">
                Locais simulados para fins acadêmicos
            </p>
        </section>
    );
}