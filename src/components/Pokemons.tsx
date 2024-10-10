"use client";

import { API_URL } from "@/consts/api";
import { IPokemon, IPokemonBaseUrl } from "@/types/pokemon";
import { memo, useEffect, useState } from "react";
import { PokemonCard } from "./pokemon/PokemonCard";
import { PokemonLayout } from "./pokemon/PokemonLayout";
import { Button } from "./ui/button";
import { Loading } from "./ui/loading";

export const Pokemons = memo(function Pokemons() {
	const [apiUrl, setApiUrl] = useState<string | null>(API_URL);
	const [pokemons, setPokemons] = useState<IPokemon[] | null>();
	const [next, setNext] = useState<string | null>(null);
	const [previous, setPrevious] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPokemon() {
			try {
				const response = await fetch(apiUrl || "");

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
				setNext(json.next);
				setPrevious(json.previous);
			} catch (error) {
				console.error(error);
			}
		}
		fetchPokemon();
	}, [apiUrl]); // Remove next and previous from dependencies

	function handleNext() {
		if (next) setApiUrl(next);
	}

	function handlePrevious() {
		if (previous) setApiUrl(previous);
	}

	return (
		<>
			{!pokemons ? (
				<Loading />
			) : (
				<PokemonLayout>
					{pokemons.map(pokemon => (
						<PokemonCard key={pokemon.id} {...pokemon} />
					))}
					<div className='flex col-span-4 items-center justify-center gap-4'>
						<Button onClick={handlePrevious} disabled={!previous}>
							Previous
						</Button>
						<Button onClick={handleNext} disabled={!next}>
							Next
						</Button>
					</div>
				</PokemonLayout>
			)}
		</>
	);
});
