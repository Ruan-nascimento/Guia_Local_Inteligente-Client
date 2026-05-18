import type { filteredPlacesProps, LocalsPerRegionProps } from "@/interfaces/localsPerRegion.interface"
import { Clock, Heart, MapPin, Star } from "lucide-react"

export const LocalsPerRegion = ({ filteredPlaces }: filteredPlacesProps) => {
    return (
        <div className="space-y-3">
            {filteredPlaces.map((place: LocalsPerRegionProps) => (
                <div
                    key={place.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex items-center gap-4"
                >
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <MapPin className="text-emerald-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{place.name}</h3>

                        <p className="text-emerald-400 text-sm">
                            {place.category}
                        </p>

                        <p className="text-slate-400 text-xs truncate">
                            {place.description}
                        </p>
                    </div>

                    <div className="text-xs text-slate-400 shrink-0">
                        <p className="flex items-center gap-1">
                            <Star size={14} className="text-emerald-400" />
                            {place.rating}
                        </p>

                        <p className="flex items-center gap-1 mt-2">
                            <Clock size={14} />
                            {place.hours}
                        </p>
                    </div>

                    <Heart className="text-slate-400 shrink-0" />
                </div>
            ))}
        </div>
    )
}