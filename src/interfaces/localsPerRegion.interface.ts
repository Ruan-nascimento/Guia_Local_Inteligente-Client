export interface LocalsPerRegionProps {
    id: number;
    name: string;
    category: string;
    description: string;
    rating: number | null;
    hours: string;
    latitude?: number;
    longitude?: number;
}

export interface filteredPlacesProps {
    filteredPlaces: LocalsPerRegionProps[];
}
