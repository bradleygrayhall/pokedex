import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { CLICommand } from "./command.js";

export type State = {
    pokeApi: PokeAPI,
    readline: Interface,
    commands: Record<string,CLICommand>,
    nextLocationsURL: string,
    prevLocationsURL: string,
    caughtPokemon: Record<string,Pokemon>,
}

export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    return {
        readline: rl,
        commands: getCommands(),
        pokeApi: new PokeAPI(5000),
        nextLocationsURL: "",
        prevLocationsURL: "",
        caughtPokemon: {},
    };
}