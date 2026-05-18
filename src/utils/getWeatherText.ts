export function getWeatherText(code: number) {
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