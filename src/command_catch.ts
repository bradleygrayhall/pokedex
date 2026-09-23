import { State } from "./state.js";

export async function catchPokemon(state: State, ...params:string[]) {
    if (params.length !== 1) {
        throw new Error("No Pokemon name was supplied");

    }
    const pokemonName = params[0];
    const pokemon = await state.pokeApi.fetchPokemon(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemon.name}...`);
    const notCaughtRate = Math.floor(Math.random()*pokemon.base_experience);
    if (notCaughtRate >= 50) {
        console.log(`${pokemon.name} escaped!`);
        return;
    }
    console.log(`${pokemon.name} was caught!`)
    state.caughtPokemon[pokemon.name] = pokemon;
}