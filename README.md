# Pokedex

A command-line Pokedex written in TypeScript as part of the Boot.dev Pokedex project.

The current build uses PokeAPI for location and Pokemon data, keeps a short-lived in-memory API cache, and stores caught Pokemon for the lifetime of the running process.

## Current commands

| Command | Purpose |
| --- | --- |
| `help` | List available commands |
| `map` | Show the next page of PokeAPI location areas |
| `mapb` | Show the previous page of location areas |
| `explore <location>` | List Pokemon that can appear in a location area |
| `catch <pokemon>` | Attempt to catch a Pokemon |
| `inspect <pokemon>` | Inspect a Pokemon already caught |
| `pokedex` | List caught Pokemon |
| `exit` | Exit the application |

## Development

```bash
npm install
npm run build
npm test
npm start
```

For development, `npm run dev` compiles the TypeScript project and starts the CLI.

## Code map

- `src/main.ts` creates the application state and starts the CLI.
- `src/state.ts` owns mutable session state such as pagination and caught Pokemon.
- `src/repl.ts` contains the current readline-based input loop and command dispatch.
- `src/commands.ts` is the central command registry.
- `src/command_*.ts` files implement individual commands.
- `src/pokeapi.ts` owns PokeAPI requests and response types.
- `src/pokecache.ts` provides the in-memory TTL cache.
- `*.test.ts` files contain Vitest tests.

The source contains maintenance comments around important assumptions and extension points. They are intended to explain *why* code is structured a certain way and where future features should connect, rather than narrating obvious TypeScript syntax.

# Next Build

The next build should turn the course project into a more game-like, persistent CLI while keeping the API, game rules, input handling, and storage testable independently.

## CLI and architecture

- [ ] **Implement Node's `repl` module**
  - Replace or wrap the current manual `readline` loop with Node's `repl` module.
  - Keep command handlers independent of terminal I/O so they remain easy to test.
  - Preserve the existing command registry rather than embedding game logic into the REPL.

- [ ] **Refactor for organization and testability**
  - Separate player/save data from raw PokeAPI response objects.
  - Move catch probability and future battle/evolution rules into game/domain modules.
  - Extract repeated PokeAPI cache/fetch/error handling into a reusable helper.
  - Inject randomness and other external dependencies where useful so tests can be deterministic.

- [ ] **Add more unit tests**
  - Command argument validation and command dispatch.
  - Catch success/failure with deterministic randomness.
  - PokeAPI cache hits, misses, and HTTP errors.
  - Pagination behavior.
  - Persistence/load-save behavior.
  - Party, leveling, evolution, ball modifiers, encounters, and battle rules.

## Pokemon and player progression

- [ ] **Keep Pokemon in a party and allow them to level up**
  - Distinguish the complete caught-Pokemon collection from an active party.
  - Track player-owned data such as level and experience separately from base PokeAPI data.
  - Define party-size rules before battle logic depends on them.

- [ ] **Allow caught Pokemon to evolve after a set amount of time**
  - Store when a Pokemon was caught or when its evolution timer began.
  - Determine evolution eligibility when loading a save and while the program is running.
  - Use PokeAPI evolution data rather than hard-coding species relationships where practical.

- [ ] **Persist a user's Pokedex to disk**
  - Save progress between sessions.
  - Persist caught Pokemon, party state, levels/XP, evolution timing, inventory, and other player-owned state.
  - Use a versioned save format so future schema changes can be migrated safely.

## Exploration and encounters

- [ ] **Make exploration more interesting with PokeAPI**
  - Present valid area choices rather than requiring the user to know/type exact location names.
  - Experiment with navigation commands such as `left`, `right`, or numbered choices.
  - Derive choices from PokeAPI relationships/data instead of hard-coding the map where possible.

- [ ] **Add random encounters with wild Pokemon**
  - Use a location's encounter information to choose eligible Pokemon.
  - Account for encounter chances/levels from PokeAPI where useful.
  - Feed encounters into catching and, later, battling rather than making `catch` completely independent of exploration.

## Catching and inventory

- [ ] **Support different ball types**
  - Add Pokeballs, Great Balls, Ultra Balls, and future ball types.
  - Give each ball a different modifier/chance of catching a Pokemon.
  - Track ball inventory as player-owned state.
  - Move the current `base_experience` catch calculation into a dedicated catch formula that can be tested independently.

## Battles

- [ ] **Simulate battles between Pokemon**
  - Start with a small deterministic turn-based battle model before recreating every Pokemon mechanic.
  - Keep battle state separate from PokeAPI transport code.
  - Use Pokemon stats/types as inputs, then add moves, damage, XP rewards, status effects, and switching incrementally.
  - Make the battle engine callable without the CLI so it can be thoroughly unit tested.

## Suggested implementation order

1. Refactor player-owned Pokemon/state models and dependency boundaries.
2. Expand unit tests around current behavior.
3. Add disk persistence.
4. Add party management and leveling.
5. Add selectable exploration and random encounters.
6. Add ball types and a dedicated catch formula.
7. Add the battle engine.
8. Add evolution timing.
9. Replace/wrap the input layer with Node's `repl` module once command/game logic is sufficiently decoupled.

This order is not a requirement; it mainly reduces the chance that persistence, battles, and the new REPL become tightly coupled to one another.
