import { architecture } from "@/components/pages/sobre/data";

export const ArchitectureList = () => {
    return (
        <div className="flex flex-col gap-3">
            {architecture.map((item) => {
                const Icon = item.icon;

                return (
                    <article
                        key={item.number}
                        className="relative flex items-center gap-5 rounded-xl border border-white/10 bg-gray-900/50 p-5 shadow-lg shadow-black/10"
                    >
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-emerald-500/80 text-2xl font-bold text-white">
                            {item.number}
                        </div>

                        <div className="flex size-16 shrink-0 items-center justify-center text-emerald-500">
                            <Icon className="size-11" />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-1 max-w-xl text-base leading-relaxed text-white/65">
                                {item.description}
                            </p>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};