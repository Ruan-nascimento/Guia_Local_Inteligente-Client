export type GeocodingResult = {
    latitude: number;
    longitude: number;
    name: string;
    country?: string;
};

export type GeocodingResponse = {
    results?: GeocodingResult[];
};

export type Coordinates = {
    latitude: number;
    longitude: number;
};