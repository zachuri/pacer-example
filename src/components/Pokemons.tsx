"use client";

import { API_URL } from "@/consts/api";
import { IPokemon } from "@/types/pokemon";
import { memo, useEffect, useState } from "react";
import { PokemonCard } from "./pokemon/PokemonCard";
import { PokemonLayout } from "./pokemon/PokemonLayout";
import PokemonSkeletonCard from "./pokemon/PokemonSkeletonCard";
import { Button } from "./ui/button";

export const Pokemons = memo(function Pokemons() {
	const [error, setError] = useState<string | null>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [apiUrl, setApiUrl] = useState<string | null>(API_URL);
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);
	const [next, setNext] = useState<string | null>(null);
	const [previous, setPrevious] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPokemon() {
			try {
				const response = await fetch(`${apiUrl}?limit=6` || "");

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json = await response.json();

				// Map through the results and add the id

				const pokemonDetails = await Promise.all(
					json.results.map(async (pokemon: { url: string }) => {
						const res = await fetch(pokemon.url);
						return res.json();
					})
				);

				setPokemons(pokemonDetails);
				setIsLoading(false);
				setNext(json.next);
				setPrevious(json.previous);
			} catch (error) {
				console.error(error);
				setError("Failed to fetch data");
				setIsLoading(false);
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

	function Navigation() {
		return (
			<div className='flex col-span-4 items-center justify-center gap-4'>
				<Button onClick={handlePrevious} disabled={!previous}>
					Previous
				</Button>
				<Button onClick={handleNext} disabled={!next}>
					Next
				</Button>
			</div>
		);
	}

	if (error) {
		return <div className='text-center text-red-500'>{error}</div>;
	}

	return (
		<>
			<PokemonLayout>
				{isLoading
					? Array(6)
							.fill(0)
							.map((_, index) => <PokemonSkeletonCard key={index} />)
					: pokemons.map(pokemon => (
							<PokemonCard key={pokemon.id} {...pokemon} />
					  ))}
			</PokemonLayout>
			<Navigation />
		</>
	);
});
