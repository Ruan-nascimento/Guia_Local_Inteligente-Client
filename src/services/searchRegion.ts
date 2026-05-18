import { getAddressByCep } from "./cepService";
import { getCoordinates } from "./geoCodingService";
import { getWeather } from "./weatherService";
import { getNearbyPlaces } from "./placesService";
import { placesMock } from "../data/places";

export async function searchRegion(cep: string) {
    const address = await getAddressByCep(cep);

    const coordinates = await getCoordinates(address.localidade);

    const weather = await getWeather(
        coordinates.latitude,
        coordinates.longitude
    );

    let places;

    try {
        places = await getNearbyPlaces(
            coordinates.latitude,
            coordinates.longitude
        );
    } catch {
        places = placesMock;
    }

    return {
        address,
        weather,
        places,
    };
}