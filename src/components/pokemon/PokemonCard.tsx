import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { hasFavorite, toggleFavorite } from "@/utils/favoritesLocalStorage";
import { Pokemon } from "@/interfaces";
import { HeartIcon } from "../icons";

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);

  const { id, image, name } = pokemon;

  useEffect(() => {
    setIsFavorite(hasFavorite(id));
  }, [id]);

  const onClick = () => {
    router.push(`/pokemon/${id}`);
  };

  const onToggleFavorite = () => {
    toggleFavorite(id);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative">
      <Card isHoverable isPressable onClick={onClick} className="w-full">
        <CardHeader>
          <Image
            removeWrapper
            src={image}
            alt={name}
            className="mx-auto h-40"
          />
        </CardHeader>
        <CardBody>
          <p className="flex justify-between">
            <span>{name}</span>
            <span>#{id}</span>
          </p>
        </CardBody>
      </Card>

      <Button
        isIconOnly
        color="danger"
        variant="light"
        className="absolute right-0 top-0 z-10"
        onClick={onToggleFavorite}
      >
        <HeartIcon filled={isFavorite} />
      </Button>
    </div>
  );
};
