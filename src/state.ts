import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { CLICommand } from "./command.js";

// State is the shared, mutable session model for the CLI. Keeping these values
// together makes command handlers simple, but it is also the main seam to
// refactor if the project later gains persistence, parties, battles, or saves.
export type State = {
    pokeApi: PokeAPI,
    readline: Interface,
    commands: Record<string,CLICommand>,

    // The PokeAPI returns pagination URLs. We keep them here so map/mapb can
    // continue from the user's current page without re-deriving a page number.
    nextLocationsURL: string,
    prevLocationsURL: string,

    // Caught Pokemon currently exist only for this process lifetime.
    // NEXT BUILD: persistence/party/evolution metadata will likely replace or
    // wrap this simple record rather than putting that logic in command files.
    caughtPokemon: Record<string,Pokemon>,
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        readline: rl,
        commands: getCommands(),

        // Five seconds was sufficient for the course exercise and makes cache
        // behavior easy to observe. This can become configuration later.
        pokeApi: new PokeAPI(5000),

        // An empty next URL intentionally means "start at the first API page."
        nextLocationsURL: "",
        prevLocationsURL: "",
        caughtPokemon: {},
    };
}