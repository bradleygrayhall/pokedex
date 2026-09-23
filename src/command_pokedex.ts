import { State } from "./state.js";

export async function commandPokedex(state: State) {
    // Object keys are the canonical Pokemon names returned by PokeAPI and used as
    // the in-memory index for caught Pokemon.
    const listOfPokemon = Object.keys(state.caughtPokemon);

    console.log("Your Pokedex:");
    for (let i = 0; i < listOfPokemon.length; i++) {
        console.log(`   -${listOfPokemon[i]}`);
    }

    // NEXT BUILD: this view can later distinguish the full Pokedex collection
    // from the smaller active party.
}