import { GetStaticProps, NextPage } from "next";

import { TOTAL_POKEMONS, getStaticPokemons } from "@/utils";
import { MainLayout, PokemonCard } from "@/components";
import { Pokemon } from "@/interfaces";

interface Props {
  pokemons: Pokemon[];
}

export const getStaticProps: GetStaticProps<Props> = async () =>
  await getStaticPokemons();

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
