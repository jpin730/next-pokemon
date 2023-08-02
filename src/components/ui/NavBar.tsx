import { Button, Navbar, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

import { HeartIcon } from "../icons";

export const NavBar: FC = () => {
  return (
    <Navbar variant="sticky" css={{ width: "100%" }}>
      <Row
        className="container"
        justify="space-between"
        align="center"
        wrap="wrap"
      >
        <Navbar.Brand>
          <Link href="/" style={{ display: "flex", gap: "0.5rem" }}>
            <Text h2 weight="light" className="hoverable" css={{ margin: 0 }}>
              Next Pokemon
            </Text>
          </Link>
        </Navbar.Brand>

        <Navbar.Content>
          <Button
            auto
            ghost
            as={Link}
            color="error"
            href="/favorites"
            icon={<HeartIcon filled />}
          >
            <Text color="white">Favorites</Text>
          </Button>
        </Navbar.Content>
      </Row>
    </Navbar>
  );
};
