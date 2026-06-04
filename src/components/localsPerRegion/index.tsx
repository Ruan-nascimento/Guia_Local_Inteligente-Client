import type { Place } from "@/hooks/useSearch";
import { useFavorites } from "@/hooks/useFavorites";

import {
    Clock,
    Heart,
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

export const LocalsPerRegion = ({ filteredPlaces }: { filteredPlaces: Place[] }) => {
    const { add, remove, isFavorite } = useFavorites();

    const handleToggleFavorite = async (place: Place) => {
        try {
            const placeIdStr = String(place.id);
            if (isFavorite(placeIdStr)) {
                await remove(placeIdStr);
            } else {
                await add({
                    placeId: placeIdStr,
                    name: place.name,
                    category: place.category,
                    description: place.description,
                    rating: place.rating,
                    hours: place.hours,
                    latitude: place.latitude,
                    longitude: place.longitude,
                });
            }
        } catch (error) {
            console.error("Erro ao favoritar/desfavoritar:", error);
        }
    };

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
            {filteredPlaces.map((place: Place) => {
                const todayHours = getTodayOpeningHours(place.hours ?? undefined);
                const isFav = isFavorite(String(place.id));
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
                                    <div className="min-w-0 flex-1">
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

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleToggleFavorite(place);
                                        }}
                                        className="text-slate-400 transition duration-200 hover:text-red-500 focus:outline-none"
                                    >
                                        <Heart
                                            size={18}
                                            className={
                                                isFav
                                                    ? "scale-110 fill-red-500 text-red-500"
                                                    : "hover:scale-110"
                                            }
                                        />
                                    </button>
                                </div>

                                <p
                                    title={place.description ?? ""}
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
                                            title={place.hours ?? ""}
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