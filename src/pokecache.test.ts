import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

// Exercise both immediate retrieval and time-based eviction. Each case owns its
// cache so concurrent cases cannot interfere with one another.
test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  // Wait for more than one TTL so the periodic reaper has an opportunity to
  // delete the entry. Fake timers would make this test faster/more deterministic.
  await new Promise((resolve) => setTimeout(resolve, interval * 2));

  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  // Important: clear the interval so Vitest/Node can exit cleanly.
  cache.stopReapLoop();
});

// NEXT BUILD test targets:
// - replacing an existing cache key
// - multiple keys with different insertion times
// - PokeAPI cache hits/misses and failed HTTP responses
// - command behavior with deterministic randomness
