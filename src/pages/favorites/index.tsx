import { Link, Text } from "@nextui-org/react";
import { NextPage } from "next";

import { MainLayout } from "@/components";

const FavoritesPage: NextPage = () => {
  return (
    <MainLayout title="Favorites">
      <Text h1>Favorites</Text>

      <Link underline href="/">
        Back to home
      </Link>
    </MainLayout>
  );
};

export default FavoritesPage;
