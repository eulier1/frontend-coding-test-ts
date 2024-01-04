export enum STATS {
  hp,
  attack,
  defense,
  speed,
  specialAttack = 'special-attack',
  specialDefense = 'special-defense',
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: STATS
    url: string
  }
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface Pokemon {
  name: string
  height: number
  weight: number
  stats: PokemonStat[]
  types: PokemonType[]
  sprites: {
    front_default: string | null
  }
}

export interface RESTfulList {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}
