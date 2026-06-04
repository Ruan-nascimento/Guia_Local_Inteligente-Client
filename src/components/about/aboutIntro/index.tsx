import { icons } from "@/components/pages/sobre/data";


export const AboutIntro = () => {
    const MapPin = icons.MapPin;

    return (
        <article className="rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-lg shadow-black/20">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-7 text-center sm:text-left">
                <div className="flex size-20 sm:size-28 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <MapPin className="size-10 sm:size-16 text-emerald-500" />
                </div>

                <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-white/75 self-center">
                    O Guia Local Inteligente consulta informações úteis de uma
                    região a partir de um CEP ou cidade.
                </p>
            </div>
        </article>
    );
};