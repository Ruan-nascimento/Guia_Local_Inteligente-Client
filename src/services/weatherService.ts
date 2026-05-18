export async function getWeather(latitude: number, longitude: number) {
    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: "temperature_2m,weather_code",
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
    });

    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params}`
    );

    const data = await response.json();

    return {
        temperature: Math.round(data.current.temperature_2m),
        max: Math.round(data.daily.temperature_2m_max[0]),
        min: Math.round(data.daily.temperature_2m_min[0]),
        condition: getWeatherText(data.current.weather_code),
    };
}

function getWeatherText(code: number) {
    const map: Record<number, string> = {
        0: "Céu limpo",
        1: "Principalmente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Neblina",
        48: "Neblina",
        51: "Garoa leve",
        61: "Chuva leve",
        63: "Chuva moderada",
        80: "Pancadas de chuva",
    };

    return map[code] ?? "Clima variável";
}