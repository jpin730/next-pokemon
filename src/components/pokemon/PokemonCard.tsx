import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";

import { Pokemon } from "@/interfaces";

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const { id, image, name } = pokemon;

  const onClick = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Card isHoverable isPressable onClick={onClick} title={name}>
      <CardHeader className="justify-center py-0 sm:py-3">
        <Image src={image} alt={name} className="m-auto h-40" />
      </CardHeader>

      <CardBody className="py-2 sm:p-5">
        <p className="flex justify-between">
          <span>{name}</span>
          <span>#{id}</span>
        </p>
      </CardBody>
    </Card>
  );
};
