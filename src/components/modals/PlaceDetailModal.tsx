import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/providers/ModalProvider";
import { useFavorites } from "@/hooks/useFavorites";
import { MapPin, Heart, Star, Clock, Map } from "lucide-react";
import type { Place } from "@/hooks/useSearch";
import { formatOpeningHours } from "@/lib/utils";

// Componente isolado com o conteúdo do modal para reaproveitar no Dialog e no Drawer
function PlaceDetailContent({ place }: { place: Place }) {
  const { add, remove, isFavorite } = useFavorites();
  const isFav = isFavorite(String(place.id));

  const handleToggleFavorite = async () => {
    try {
      const placeIdStr = String(place.id);
      if (isFav) {
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

  const handleGoogleMaps = () => {
    // Abre o local nas coordenadas usando a URL oficial do Google Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-6 text-slate-200">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10">
          <MapPin size={28} className="text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-white wrap-break-words">{place.name}</h2>
          <span className="mt-1 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            {place.category}
          </span>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="min-w-0">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Descrição</h4>
          <p className="text-sm text-slate-300 wrap-break-words">
            {place.description && place.description.trim() !== "" ? place.description : "Nenhuma descrição disponível."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Horário</h4>
            <div className="flex items-start gap-2 text-sm text-slate-300">
              <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 min-w-0">
                {formatOpeningHours(place.hours).map((line, i) => (
                  <span key={i} className="text-xs wrap-break-words leading-relaxed">{line}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Avaliação</h4>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Star size={16} className="text-emerald-400 shrink-0" />
              <span className="truncate">{place.rating ?? "Sem avaliação"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={handleGoogleMaps}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          <Map size={18} />
          Acompanhar no Google Maps
        </button>

        <button
          onClick={handleToggleFavorite}
          className={`flex items-center justify-center gap-2 w-full rounded-xl border px-4 py-3 text-sm font-semibold transition ${isFav
              ? "border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20"
              : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
        >
          <Heart size={18} className={isFav ? "fill-red-500" : ""} />
          {isFav ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </button>
      </div>
    </div>
  );
}

export function PlaceDetailModal() {
  const { activeModal, closeModal, payload } = useModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isOpen = activeModal === "PlaceDetail";
  const place = payload?.place as Place | undefined;

  if (!place) return null;

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[425px] border-slate-800 bg-[#020617]">
          <DialogHeader className="hidden">
            <DialogTitle>{place.name}</DialogTitle>
          </DialogHeader>
          <PlaceDetailContent place={place} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DrawerContent className="border-t border-slate-800 bg-[#020617] text-slate-200">
        <DrawerHeader className="hidden">
          <DrawerTitle>{place.name}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 pb-8">
          <PlaceDetailContent place={place} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
