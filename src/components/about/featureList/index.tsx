import { features, icons } from "@/components/pages/sobre/data";


export const FeatureList = () => {
    const CheckCircle2 = icons.CheckCircle2;

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 shadow-lg shadow-black/10">
            {features.map((feature) => (
                <div
                    key={feature}
                    className="flex items-center gap-5 border-b border-white/10 px-6 py-4 last:border-b-0"
                >
                    <CheckCircle2 className="size-7 shrink-0 text-emerald-500" />

                    <span className="text-lg text-white/75">
                        {feature}
                    </span>
                </div>
            ))}
        </div>
    );
};