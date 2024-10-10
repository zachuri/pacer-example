"use client";

import { EBackend } from "@/consts/api";
import { IPokemon, IPokemonBaseUrl } from "@/types/pokemon";
import { memo, useEffect, useState } from "react";
import { PokemonCard } from "./pokemon/PokemonCard";
import { PokemonLayout } from "./pokemon/PokemonLayout";
import { Loading } from "./ui/loading";

export const Pokemons = memo(function Pokemons() {
	const [pokemons, setPokemons] = useState<IPokemon[] | null>();

	useEffect(() => {
		async function fetchPokemon() {
			try {
				const response = await fetch(EBackend.API_URL);

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json: IPokemonBaseUrl = await response.json();
				console.log(json);

				// Map through the results and add the id
				const pokemonsWithId =
					json.results?.map(pokemon => {
						const urlParts = pokemon.url.split("/");
						const id = parseInt(urlParts[urlParts.length - 2]);
						return { ...pokemon, id };
					}) || [];

				setPokemons(pokemonsWithId);
			} catch (error) {
				console.error(error);
			}
		}
		fetchPokemon();
	}, []);

	return (
		<>
			{!pokemons ? (
				<Loading />
			) : (
				<PokemonLayout>
					{pokemons.map(pokemon => (
						<PokemonCard key={pokemon.id} {...pokemon} />
					))}
				</PokemonLayout>
			)}
		</>
	);
});
