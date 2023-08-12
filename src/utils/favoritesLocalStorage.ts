import { FAVORITES_LOCAL_STORAGE } from "./constants";

export const toggleFavorite = (id: string) => {
  const favoriteArr: string[] = JSON.parse(
    localStorage.getItem(FAVORITES_LOCAL_STORAGE) || "[]",
  );

  const favoriteSet = new Set(favoriteArr);

  favoriteSet.has(id) ? favoriteSet.delete(id) : favoriteSet.add(id);

  const sortedArr = Array.from(favoriteSet).sort((a, b) => a.localeCompare(b));

  localStorage.setItem(FAVORITES_LOCAL_STORAGE, JSON.stringify(sortedArr));
};

export const hasFavorite = (id: string): boolean => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem(FAVORITES_LOCAL_STORAGE) || "[]",
  );

  return favorites.includes(id);
};

export const getAllFavorites = (): string[] =>
  JSON.parse(localStorage.getItem(FAVORITES_LOCAL_STORAGE) || "[]");
