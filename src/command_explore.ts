import { State } from "./state.js";

export async function commandExplore(state: State, ...params:string[]) {
    if (params.length === 0) {
        return;
    }
    const locationAreaName = params[0];
    const location = await state.pokeApi.fetchLocation(locationAreaName);
    console.log("Found Pokemon:")
    for (let i = 0; i<location.pokemon_encounters.length;i++) {
        console.log(` - ${location.pokemon_encounters[i].pokemon.name}`)
    }
}