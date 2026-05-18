import type { WeatherData, WeatherResponse } from "@/interfaces/weatherService.interface";
import { getWeatherText } from "@/utils/getWeatherText";



export async function getWeather(
    latitude: number,
    longitude: number,
    signal?: AbortSignal
): Promise<WeatherData> {

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        throw new Error("Latitude ou longitude inválida.");
    }

    if (latitude < -90 || latitude > 90) {
        throw new Error("Latitude deve estar entre -90 e 90.");
    }

    if (longitude < -180 || longitude > 180) {
        throw new Error("Longitude deve estar entre -180 e 180.");
    }

    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: "temperature_2m,weather_code",
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
    });

    let response: Response;

    try {
        response = await fetch(
            `https://api.open-meteo.com/v1/forecast?${params}`,
            { signal }
        );
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Requisição de clima cancelada.");
        }

        throw new Error("Não foi possível conectar ao serviço de clima.");
    }

    if (!response.ok) {
        throw new Error(`Erro ao buscar clima. Status: ${response.status}`);
    }

    let data: WeatherResponse;

    try {
        data = await response.json();
    } catch {
        throw new Error("Resposta inválida do serviço de clima.");
    }

    const temperature = data.current?.temperature_2m;
    const weatherCode = data.current?.weather_code;
    const max = data.daily?.temperature_2m_max?.[0];
    const min = data.daily?.temperature_2m_min?.[0];

    if (
        typeof temperature !== "number" ||
        typeof weatherCode !== "number" ||
        typeof max !== "number" ||
        typeof min !== "number"
    ) {
        throw new Error("Dados de clima incompletos ou inválidos.");
    }

    return {
        temperature: Math.round(temperature),
        max: Math.round(max),
        min: Math.round(min),
        condition: getWeatherText(weatherCode),
    };
}