export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

// Simple in-memory TTL cache used to avoid repeatedly hitting PokeAPI for the
// same URL during a CLI session. Keys are full request URLs.
export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  add<T>(key: string, val: T) {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }

  get<T>(key: string) {
    const entry = this.#cache.get(key);
    if (typeof entry === "undefined") {
      return undefined;
    }

    // Expiration is performed by the reap loop rather than checked here.
    return entry.val as T;
  }

  #reap() {
    const expiryCutoff = Date.now() - this.#interval;

    for (const [key, val] of this.#cache) {
      if (val.createdAt <= expiryCutoff) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(
      () => this.#reap(),
      this.#interval
    );
  }

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  stopReapLoop() {
    // Tests call this explicitly so the interval does not keep the Node process
    // alive. If PokeAPI later gains lifecycle management, expose cleanup there too.
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}