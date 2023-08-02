import { Button, Card, Grid, Image, Link, Row, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { PokemonFull, Sprites } from "@/interfaces";
import { MainLayout } from "@/components";
import { TOTAL_POKEMONS, capitalize } from "@/utils";
import pokeApi from "@/api/pokeApi";

interface Props {
  id: string;
  name: string;
  sprites: Sprites;
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const tempArray = [...Array(TOTAL_POKEMONS)].map(
    (_, index) => `${index + 1}`
  );
  const paths = tempArray.map((id) => ({
    params: { id, name: "x" },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${id}`);

  const { name, sprites } = data;

  const props: Props = { id, name, sprites };
  return { props };
};

const PokemonPage: NextPage<Props> = ({ id, name, sprites }) => {
  const capitalizedName = capitalize(name);
  const title = `${capitalizedName} #${id}`;

  const prev = +id > 1 && +id - 1;
  const next = +id < TOTAL_POKEMONS && +id + 1;

  return (
    <MainLayout title={title}>
      <Text h1>
        {capitalizedName} #{id}
      </Text>

      <Link underline href="/">
        Back to home
      </Link>

      <Grid.Container gap={2} css={{ padding: "1rem 0" }}>
        <Grid xs={12} md={4}>
          <Card css={{ padding: "2rem" }}>
            <Card.Body>
              <Card.Image
                src={sprites.other?.dream_world.front_default as string}
                alt={name}
                title={name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card css={{ padding: "1rem" }}>
            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Grid.Container gap={2}>
                <Grid xs={6} sm={3}>
                  <Image
                    src={sprites.front_default}
                    alt={name}
                    width={100}
                    height={100}
                  />
                </Grid>
                <Grid xs={6} sm={3}>
                  <Image
                    src={sprites.back_default}
                    alt={name}
                    width={100}
                    height={100}
                  />
                </Grid>
                <Grid xs={6} sm={3}>
                  <Image
                    src={sprites.front_shiny}
                    alt={name}
                    width={100}
                    height={100}
                  />
                </Grid>
                <Grid xs={6} sm={3}>
                  <Image
                    src={sprites.back_shiny}
                    alt={name}
                    width={100}
                    height={100}
                  />
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      <Row justify="space-between">
        {prev ? (
          <Button
            auto
            ghost
            as={Link}
            color="gradient"
            href={`/pokemon/${prev}`}
          >
            Pokemon #{prev}
          </Button>
        ) : (
          <span></span>
        )}

        {next ? (
          <Button
            auto
            ghost
            as={Link}
            color="gradient"
            href={`/pokemon/${next}`}
          >
            Pokemon #{next}
          </Button>
        ) : (
          <span></span>
        )}
      </Row>
    </MainLayout>
  );
};

export default PokemonPage;
