import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Pokemon = {
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
    [x: string | number | symbol]: unknown;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
    }[];
  }[];
  [x: string | number | symbol]: unknown;
};

export type Species = {
  name: string;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
  }[];
};

export const pokeApi = createApi({
  reducerPath: "pokeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonByNumber: builder.query<Pokemon, number>({
      query: (number) => `pokemon/${number}`,
    }),
    getSpeciesByNumber: builder.query<Species, number>({
      query: (number) => `pokemon-species/${number}`,
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonByNumberQuery,
  useGetSpeciesByNumberQuery,
} = pokeApi;

export default pokeApi;
