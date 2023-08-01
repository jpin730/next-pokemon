import { FC } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";

import { Pokemon } from "@/interfaces";
import { useRouter } from "next/router";

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
    <Grid xs={6} sm={3} md={2} title={name}>
      <Card isHoverable isPressable onClick={onClick}>
        <Card.Body>
          <Card.Image src={image} width="100%" height={140} alt={name} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text>{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
