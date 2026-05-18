export interface LocalsPerRegionProps {
    id: number;
    name: string;
    category: string;
    description: string;
    rating: number;
    hours: string;
}

export interface filteredPlacesProps {
    filteredPlaces: LocalsPerRegionProps[];
}
