"use client";

import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { API_URL } from "@/consts/api";
import { IPokemonInfo } from "@/types/pokemon";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const [pokemon, setPokemon] = useState<IPokemonInfo | undefined>(undefined);

	const params = useParams();
	const pokemonId = params.id;

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPokemon() {
			try {
				const response = await fetch(`${API_URL}/${pokemonId}` || "");

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const data = await response.json();

				setPokemon(data);
				console.log(response);
			} catch (error) {
				setError("Failed to load Pokemon");
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchPokemon();
	}, [pokemonId]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	if (!pokemon) return <div>No Pokémon found</div>;

	return (
		<div className='flex flex-col items-center justify-center w-[300px]'>
			<PokemonCard {...pokemon} />
		</div>
	);
}
