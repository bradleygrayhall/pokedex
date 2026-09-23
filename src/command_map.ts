import { State } from "./state.js";

// Fetch and display the next page of location areas. PokeAPI provides opaque
// next/previous URLs, so the CLI stores those exact URLs instead of rebuilding
// pagination query strings itself.
export async function commandMap(state: State) {
    const locations = await state.pokeApi.fetchLocations(state.nextLocationsURL);

    state.nextLocationsURL = locations.next || "";
    state.prevLocationsURL = locations.previous || "";

    locations.results.forEach((item) => console.log(`${item.name}`));
}

export async function commandMapBack(state: State) {
    // No previous URL means the user is already at the first page.
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }

    const locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);

    state.nextLocationsURL = locations.next || "";
    state.prevLocationsURL = locations.previous || "";

    locations.results.forEach((item) => console.log(`${item.name}`));
}