import type { CardCityNameAndCEPProps } from "@/interfaces/cardCity.interface"
import { MapPin } from "lucide-react"



export const CardCityNameAndCEP = ({ localidade, uf, cep }: CardCityNameAndCEPProps) => {
    return (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <MapPin className="text-emerald-400" />
            </div>

            <div>
                <h2 className="text-xl font-bold">
                    {localidade}, {uf}
                </h2>

                <p className="text-emerald-400 text-sm font-semibold">
                    <b className="text-white">CEP:</b> {cep}
                </p>
            </div>
        </div>
    )
}