import type { AddressInformationsProps } from "@/interfaces/addressInformation"

export const AddressInformations = ({ logradouro, bairro, localidade, uf, cep }: AddressInformationsProps) => {
    return (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
            <h3 className="text-emerald-400 font-bold mb-4">
                Endereço encontrado
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-slate-400">Logradouro</p>
                    <p>{logradouro || "Não informado"}</p>
                </div>

                <div>
                    <p className="text-slate-400">Bairro</p>
                    <p>{bairro || "Não informado"}</p>
                </div>

                <div>
                    <p className="text-slate-400">Cidade/UF</p>
                    <p>
                        {localidade}, {uf}
                    </p>
                </div>

                <div>
                    <p className="text-slate-400">CEP</p>
                    <p>{cep}</p>
                </div>
            </div>
        </div>
    )
}