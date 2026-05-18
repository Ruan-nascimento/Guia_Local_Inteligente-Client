import { CloudSun } from "lucide-react";
import type { WeatherConditionProps } from "@/interfaces/weatherCondition.interface";

export const WeatherCondition = ({ temperature, condition, max, min }: WeatherConditionProps) => {
    return (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex justify-between items-center">
            <div>
                <h3 className="text-emerald-400 font-bold mb-4">
                    Clima agora
                </h3>

                <div className="flex items-center gap-3">
                    <CloudSun className="text-emerald-400" size={36} />

                    <div>
                        <p className="text-3xl font-bold">
                            {temperature}°C
                        </p>

                        <p className="text-slate-400 text-sm">
                            {condition}
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-sm border-l border-slate-700 pl-5">
                <p className="text-slate-400">Máxima</p>
                <p className="font-bold">{max}°C</p>

                <p className="text-slate-400 mt-2">Mínima</p>
                <p className="font-bold">{min}°C</p>
            </div>
        </div>
    )
}