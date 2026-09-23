import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

// Keep parsing tests table-driven so new command-input edge cases are cheap to add.
describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "hello",
    expected: ["hello"],
  },
  {
    input: "Charmander Bulbasaur PIKACHU",
    expected: ["charmander", "bulbasaur", "pikachu"],
  },
  {
    input: " HellO World ",
    expected: ["hello", "world"],
  },
  {
    input: "hello, world!",
    expected: ["hello,", "world!"],
  },
  {
    input: "hello 123 world",
    expected: ["hello", "123", "world"],
  },
  {
    input: "",
    expected: [],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

// NEXT BUILD: add dispatch-level tests with a fake State/readline object so command
// selection, argument forwarding, unknown commands, and thrown errors can be tested
// without launching an interactive terminal.
