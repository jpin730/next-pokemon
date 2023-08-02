import { GetStaticProps, NextPage } from "next";
import { Grid, Text } from "@nextui-org/react";

import pokeApi, { PokeApiResponse } from "@/api/pokeApi";
import { Pokemon, PokemonShort } from "@/interfaces";
import { MainLayout, PokemonCard } from "@/components";
import { TOTAL_POKEMONS } from "@/utils";

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
      <Text h1>Pokemons</Text>

      <Text h4>First Generation: {TOTAL_POKEMONS} pokemons</Text>

      <Grid.Container gap={2} justify="flex-start" css={{ padding: "1rem 0" }}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </MainLayout>
  );
};

export default Home;
