import { Cache } from "./pokecache.js";

// Small API client around the PokeAPI endpoints used by the CLI. Command files
// ask for domain data; URL construction, HTTP errors, and caching stay here.
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // An empty/omitted page URL means the first location-area page. Subsequent
    // calls may pass the opaque next/previous URL returned by PokeAPI.
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data: ShallowLocations = await response.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data: Location = await response.json();
    this.cache.add(url, data);
    return data;
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${name}`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached !== undefined) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data: Pokemon = await response.json();
    this.cache.add(url, data);
    return data;
  }

  // NEXT BUILD: if API use grows, extract the repeated cache -> fetch -> validate
  // -> parse sequence into one private helper. That also gives tests one place to
  // mock transport/error behavior rather than testing three nearly identical paths.
}

// These interfaces intentionally describe only the PokeAPI fields this program
// currently consumes. Add fields as features need them instead of mirroring the
// entire upstream API schema.
export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number,
  name: string,
  game_index: number,
  encounter_method_rates: EncounterMethodRate[],
  location: {
    name: string,
    url: string,
  },
  names: Name[],
  pokemon_encounters: PokemonEncounter[],
};

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface Name {
  name: string
  language: Language
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: {
    name: string;
    url: string;
  }
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
  base_experience: number
  height: number
  weight: number
  stats: {
    base_stat: number;
    stat: {
      name: string;
      url: string
    }
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string
    }
  }[];
}

export interface VersionDetail2 {
  version: Version2
  max_chance: number
  encounter_details: EncounterDetail[]
}

export interface Version2 {
  name: string
  url: string
}

export interface EncounterDetail {
  min_level: number
  max_level: number
  chance: number
  method: Method
  condition_values: any[]
  pokemon_details: any
}

export interface Method {
  name: string
  url: string
}