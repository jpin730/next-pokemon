import Head from "next/head";
import { FC, ReactNode } from "react";

import { NavBar } from "../ui";
import { getPokemonImageUrl } from "@/utils";

interface Props {
  children: ReactNode;
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const MainLayout: FC<Props> = ({ children, title }) => {
  const fullTitle = `Next Pokemon${title ? ` - ${title}` : ""}`;
  const description = title
    ? title === "Favorites"
      ? title
      : `Pokemon ${title}`
    : "First Generation Pokemons";

  const id = title?.split("#").at(-1);
  const image =
    id && id !== "Favorites" ? getPokemonImageUrl(id) : `${origin}/favicon.ico`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Jaime Pineda" />
        <meta name="description" content={fullTitle} />
        <meta name="keywords" content={`${fullTitle}, pokemon, pokedex`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content={fullTitle} />
        <meta
          property="og:description"
          content={`This page is about ${description}`}
        />
        <meta property="og:image" content={image} />
      </Head>

      <div className="min-h-screen bg-background text-foreground dark">
        <NavBar />
        <main className="app-container">{children}</main>
      </div>
    </>
  );
};
