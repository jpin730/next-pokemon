import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";

import { toggleFavorite } from "@/utils/favoritesLocalStorage";
import { getPokemonImageUrl } from "@/utils";
import { HeartIcon } from "../icons";

interface Props {
  id: string;
  onToggle: () => void;
}

export const PokemonFavoriteCard: FC<Props> = ({ id, onToggle }) => {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(true);

  const image = getPokemonImageUrl(id);

  const onClickCard = () => {
    router.push(`/pokemon/${id}`);
  };

  const onToggleFavorite = () => {
    toggleFavorite(id);
    setIsFavorite(!isFavorite);
    onToggle();
  };

  return (
    <div className="relative">
      <Card
        isHoverable
        isPressable
        onClick={onClickCard}
        className="z-0 w-full"
      >
        <CardHeader>
          <Image
            removeWrapper
            src={image}
            alt="Favorite Pokemon"
            className="mx-auto h-40"
          />
        </CardHeader>
        <CardBody>
          <p className="text-center">#{id}</p>
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
