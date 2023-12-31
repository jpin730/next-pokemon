import { Button, Card, CardBody, Image, Link } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";

import { hasFavorite, toggleFavorite } from "@/utils/favoritesLocalStorage";
import { FAVORITES_QUERY, TOTAL_POKEMONS, capitalize } from "@/utils";
import { OptimizedSprites, PokemonFull, PokemonShort } from "@/interfaces";
import { HeartIcon, MainLayout } from "@/components";
import pokeApi, { PokeApiResponse } from "@/api/pokeApi";

interface Props {
  id: string;
  name: string;
  sprites: OptimizedSprites;
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

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  Props,
  {
    id: string;
  }
> = async ({ params }) => {
  const pathParam = params?.id;

  try {
    const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${pathParam}`);

    const { id, name, sprites } = data;

    const optimizedSprites: OptimizedSprites = {
      back_default: sprites.back_default,
      back_shiny: sprites.back_shiny,
      front_default: sprites.front_default,
      front_shiny: sprites.front_shiny,
      dream_world_front_default: sprites.other?.dream_world
        .front_default as string,
    };

    const props: Props = { id: id.toString(), name, sprites: optimizedSprites };
    return {
      props,
      revalidate: 86400, // seconds = 24 h
    };
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

const PokemonPage: NextPage<Props> = ({ id, name, sprites }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [backToFavorites, setBackToFavorites] = useState(false);

  useEffect(() => {
    setBackToFavorites(window.location.search === FAVORITES_QUERY);
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
        <Link href={backToFavorites ? "/favorites" : "/"} underline="always">
          Back to {backToFavorites ? "favorites" : "home"}
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
              src={sprites.dream_world_front_default}
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

      {!backToFavorites && (
        <div className="mb-5 flex justify-between">
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
      )}
    </MainLayout>
  );
};

export default PokemonPage;
