import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NextPage } from "next";

import { MainLayout, PokemonFavoriteCard } from "@/components";
import { getAllFavorites } from "@/utils/favoritesLocalStorage";

const FavoritesPage: NextPage = () => {
  const [pokemons, setPokemons] = useState<string[]>([]);

  useEffect(() => {
    setPokemons(getAllFavorites());
  }, []);

  return (
    <MainLayout title="Favorites">
      <h1 className="mb-5 text-5xl font-bold">Favorites</h1>

      <Link href="/" underline="always" className="mb-5">
        Back to home
      </Link>

      {pokemons.length === 0 ? (
        <p>No favorites</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-6 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {pokemons.map((id) => (
            <PokemonFavoriteCard key={id} id={id} />
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default FavoritesPage;
