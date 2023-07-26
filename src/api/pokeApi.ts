import axios from "axios";

export interface PokeApiResponse<T> {
  results: T;
}

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default pokeApi;
