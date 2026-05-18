export type WeatherResponse = {
    current?: {
        temperature_2m?: number;
        weather_code?: number;
    };
    daily?: {
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
    };
};

export type WeatherData = {
    temperature: number;
    max: number;
    min: number;
    condition: string;
};