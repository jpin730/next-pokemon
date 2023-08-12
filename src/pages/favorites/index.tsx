import { Button, Card, CardBody, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NextPage } from "next";

import { MainLayout, PokemonFavoriteCard } from "@/components";
import { getAllFavorites } from "@/utils/favoritesLocalStorage";

const FavoritesPage: NextPage = () => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [pokemonsHasChanged, setPokemonsHasChanged] = useState(false);

  useEffect(() => {
    setPokemons(getAllFavorites());
  }, []);

  const reloadPokemons = () => {
    setPokemons(getAllFavorites());
    setPokemonsHasChanged(false);
  };

  const toggleHandler = () => {
    const favorites = getAllFavorites();

    const allPokemonsAreInFavorite = pokemons.every((pokemon) =>
      favorites.includes(pokemon),
    );

    setPokemonsHasChanged(!allPokemonsAreInFavorite);
  };

  return (
    <MainLayout title="Favorites">
      <h1 className="mb-5 text-5xl font-bold">Favorites</h1>

      <div className="mb-5 flex h-10 justify-between">
        <Link href="/" underline="always">
          Back to home
        </Link>

        {pokemonsHasChanged && (
          <Button color="primary" variant="ghost" onClick={reloadPokemons}>
            Clean List
          </Button>
        )}
      </div>

      {pokemons.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-center">No favorites</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-6 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {pokemons.map((id) => (
            <PokemonFavoriteCard key={id} id={id} onToggle={toggleHandler} />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default FavoritesPage;
