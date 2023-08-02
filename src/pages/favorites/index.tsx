import { Link } from "@nextui-org/react";
import { NextPage } from "next";

import { MainLayout } from "@/components";

const FavoritesPage: NextPage = () => {
  return (
    <MainLayout title="Favorites">
      <h1 className="mb-5 text-5xl font-bold">Favorites</h1>

      <Link href="/" underline="always" className="mb-5">
        Back to home
      </Link>

      <p>No favorites</p>
    </MainLayout>
  );
};

export default FavoritesPage;
