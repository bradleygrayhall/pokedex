import { CLICommand } from "./command.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandExplore } from "./command_explore.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { catchPokemon } from "./command_catch.js";
import { inspectPokemon } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

// Central command registry. The REPL uses the object key for lookup, while
// name/description are also reused by the help command.
// New commands should generally be registered here instead of hard-coded into
// the REPL so the input loop stays generic.
export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Get the next page of locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Get the previous page of locations",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Get a list of pokemon in a given location",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "attempts to catch a pokemon",
      callback: catchPokemon,
    },
    inspect: {
      name: "inspect",
      description: "inspects a pokemon",
      callback: inspectPokemon,
    },
    pokedex: {
      name: "pokedex",
      description: "displays caught pokemon",
      callback: commandPokedex,
    },
  };
}