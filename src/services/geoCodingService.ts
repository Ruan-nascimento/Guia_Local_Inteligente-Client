export async function getCoordinates(city: string) {
    const query = encodeURIComponent(city);

    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`
    );

    const data = await response.json();


    if (!data.results || data.results.length === 0) {
        throw new Error("Cidade não encontrada.");
    }

    return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
    };
}