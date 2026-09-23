import { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!")
    console.log("Usage:")
    const commandfunctions = Object.values(state.commands);
    commandfunctions.forEach((item) => console.log(`${item.name}: ${item.description}`));
}