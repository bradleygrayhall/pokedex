import { State } from "./state.js";

export async function commandPokedex(state: State) {
    const listOfPokemon = Object.keys(state.caughtPokemon);
    console.log("Your Pokedex:")
    for (let i = 0; i < listOfPokemon.length; i++) {
        console.log(`   -${listOfPokemon[i]}`);
    }
}