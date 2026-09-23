export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;
  add<T>(key: string,val: T){
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
    return entry.val;
  }
  #reap() {
    const reap = Date.now() - this.#interval;
    for (const [key, val] of this.#cache) {
        if (val.createdAt <= reap) {
            this.#cache.delete(key)
        }
    }
  }
  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(),this.#interval);
  }
  constructor(val: number) {
    this.#interval = val;
    this.#startReapLoop();
  }
  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}