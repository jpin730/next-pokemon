export interface PokemonShort {
  name: string;
  url: string;
}

export interface Pokemon extends PokemonShort {
  id: string;
  image: string;
}
