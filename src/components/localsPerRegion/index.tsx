import type {
    filteredPlacesProps,
    LocalsPerRegionProps,
} from "@/interfaces/localsPerRegion.interface";

import {
    Clock,
    MapPin,
    Star,
    Store,
} from "lucide-react";

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getTodayOpeningHours(hours?: string) {
    if (!hours || hours === "Horário não informado") {
        return "Horário não informado";
    }

    if (hours === "24/7") {
        return "Aberto 24h";
    }

    const today = weekDays[new Date().getDay()];

    const parts = hours
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean);

    if (parts.length <= 1) {
        return hours;
    }

    const todayPart = parts.find((part) => {
        const [days] = part.split(" ");

        if (!days) return false;

        if (days.includes(today)) {
            return true;
        }

        if (days.includes("-")) {
            const [start, end] = days.split("-");

            const startIndex = weekDays.indexOf(start);
            const endIndex = weekDays.indexOf(end);
            const todayIndex = weekDays.indexOf(today);

            if (startIndex === -1 || endIndex === -1) {
                return false;
            }

            if (startIndex <= endIndex) {
                return todayIndex >= startIndex && todayIndex <= endIndex;
            }

            return todayIndex >= startIndex || todayIndex <= endIndex;
        }

        return false;
    });

    if (!todayPart) {
        return "Fechado hoje";
    }

    return todayPart.replace(/^(Mo|Tu|We|Th|Fr|Sa|Su)(-(Mo|Tu|We|Th|Fr|Sa|Su))?\s?/, "");
}

export const LocalsPerRegion = ({ filteredPlaces }: filteredPlacesProps) => {
    if (filteredPlaces.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center">
                <Store className="mx-auto mb-3 text-slate-500" size={32} />

                <h3 className="font-semibold text-slate-200">
                    Nenhum local encontrado
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Tente selecionar outra categoria ou pesquisar outro CEP.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {filteredPlaces.map((place: LocalsPerRegionProps) => {
                const todayHours = getTodayOpeningHours(place.hours);

                const tooltip = `${place.name} - ${place.description}`;

                return (
                    <article
                        key={place.id}
                        title={tooltip}
                        className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-slate-900"
                    >
                        <div className="flex gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10">
                                <MapPin size={22} className="text-emerald-400" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <h3
                                            title={place.name}
                                            className="truncate text-sm font-bold text-slate-100"
                                        >
                                            {place.name}
                                        </h3>

                                        <p className="mt-0.5 w-fit rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                                            {place.category}
                                        </p>
                                    </div>

                                </div>

                                <p
                                    title={place.description}
                                    className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-400"
                                >
                                    {place.description}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                    {place.rating !== null && place.rating !== undefined && (
                                        <span className="flex items-center gap-1 rounded-full bg-slate-950 px-2 py-1">
                                            <Star
                                                size={13}
                                                className="text-emerald-400"
                                            />
                                            {place.rating}
                                        </span>
                                    )}

                                    {todayHours !== "Horário não informado" && (
                                        <span
                                            title={place.hours}
                                            className="flex items-center gap-1 rounded-full bg-slate-950 px-2 py-1"
                                        >
                                            <Clock size={13} />
                                            {todayHours}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};