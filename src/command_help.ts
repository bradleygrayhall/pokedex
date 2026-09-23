import { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");

    // Help is generated from the same registry used for dispatch, so registering
    // a new command in commands.ts automatically makes it discoverable here.
    const commandfunctions = Object.values(state.commands);
    commandfunctions.forEach((item) =>
        console.log(`${item.name}: ${item.description}`)
    );
}