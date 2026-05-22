import { developers, icons } from "@/components/pages/sobre/data";


export const DevelopersCard = () => {
    const UserRound = icons.UserRound;

    return (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-lg shadow-black/10">
            <p className="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-400">
                Projeto acadêmico
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
                {developers.map((developer) => (
                    <div
                        key={developer}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-gray-950/60 p-4"
                    >
                        <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/15">
                            <UserRound className="size-6 text-emerald-400" />
                        </div>

                        <strong className="text-white/85">
                            {developer}
                        </strong>
                    </div>
                ))}
            </div>
        </div>
    );
};