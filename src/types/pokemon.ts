export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonWeakness {
  [type: string]: string[]
}

export const typeWeaknesses: PokemonWeakness = {
  normal: ['fighting'],
  fighting: ['flying', 'psychic', 'fairy'],
  flying: ['rock', 'electric', 'ice'],
  poison: ['ground', 'psychic'],
  ground: ['water', 'grass', 'ice'],
  rock: ['fighting', 'ground', 'steel', 'water', 'grass'],
  bug: ['flying', 'rock', 'fire'],
  ghost: ['ghost', 'dark'],
  steel: ['fighting', 'ground', 'fire'],
  fire: ['ground', 'rock', 'water'],
  water: ['grass', 'electric'],
  grass: ['flying', 'poison', 'bug', 'fire', 'ice'],
  electric: ['ground'],
  psychic: ['bug', 'ghost', 'dark'],
  ice: ['fighting', 'rock', 'steel', 'fire'],
  dragon: ['ice', 'dragon', 'fairy'],
  dark: ['fighting', 'bug', 'fairy'],
  fairy: ['poison', 'steel'],
}

export const formatPokemonId = (id: number): string => {
  return id.toString().padStart(3, '0')
}
