import { State } from "./state.js"


export async function commandMap(state: State) {
    const locations = await state.pokeApi.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locations.next || "";
    state.prevLocationsURL = locations.previous || "";
    locations.results.forEach((item) => console.log(`${item.name}`))
}

export async function commandMapBack(state: State) {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page")
        return;
    }
    const locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locations.next || "";
    state.prevLocationsURL = locations.previous || "";
    locations.results.forEach((item) => console.log(`${item.name}`))
}