import { State } from "./state.js";

export async function inspectPokemon(state: State, ...params: string[]) {
    if (params.length !== 1) {
        throw new Error("A pokemon name is required");
    }

    const name = params[0];
    const pokemon = state.caughtPokemon[name];

    // Inspection is intentionally limited to caught Pokemon rather than making a
    // new API request. This makes "inspect" reflect the user's own Pokedex.
    if (!pokemon) {
        throw new Error("This pokemon hasn't been caught yet!");
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);

    console.log("Stats:");
    for (const stat of pokemon.stats) {
        console.log(`   -${stat.stat.name}: ${stat.base_stat}`);
    }

    console.log("Types:");
    for (const type of pokemon.types) {
        console.log(`   -${type.type.name}`);
    }

    // NEXT BUILD: if caught Pokemon gain level/XP/evolution data, keep those
    // player-owned fields separate from the immutable species/API information.
}