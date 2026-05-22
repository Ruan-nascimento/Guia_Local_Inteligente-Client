import { icons } from "@/components/pages/sobre/data";


export const AboutIntro = () => {
    const MapPin = icons.MapPin;

    return (
        <article className="rounded-2xl border border-white/10 bg-gray-900/50 p-6 shadow-lg shadow-black/20">
            <div className="flex items-center gap-7">
                <div className="flex size-28 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <MapPin className="size-16  text-emerald-500" />
                </div>

                <p className="max-w-2xl text-xl leading-relaxed text-white/75">
                    O Guia Local Inteligente consulta informações úteis de uma
                    região a partir de um CEP ou cidade.
                </p>
            </div>
        </article>
    );
};