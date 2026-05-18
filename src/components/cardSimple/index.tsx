import { MapPin, CloudSun, Store } from "lucide-react"

export const CardSimple = ({ typer }: { typer: "endereco" | "clima" | "local" }) => {
    return (
        <div className="bg-[#0f141e] border border-gray-800/60 rounded-xl p-4 gap-2 flex flex-col w-full flex-1 min-w-[100px] items-center text-center transition-all duration-300 hover:bg-[#151c28] hover:border-emerald-900/50 shadow-lg shadow-black/20">
            {
                typer === "endereco" ? (
                    <>
                        <span className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-1 shrink-0">
                            <MapPin size={22} className="text-emerald-500" />
                        </span>
                        <h3 className="text-sm font-semibold text-white tracking-wide">Endereço</h3>
                        <p className="text-[10px] sm:text-xs font-light text-gray-400 leading-relaxed">
                            Veja CEP, bairro, cidade e estado da região.
                        </p>
                    </>
                ) :
                    typer === "clima" ? (
                        <>
                            <span className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-1 shrink-0">
                                <CloudSun size={22} className="text-emerald-500" />
                            </span>
                            <h3 className="text-sm font-semibold text-white tracking-wide">Clima</h3>
                            <p className="text-[10px] sm:text-xs font-light text-gray-400 leading-relaxed">
                                Confira a previsão do tempo atual e futura.
                            </p>
                        </>
                    )
                        :
                        typer === "local" ? (
                            <>
                                <span className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-1 shrink-0">
                                    <Store size={22} className="text-emerald-500" />
                                </span>
                                <h3 className="text-sm font-semibold text-white tracking-wide">Locais úteis</h3>
                                <p className="text-[10px] sm:text-xs font-light text-gray-400 leading-relaxed">
                                    Encontre serviços, comércios e muito mais.
                                </p>
                            </>
                        ) :
                            null
            }
        </div>
    )
}
