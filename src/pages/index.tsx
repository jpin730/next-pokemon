import { GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";

import pokeApi, { PokeApiResponse } from "@/api/pokeApi";
import { Pokemon, PokemonShort } from "@/interfaces";
import { MainLayout, PokemonCard } from "@/components";

interface Props {
  pokemons: Pokemon[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { data } = await pokeApi.get<PokeApiResponse<PokemonShort[]>>(
    "/pokemon?limit=151"
  );
  const pokemons: Pokemon[] = data.results.map(({ name, url }) => {
    const id = url.split("/").at(-2) as string;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return { id, name, url, image };
  });
  const props: Props = { pokemons };
  return { props };
};

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <MainLayout>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </MainLayout>
  );
};

export default Home;
