import { State } from "./state.js";

// Every CLI command follows the same contract so the REPL can dispatch commands
// without needing to know anything about the command's implementation.
export type CLICommand = {
  name: string;
  description: string;

  // State is shared for the lifetime of the CLI session. Extra words entered
  // after the command name are forwarded as command-specific arguments.
  callback: (state: State, ...args: string[]) => Promise<void>;
};