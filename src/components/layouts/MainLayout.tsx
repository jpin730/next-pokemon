import Head from "next/head";
import { FC, ReactNode } from "react";

import { NavBar } from "../ui";

type PropTypes = {
  children: ReactNode;
  title?: string;
};

export const MainLayout: FC<PropTypes> = ({
  children,
  title = "Next Pokemon",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Jaime Pineda" />
        <meta name="description" content={title} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>

      <NavBar />

      <main className="container">{children}</main>
    </>
  );
};
