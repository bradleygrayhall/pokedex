import { State } from './state.js';
export function startREPL(state: State) {
    state.readline.prompt()
    state.readline.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }
            const cmd = state.commands[words[0]]
            if (cmd) {
                try {
                    await cmd.callback(state,...words.slice(1));
                } catch (err) {
                    console.log((err as Error).message);
                }
            } else {
                console.log("Unknown command");
            }
        state.readline.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter((item)=> item !== "");
}