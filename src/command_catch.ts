import { State } from "./state.js";

export async function catchPokemon(state: State, ...params: string[]) {
    // This command currently accepts exactly one Pokemon name. Keeping argument
    // validation here makes the REPL generic and keeps command-specific rules local.
    if (params.length !== 1) {
        throw new Error("No Pokemon name was supplied");
    }

    const pokemonName = params[0];
    const pokemon = await state.pokeApi.fetchPokemon(pokemonName);

    console.log(`Throwing a Pokeball at ${pokemon.name}...`);

    // Course-era catch mechanic: higher base experience tends to make a Pokemon
    // harder to catch because the random range grows while the threshold stays 50.
    // NEXT BUILD: move this into a catch/battle domain function so ball type,
    // status effects, Pokemon difficulty, and deterministic tests can affect it.
    const notCaughtRate = Math.floor(Math.random() * pokemon.base_experience);

    if (notCaughtRate >= 50) {
        console.log(`${pokemon.name} escaped!`);
        return;
    }

    console.log(`${pokemon.name} was caught!`);

    // The Pokemon object itself is currently the Pokedex entry and is stored only
    // in memory. A later save model can add level, XP, caughtAt, evolution state,
    // party membership, and which ball was used.
    state.caughtPokemon[pokemon.name] = pokemon;
}