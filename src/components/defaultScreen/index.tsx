import { CardSimple } from "../cardSimple";
import { FindSection } from "../findSection";

interface DefaultScreenProps {
    cep: string;
    setCep: (value: string) => void;
    onSearch: () => void;
    loading: boolean;
}

export const DefaultScreen = ({
    cep,
    setCep,
    onSearch,
    loading,
}: DefaultScreenProps) => {
    return (
        <>
            <FindSection
                cep={cep}
                setCep={setCep}
                onSearch={onSearch}
                loading={loading}
            />

            <section className="mt-8">
                <div className="flex flex-nowrap items-stretch justify-between gap-2 sm:gap-4 overflow-x-auto pb-2">
                    <CardSimple typer="endereco" />
                    <CardSimple typer="clima" />
                    <CardSimple typer="local" />
                </div>
            </section>
        </>
    );
}