import { Button, Card, Image } from "@nextui-org/react";
import { FC, MouseEvent, useState } from "react";
import { useRouter } from "next/router";

import { toggleFavorite } from "@/utils/favoritesLocalStorage";
import { getPokemonImageUrl } from "@/utils";
import { HeartIcon } from "../icons";

interface Props {
  id: string;
}

export const PokemonFavoriteCard: FC<Props> = ({ id }) => {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(true);

  const image = getPokemonImageUrl(id);

  const onClickCard = () => {
    router.push(`/pokemon/${id}`);
  };

  const onToggleFavorite = (event: MouseEvent) => {
    event.stopPropagation();
    toggleFavorite(id);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative">
      <Card
        isHoverable
        isPressable
        onClick={onClickCard}
        className="z-0 w-full p-4"
      >
        <Image
          removeWrapper
          src={image}
          alt="Favorite Pokemon"
          className="mx-auto h-40"
        />
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
