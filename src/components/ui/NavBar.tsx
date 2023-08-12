import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

export const NavBar: FC = () => {
  return (
    <nav className="sticky top-0 z-50 mb-3 bg-black/60 py-2 backdrop-blur">
      <div className="app-container flex items-center justify-between ">
        <Link href="/" className="hoverable text-2xl font-light sm:text-3xl">
          Next Pokemon
        </Link>

        <Button as={Link} color="danger" variant="ghost" href="/favorites">
          <span className="text-white">Favorites</span>
        </Button>
      </div>
    </nav>
  );
};
