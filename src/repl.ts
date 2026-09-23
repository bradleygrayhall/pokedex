import { State } from "./state.js";

// This is a small REPL built directly on Node's readline Interface. It was kept
// explicit for the Boot.dev exercise so command parsing and dispatch are visible.
// NEXT BUILD: compare/replace this loop with Node's `repl` module while keeping
// command callbacks independent from the input mechanism.
export function startREPL(state: State) {
    state.readline.prompt();

    state.readline.on("line", async (input) => {
        const words = cleanInput(input);

        // Ignore blank input, but immediately restore the prompt.
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const cmd = state.commands[words[0]];
        if (cmd) {
            try {
                // Everything after the first word is a positional argument for
                // the selected command. The command itself owns validation.
                await cmd.callback(state, ...words.slice(1));
            } catch (err) {
                // Commands throw user-facing errors (bad names, missing args,
                // failed HTTP requests); keep the REPL alive after displaying one.
                console.log((err as Error).message);
            }
        } else {
            console.log("Unknown command");
        }

        state.readline.prompt();
    });
}

export function cleanInput(input: string): string[] {
    // Lowercasing makes command and Pokemon/location lookup forgiving.
    // Revisit this if a future command needs case-sensitive/free-form arguments.
    return input
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((item) => item !== "");
}