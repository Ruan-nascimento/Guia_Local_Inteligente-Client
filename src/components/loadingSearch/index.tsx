import { LoadingDots } from "./loadingDots";

export function LoadingSearch() {
    return (
        <section className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Coluna da Esquerda (Simula CEP, endereço e clima) */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                    {/* Simula CardCityNameAndCEP */}
                    <div className="h-20 rounded-2xl bg-slate-900 border border-slate-800" />
                    
                    {/* Simula AddressInformations */}
                    <div className="h-44 rounded-2xl bg-slate-900 border border-slate-800" />

                    {/* Simula WeatherCondition */}
                    <div className="h-32 rounded-2xl bg-slate-900 border border-slate-800" />
                </div>

                {/* Coluna da Direita (Simula busca de locais úteis e feed) */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                    {/* Título "Explore locais úteis" */}
                    <div className="h-7 w-48 rounded-lg bg-slate-800" />

                    {/* Chips de Categorias */}
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        <div className="h-9 w-16 shrink-0 rounded-xl bg-slate-900 border border-slate-800" />
                        <div className="h-9 w-24 shrink-0 rounded-xl bg-slate-900 border border-slate-800" />
                        <div className="h-9 w-20 shrink-0 rounded-xl bg-slate-900 border border-slate-800" />
                        <div className="h-9 w-24 shrink-0 rounded-xl bg-slate-900 border border-slate-800" />
                        <div className="h-9 w-24 shrink-0 rounded-xl bg-slate-900 border border-slate-800" />
                    </div>

                    {/* Grid de locais (LocalsPerRegion) */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                        <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                        <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                        <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                    </div>
                </div>
            </div>

            <LoadingDots />
        </section>
    );
}