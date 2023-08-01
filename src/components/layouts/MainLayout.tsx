import Head from "next/head";
import { FC, ReactNode } from "react";

import { NavBar } from "../ui";

interface Props {
  children: ReactNode;
  title?: string;
}

export const MainLayout: FC<Props> = ({ children, title = "Next Pokemon" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Jaime Pineda" />
        <meta name="description" content={title} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavBar />

      <main className="container">{children}</main>
    </>
  );
};
