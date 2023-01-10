import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Pokemon {
	species: {
		name: string;
	};
	sprites: { front_shiny: any };
}

export const pokeApi = createApi({
	reducerPath: "pokeApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://pokeapi.co/api/v2/",
	}),
	endpoints: (builder) => ({
		testEndPoint: builder.query<any, string>({
			query: () => `pokemon/bulbasaur`,
		}),
		getPokemonByName: builder.query<any, string>({
			query: (name) => `pokemon/${name}`,
		}),
		getPokemonByNumber: builder.query<any, number>({
			query: (number) => `pokemon/${number}`,
		}),
	}),
});

export const {
	useGetPokemonByNameQuery,
	useGetPokemonByNumberQuery,
	useTestEndPointQuery,
} = pokeApi;

export default pokeApi;
