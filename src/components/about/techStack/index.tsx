import { technologies } from "@/components/pages/sobre/data";

export const TechStack = () => {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {technologies.map((tech) => {
                const Icon = tech.icon;

                return (
                    <div
                        key={tech.name}
                        className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-gray-900/50 p-4 text-center shadow-lg shadow-black/10"
                    >
                        <Icon className={`size-12 ${tech.color}`} />

                        <strong className="text-lg font-semibold text-white/90">
                            {tech.name}
                        </strong>
                    </div>
                );
            })}
        </div>
    );
};