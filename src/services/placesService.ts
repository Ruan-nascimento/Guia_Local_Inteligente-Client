export type Place = {
    id: number;
    name: string;
    category: string;
    description: string;
    latitude: number;
    longitude: number;
    rating: number | null;
    hours: string;
};

type OverpassElement = {
    id: number;
    type: string;
    lat?: number;
    lon?: number;
    center?: {
        lat: number;
        lon: number;
    };
    tags?: {
        name?: string;
        amenity?: string;
        shop?: string;
        tourism?: string;
        leisure?: string;
        opening_hours?: string;
        ["addr:street"]?: string;
        ["addr:housenumber"]?: string;
        ["addr:city"]?: string;
    };
};

function translateCategory(place: OverpassElement) {
    const amenity = place.tags?.amenity;
    const shop = place.tags?.shop;
    const tourism = place.tags?.tourism;
    const leisure = place.tags?.leisure;

    const categories: Record<string, string> = {
        restaurant: "Restaurante",
        cafe: "Cafeteria",
        fast_food: "Lanchonete",
        bar: "Bar",
        pub: "Pub",
        pharmacy: "Farmácia",
        hospital: "Hospital",
        clinic: "Clínica",
        bank: "Banco",
        school: "Escola",
        university: "Universidade",
        supermarket: "Mercado",
        convenience: "Conveniência",
        mall: "Shopping",
        clothes: "Loja de roupas",
        bakery: "Padaria",
        attraction: "Ponto turístico",
        park: "Parque",
        fitness_centre: "Academia",
        police: "Polícia",
        fuel: "Posto de combustível",
        beauty: "Beleza",
        hairdresser: "Barbearia / Cabeleireiro",
        electronics: "Eletrônicos",
        hardware: "Material de construção",
    };

    const key = amenity || shop || tourism || leisure || "local";

    return categories[key] || "Estabelecimento";
}

function getDescription(place: OverpassElement) {
    const street = place.tags?.["addr:street"];
    const number = place.tags?.["addr:housenumber"];
    const city = place.tags?.["addr:city"];

    if (street && number && city) {
        return `${street}, ${number} - ${city}`;
    }

    if (street && number) {
        return `${street}, ${number}`;
    }

    if (street) {
        return street;
    }

    return "Local encontrado próximo à região pesquisada.";
}

export async function getNearbyPlaces(
    latitude: number,
    longitude: number,
    radius = 3000
): Promise<Place[]> {
    const query = `
        [out:json][timeout:25];
        (
            node["amenity"="restaurant"](around:${radius},${latitude},${longitude});
            node["amenity"="cafe"](around:${radius},${latitude},${longitude});
            node["amenity"="fast_food"](around:${radius},${latitude},${longitude});
            node["amenity"="bar"](around:${radius},${latitude},${longitude});
            node["amenity"="pharmacy"](around:${radius},${latitude},${longitude});
            node["amenity"="hospital"](around:${radius},${latitude},${longitude});
            node["amenity"="clinic"](around:${radius},${latitude},${longitude});
            node["amenity"="bank"](around:${radius},${latitude},${longitude});
            node["shop"="supermarket"](around:${radius},${latitude},${longitude});
            node["shop"="convenience"](around:${radius},${latitude},${longitude});
            node["shop"="mall"](around:${radius},${latitude},${longitude});
            node["shop"="clothes"](around:${radius},${latitude},${longitude});
            node["shop"="bakery"](around:${radius},${latitude},${longitude});
            node["tourism"="attraction"](around:${radius},${latitude},${longitude});
            node["leisure"="park"](around:${radius},${latitude},${longitude});
            node["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
            node["amenity"="school"](around:${radius},${latitude},${longitude});
            node["amenity"="university"](around:${radius},${latitude},${longitude});
            node["amenity"="police"](around:${radius},${latitude},${longitude});
            node["amenity"="fuel"](around:${radius},${latitude},${longitude});
            node["shop"="beauty"](around:${radius},${latitude},${longitude});
            node["shop"="hairdresser"](around:${radius},${latitude},${longitude});
            node["shop"="electronics"](around:${radius},${latitude},${longitude});
            node["shop"="hardware"](around:${radius},${latitude},${longitude});
        );
        out body;
    `;

    const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
    });

    if (!response.ok) {
        throw new Error("Não foi possível buscar estabelecimentos próximos.");
    }

    const data = await response.json();

    const places = data.elements
        .filter((place: OverpassElement) => place.tags?.name)
        .map((place: OverpassElement) => ({
            id: place.id,
            name: place.tags?.name || "Nome não informado",
            category: translateCategory(place),
            description: getDescription(place),
            latitude: place.lat || place.center?.lat || latitude,
            longitude: place.lon || place.center?.lon || longitude,
            rating: null,
            hours: place.tags?.opening_hours || "Horário não informado",
        }));

    return places.slice(0, 12);
}