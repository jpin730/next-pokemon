import { FAVORITES_LOCAL_STORAGE } from "./constants";

export const toggleFavorite = (id: string) => {
  const favoriteArr: string[] = JSON.parse(
    localStorage.getItem(FAVORITES_LOCAL_STORAGE) || "[]",
  );

  const favoriteSet = new Set(favoriteArr);

  favoriteSet.has(id) ? favoriteSet.delete(id) : favoriteSet.add(id);

  localStorage.setItem(
    FAVORITES_LOCAL_STORAGE,
    JSON.stringify(Array.from(favoriteSet)),
  );
};

export const hasFavorite = (id: string): boolean => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem(FAVORITES_LOCAL_STORAGE) || "[]",
  );

  return favorites.includes(id);
};

export const getAllFavorites = (): string[] =>
  JSON.parse(localStorage.getItem(FAVORITES_LOCAL_STORAGE) || "[]");
