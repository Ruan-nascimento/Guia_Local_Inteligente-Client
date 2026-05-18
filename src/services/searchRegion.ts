import { placesMock } from "@/data/places";
import { getAddressByCep } from "./cepService";
import { getCoordinates } from "./geoCodingService";
import { getWeather } from "./weatherService";

export async function searchRegion(cep: string) {
    const address = await getAddressByCep(cep);

    const coordinates = await getCoordinates(address.localidade);

    const weather = await getWeather(
        coordinates.latitude,
        coordinates.longitude
    );

    return {
        address,
        weather,
        places: placesMock,
    };
}