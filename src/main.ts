import { startREPL} from "./repl.js";
import { initState } from "./state.js";

const state = initState();

async function main() {
    await startREPL(state);
}

main();