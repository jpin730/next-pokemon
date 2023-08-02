import Head from "next/head";
import { FC, ReactNode } from "react";

import { NavBar } from "../ui";

interface Props {
  children: ReactNode;
  title?: string;
}

export const MainLayout: FC<Props> = ({ children, title }) => {
  const fullTitle = `Next Pokemon${title ? ` - ${title}` : ""}`;
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Jaime Pineda" />
        <meta name="description" content={fullTitle} />
        <meta name="keywords" content={`${fullTitle}, pokemon, pokedex`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavBar />

      <main className="container">{children}</main>
    </>
  );
};
