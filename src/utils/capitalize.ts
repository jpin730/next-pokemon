export const capitalize = (word: string): string =>
  word.at(0)?.toUpperCase() + word.substring(1);
