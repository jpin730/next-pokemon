import { Button, Card, CardBody, Link } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { GetStaticProps, NextPage } from "next";

import { MainLayout, PokemonCard } from "@/components";
import { getAllFavorites } from "@/utils/favoritesLocalStorage";
import { getStaticPokemons } from "@/utils";
import { Pokemon } from "@/interfaces";

interface Props {
  pokemons: Pokemon[];
}

export const getStaticProps: GetStaticProps<Props> = async () =>
  await getStaticPokemons();

const FavoritesPage: NextPage<Props> = ({ pokemons }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mappedPokemons, setMappedPokemons] = useState<Pokemon[]>([]);
  const [favoritesHasChanged, setfavoritesHasChanged] = useState(false);

  const allPokemons: Record<string, Pokemon> = useMemo(
    () => pokemons.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {}),
    [pokemons],
  );

  useEffect(() => {
    setFavorites(() => {
      const allFavorites = getAllFavorites();
      setMappedPokemons(allFavorites.map((id) => allPokemons[id]));
      return allFavorites;
    });
  }, [allPokemons]);

  const reloadPokemons = () => {
    setFavorites(getAllFavorites());
    setfavoritesHasChanged(false);
  };

  const toggleHandler = () => {
    const storedFavorites = getAllFavorites();

    const allPokemonsAreInFavorite = favorites.every((favorite) =>
      storedFavorites.includes(favorite),
    );

    setfavoritesHasChanged(!allPokemonsAreInFavorite);
  };

  return (
    <MainLayout title="Favorites">
      <h1 className="mb-5 text-5xl font-bold">Favorites</h1>

      <div className="mb-5 flex h-10 justify-between">
        <Link href="/" underline="always">
          Back to home
        </Link>

        {favoritesHasChanged && (
          <Button color="primary" variant="ghost" onClick={reloadPokemons}>
            <span className="text-white">Clean List</span>
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-center">No favorites</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-6 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {mappedPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onToggle={toggleHandler}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default FavoritesPage;
