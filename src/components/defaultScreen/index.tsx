import type { DefaultScreenProps } from "@/interfaces/defaultScreen.interface";
import { CardSimple } from "../cardSimple";
import { FindSection } from "../findSection";
import { Examples } from "../examples";



export const DefaultScreen = ({
    cep,
    setCep,
    onSearch,
    loading,
}: DefaultScreenProps) => {

    const recentCeps: string[] = localStorage.getItem("recentCeps")
        ? JSON.parse(localStorage.getItem("recentCeps")!)
        : [];

    let cepsFormated: string[] = [];

    recentCeps.forEach((cep) => {
        const apenasNumeros = cep.replace(/\D/g, "");
        const formatedCep = apenasNumeros.replace(/(\d{5})(\d{3})/, "$1-$2");
        if (!cepsFormated.includes(formatedCep)) {
            cepsFormated.push(formatedCep);
        }
    });

    const typedNumbers = cep.replace(/\D/g, "");

    const filteredCeps = cepsFormated.filter(savedCep => {
        if (!typedNumbers) return true;
        
        const savedNumbers = savedCep.replace(/\D/g, "");
        return savedNumbers.includes(typedNumbers);
    });

    return (
        <>
            <FindSection
                cep={cep}
                setCep={setCep}
                onSearch={onSearch}
                loading={loading}
            />

            <section className="mt-8">
                <div className="flex gap-2 overflow-auto sem-scrollbar mb-4">
                    {
                        filteredCeps.map((filteredCep) => (
                            <button
                                key={filteredCep}
                                onClick={() => {
                                    setCep(filteredCep);
                                    onSearch(filteredCep);
                                }}
                            >
                                <Examples children={filteredCep} />
                            </button>
                        ))
                    }
                </div>

                <div className="flex flex-nowrap items-stretch justify-between gap-2 sm:gap-4 overflow-x-auto pb-2">
                    <CardSimple typer="endereco" />
                    <CardSimple typer="clima" />
                    <CardSimple typer="local" />
                </div>
            </section>
        </>
    );
}