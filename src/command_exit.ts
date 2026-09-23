import { State } from "./state.js";

export async function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");

    // Close readline so the terminal interface is cleaned up before terminating.
    // NEXT BUILD: save persistent game/Pokedex state before this point (or on a
    // shared shutdown hook) so exit is not the only safe save path.
    state.readline.close();
    process.exit(0);
}