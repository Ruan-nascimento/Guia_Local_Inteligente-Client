import type { Coordinates, GeocodingResponse } from "@/interfaces/geoCoding.interface";

export async function getCoordinates(
    city: string,
    signal?: AbortSignal
): Promise<Coordinates> {

    if (typeof city !== "string") {
        throw new Error("Cidade precisa ser uma string.");
    }

    const trimmedCity = city.trim();

    if (!trimmedCity) {
        throw new Error("Cidade não informada.");
    }

    if (trimmedCity.length < 2) {
        throw new Error("Nome da cidade muito curto.");
    }

    const query = encodeURIComponent(trimmedCity);

    let response: Response;

    try {
        response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`,
            { signal }
        );
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            throw new Error("Busca de localização cancelada.");
        }

        throw new Error("Erro ao conectar ao serviço de localização.");
    }

    if (!response.ok) {
        throw new Error(
            `Erro ao buscar coordenadas. Status: ${response.status}`
        );
    }

    let data: GeocodingResponse;

    try {
        data = await response.json();
    } catch {
        throw new Error("Resposta inválida do servidor.");
    }

    if (!Array.isArray(data.results) || data.results.length === 0) {
        throw new Error("Cidade não encontrada.");
    }

    const result = data.results[0];

    if (
        !Number.isFinite(result.latitude) ||
        !Number.isFinite(result.longitude)
    ) {
        throw new Error("Coordenadas inválidas recebidas.");
    }

    return {
        latitude: result.latitude,
        longitude: result.longitude,
    };
}