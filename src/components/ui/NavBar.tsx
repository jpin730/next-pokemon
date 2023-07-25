import { Text } from "@nextui-org/react";
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <Text h2 weight="light">
        Next Pokemon
      </Text>
    </div>
  );
};
