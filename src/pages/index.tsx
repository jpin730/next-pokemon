import { GetStaticProps, NextPage } from "next";

import pokeApi, { PokeApiResponse } from "@/api/pokeApi";
import { Pokemon, PokemonShort } from "@/interfaces";
import { MainLayout } from "@/components";

type PropTypes = {
  pokemons: Pokemon[];
};

export const getStaticProps: GetStaticProps<PropTypes> = async () => {
  const { data } = await pokeApi.get<PokeApiResponse<PokemonShort[]>>(
    "/pokemon?limit=151"
  );
  const pokemons: Pokemon[] = data.results.map(({ name, url }) => {
    const id = url.split("/").at(-2) as string;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return { id, name, url, image };
  });
  const props: PropTypes = { pokemons };
  return { props };
};

const Home: NextPage<PropTypes> = ({ pokemons }) => {
  return (
    <MainLayout>
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map(({ id, name }) => (
          <li key={id}>
            #{id} - {name}
          </li>
        ))}
      </ul>
    </MainLayout>
  );
};

export default Home;
