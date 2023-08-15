import { Button, Card, CardBody, Image, Link } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

import { hasFavorite, toggleFavorite } from "@/utils/favoritesLocalStorage";
import { TOTAL_POKEMONS, capitalize } from "@/utils";
import { PokemonFull, PokemonShort, Sprites } from "@/interfaces";
import { HeartIcon, MainLayout } from "@/components";
import pokeApi, { PokeApiResponse } from "@/api/pokeApi";

interface Props {
  id: string;
  name: string;
  sprites: Sprites;
}

export const getStaticPaths: GetStaticPaths<{
  id: string;
}> = async () => {
  const ids = [...Array(TOTAL_POKEMONS)].map((_, index) => `${index + 1}`);

  const { data } = await pokeApi.get<PokeApiResponse<PokemonShort[]>>(
    `/pokemon?limit=${TOTAL_POKEMONS}`,
  );
  const names: string[] = data.results.map(({ name }) => name);

  const paths = ids.concat(names).map((id) => ({
    params: { id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  Props,
  {
    id: string;
  }
> = async ({ params }) => {
  const pathParam = params?.id;

  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${pathParam}`);

  const { id, name, sprites } = data;

  const props: Props = { id: id.toString(), name, sprites };
  return { props };
};

const PokemonPage: NextPage<Props> = ({ id, name, sprites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(hasFavorite(id));
  }, [id]);

  const capitalizedName = capitalize(name);
  const title = `${capitalizedName} #${id}`;

  const prev = +id > 1 && +id - 1;
  const next = +id < TOTAL_POKEMONS && +id + 1;

  const onToggleFavorite = () => {
    toggleFavorite(id);
    setIsFavorite(!isFavorite);
  };

  return (
    <MainLayout title={title}>
      <h1 className="mb-5 text-5xl font-bold">
        {capitalizedName} #{id}
      </h1>

      <div className="mb-5 flex justify-between">
        <Link href="/" underline="always" className="">
          Back to home
        </Link>

        <div className="flex items-center">
          <Button
            isIconOnly
            color="danger"
            variant="light"
            onClick={onToggleFavorite}
          >
            <HeartIcon filled={isFavorite} />
          </Button>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardBody className="items-center">
            <Image
              alt={name}
              title={name}
              src={sprites.other?.dream_world.front_default as string}
            />
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardBody className="justify-center">
            <div className="grid grid-cols-2 justify-items-center sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
              <Image
                src={sprites.front_default}
                alt={name}
                width={100}
                height={100}
              />
              <Image
                src={sprites.back_default}
                alt={name}
                width={100}
                height={100}
              />
              <Image
                src={sprites.front_shiny}
                alt={name}
                width={100}
                height={100}
              />
              <Image
                src={sprites.back_shiny}
                alt={name}
                width={100}
                height={100}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="flex justify-between pb-5">
        {prev ? (
          <Link href={`/pokemon/${prev}`} underline="always">
            Pokemon #{prev}
          </Link>
        ) : (
          <span></span>
        )}

        {next ? (
          <Link href={`/pokemon/${next}`} underline="always">
            Pokemon #{next}
          </Link>
        ) : (
          <span></span>
        )}
      </div>
    </MainLayout>
  );
};

export default PokemonPage;
