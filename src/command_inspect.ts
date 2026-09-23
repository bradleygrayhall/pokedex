import { State } from "./state.js";

export async function inspectPokemon(state: State, ...params:string[]) {
    if (params.length !== 1) {
        throw new Error("A pokemon name is required");
        return;
    }
    const name = params[0];
    const pokemon = state.caughtPokemon[name];
    if (!pokemon) {
        throw new Error("This pokemon hasn't been caught yet!")
        return;
    }
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    for (const stat of pokemon.stats) {
        console.log(`   -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`)
    for (const type of pokemon.types) {
        console.log(`   -${type.type.name}`);
    }
}