"use client";

import { EBackend } from "@/consts/api";
import { IPokemon, IPokemonBaseUrl } from "@/types/pokemon";
import { useEffect, useState } from "react";

export default function Home() {
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
				setPokemons(json.results);
			} catch (error) {
				console.error(error);
			}
		}

		fetchPokemon();
	}, []);

	return (
		<div className='flex flex-col justify-center items-center min-h-screen'>
			<h1 className='font-medium text-5xl'>Pokemon Finder</h1>
			<ul>
				{pokemons?.map(pokemon => (
					<li key={pokemon.name}>{pokemon.name}</li>
				))}
			</ul>
		</div>
	);
}
