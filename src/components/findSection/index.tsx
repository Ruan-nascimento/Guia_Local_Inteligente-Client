import type { FindSectionProps } from "@/interfaces/findSection.interface";


export function FindSection({
    cep,
    setCep,
    onSearch,
    loading,
}: FindSectionProps) {
    return (
        <section>
            <h1 className="text-4xl font-bold leading-tight">
                Encontre informações{" "}
                <span className="text-emerald-400">úteis</span> de uma região
            </h1>

            <p className="mt-4 text-slate-400">
                Pesquise por CEP ou cidade e obtenha dados essenciais da região desejada.
            </p>

            <div className="mt-6 flex flex-col md:flex-row md:items-stretch gap-3">
                <div className="flex-1 rounded-2xl bg-slate-900 border border-slate-700 px-4 py-4 flex items-center">
                    <input
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        placeholder="Ex: 57000-000 ou Maceió"
                        className="w-full bg-transparent outline-none text-white placeholder:text-slate-500"
                    />
                </div>

                <button
                    onClick={() => onSearch()}
                    disabled={loading}
                    className="w-full md:w-auto md:px-8 rounded-2xl bg-emerald-500 py-4 font-bold text-white disabled:opacity-60 shrink-0 cursor-pointer duration-200 hover:bg-emerald-600 active:scale-[0.98]"
                >
                    {loading ? "Buscando..." : "Buscar região"}
                </button>
            </div>
        </section>
    );
}