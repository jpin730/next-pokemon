import { getPokemonImageUrl } from "./getPokemonImageUrl";
import pokeApi, { PokeApiResponse } from "@/api/pokeApi";
import { Pokemon, PokemonShort } from "@/interfaces";
import { TOTAL_POKEMONS } from "./constants";

interface Props {
  pokemons: Pokemon[];
}

interface Result {
  props: Props;
}

export const getStaticPokemons = async (): Promise<Result> => {
  const { data } = await pokeApi.get<PokeApiResponse<PokemonShort[]>>(
    `/pokemon?limit=${TOTAL_POKEMONS}`,
  );
  const pokemons: Pokemon[] = data.results.map(({ name, url }) => {
    const id = url.split("/").at(-2) as string;
    const image = getPokemonImageUrl(id);
    return { id, name, url, image };
  });
  const props: Props = { pokemons };
  return { props };
};
