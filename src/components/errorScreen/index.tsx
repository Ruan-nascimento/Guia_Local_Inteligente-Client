import { AlertTriangle } from "lucide-react";

export function ErrorScreen({
    cep,
    setCep,
    error,
    onSearch,
    onReset,
}) {
    return (
        <section className="space-y-5 animate-[fadeIn_0.3s_ease]">
            <h1 className="text-3xl font-bold">Buscar região</h1>

            <div className="w-full rounded-2xl bg-slate-900 border border-slate-700 px-4 py-4 flex items-center gap-3">

                <input
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="Ex: 57940-000"
                    className="flex-1 bg-transparent outline-none text-white"
                />

                {cep && (
                    <button
                        onClick={() => setCep("")}
                        className="text-slate-400"
                    >
                        ×
                    </button>
                )}
            </div>

            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 flex gap-3">
                <AlertTriangle className="text-red-400 shrink-0" />

                <div>
                    <h3 className="text-red-400 font-bold">
                        Não foi possível encontrar essa região.
                    </h3>

                    <p className="text-slate-300 text-sm">
                        {error || "Verifique o CEP digitado e tente novamente."}
                    </p>
                </div>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <AlertTriangle className="text-emerald-400" size={42} />
                </div>

                <h2 className="text-2xl font-bold mb-3">
                    Não encontramos essa região
                </h2>

                <p className="text-slate-400 mb-8">
                    Verifique o CEP digitado e tente novamente.
                </p>

                <button
                    onClick={() => onSearch()}
                    className="w-full rounded-2xl bg-emerald-500 py-4 font-bold text-white"
                >
                    Tentar novamente
                </button>

                <button
                    onClick={onReset}
                    className="mt-4 w-full rounded-2xl border border-slate-700 py-4 font-bold text-emerald-400"
                >
                    Voltar
                </button>
            </div>
        </section>
    );
}