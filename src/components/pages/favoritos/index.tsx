import { Link, Navigate } from "react-router-dom";
import { Header } from "@/components/header";
import { useAuth } from "@/providers/AuthProvider";
import { useFavorites, type Favorite } from "@/hooks/useFavorites";
import {
    MapPin,
    Star,
    Clock,
    Trash2,
    Search,
    Bookmark
} from "lucide-react";
import { formatOpeningHours } from "@/lib/utils";
import { useModal } from "@/providers/ModalProvider";
import type { Place } from "@/hooks/useSearch";

export const FavoritosPage = () => {
    const { user, isLoading: authLoading } = useAuth();
    const { favorites, isLoading: favLoading, remove } = useFavorites();
    const { openModal } = useModal();

    if (authLoading) {
        return (
            <div className="min-h-dvh bg-gray-950 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleRemoveFavorite = async (placeId: string) => {
        try {
            await remove(placeId);
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        }
    };

    return (
        <div className="min-h-dvh bg-gray-950 text-white">
            <Header />

            <main className="px-6 pb-32 md:pb-12 pt-10">
                <section className="mx-auto flex max-w-5xl flex-col gap-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">
                                Favoritos
                            </h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Seus locais salvos para acesso rápido.
                            </p>
                        </div>
                    </div>

                    {favLoading ? (
                        <div className="grid gap-3 sm:grid-cols-2 animate-pulse">
                            <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                            <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                            <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                            <div className="h-28 rounded-2xl bg-slate-900 border border-slate-800" />
                        </div>
                    ) : favorites.length === 0 ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center flex flex-col items-center max-w-md mx-auto mt-10">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 mb-4 text-emerald-400">
                                <Bookmark size={32} />
                            </div>
                            <h3 className="font-semibold text-lg text-slate-200">
                                Nenhum favorito salvo
                            </h3>
                            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                                Você ainda não salvou nenhum local. Faça uma pesquisa por CEP e clique no ícone de coração nos resultados para guardar seus lugares favoritos.
                            </p>
                            <Link
                                to="/"
                                className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition duration-200"
                            >
                                <Search size={16} />
                                Pesquisar CEP
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 animate-[fadeIn_0.3s_ease]">
                            {favorites.map((fav: Favorite) => {
                                return (
                                    <article
                                        key={fav.id}
                                        onClick={() => {
                                            const placeToOpen: Place = {
                                                id: Number(fav.placeId),
                                                name: fav.name,
                                                category: fav.category,
                                                description: fav.description || "",
                                                latitude: fav.latitude || 0,
                                                longitude: fav.longitude || 0,
                                                rating: fav.rating || null,
                                                hours: fav.hours || ""
                                            };
                                            openModal("PlaceDetail", { place: placeToOpen });
                                        }}
                                        className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/90 p-4 transition hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-slate-900"
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10">
                                                <MapPin size={22} className="text-emerald-400" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="min-w-0 flex-1">
                                                        <h3
                                                            title={fav.name}
                                                            className="truncate text-sm font-bold text-slate-100"
                                                        >
                                                            {fav.name}
                                                        </h3>
                                                        <p className="mt-0.5 w-fit rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                                                            {fav.category}
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleRemoveFavorite(fav.placeId);
                                                        }}
                                                        className="text-red-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-500/10 transition duration-200 focus:outline-none"
                                                        title="Remover dos favoritos"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                {fav.description && (
                                                    <p
                                                        title={fav.description}
                                                        className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-400"
                                                    >
                                                        {fav.description}
                                                    </p>
                                                )}

                                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                                    {fav.rating !== null && fav.rating !== undefined && (
                                                        <span className="flex items-center gap-1 rounded-full bg-slate-950 px-2 py-1">
                                                            <Star size={13} className="text-emerald-400" />
                                                            {fav.rating}
                                                        </span>
                                                    )}

                                                    {fav.hours && (
                                                        <div className="flex items-start gap-1 rounded-full bg-slate-950 px-2 py-1 mt-1 w-full">
                                                            <Clock size={13} className="shrink-0 mt-0.5" />
                                                            <div className="flex flex-col gap-0.5 min-w-0">
                                                                {formatOpeningHours(fav.hours).map((line, i) => (
                                                                    <span key={i} className="break-words leading-relaxed">{line}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};