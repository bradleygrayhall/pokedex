import { startREPL } from "./repl.js";
import { initState } from "./state.js";

// Build the single session state object once, then pass that same object through
// the REPL and command handlers so pagination, cached API access, and caught
// Pokemon survive between commands during this run.
const state = initState();

async function main() {
    await startREPL(state);
}

main();