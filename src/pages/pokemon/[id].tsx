import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { MainLayout } from "@/components";
import { PokemonFull } from "@/interfaces";
import pokeApi from "@/api/pokeApi";

interface Props {
  pokemon: PokemonFull;
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const tempArray = [...Array(151)].map((_, index) => `${index + 1}`);
  const paths = tempArray.map((id) => ({
    params: { id, name: "x" },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${id}`);

  const props: Props = { pokemon: data };
  return { props };
};

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const { id, name } = pokemon;

  return (
    <MainLayout>
      <h1>
        {id} - {name}{" "}
      </h1>
    </MainLayout>
  );
};

export default PokemonPage;
