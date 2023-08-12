import { GetStaticProps, NextPage } from "next";

import { TOTAL_POKEMONS, getPokemonImageUrl } from "@/utils";
import pokeApi, { PokeApiResponse } from "@/api/pokeApi";
import { Pokemon, PokemonShort } from "@/interfaces";
import { MainLayout, PokemonCard } from "@/components";

interface Props {
  pokemons: Pokemon[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <MainLayout>
      <h1 className="mb-5 text-5xl font-bold">Pokemons</h1>

      <p className="mb-5">First Generation: {TOTAL_POKEMONS} pokemons</p>

      <div className="grid grid-cols-2 gap-4 pb-6  sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
