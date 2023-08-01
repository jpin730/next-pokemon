import { FC } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";

import { Pokemon } from "@/interfaces";

type PropTypes = {
  pokemon: Pokemon;
};

export const PokemonCard: FC<PropTypes> = ({ pokemon }) => {
  const { id, image, name } = pokemon;
  return (
    <Grid xs={6} sm={3} md={2} title={name}>
      <Card isHoverable isPressable>
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
