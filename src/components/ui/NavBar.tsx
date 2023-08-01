import { Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <div>
      <Row className="container" justify="space-between">
        <Link href="/">
          <Text h2 weight="light">
            Next Pokemon
          </Text>
        </Link>
      </Row>
    </div>
  );
};
