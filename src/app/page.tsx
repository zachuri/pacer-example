"use client";

import { EBackend } from "@/consts/api";
import { IPokemon, IPokemonBaseUrl } from "@/types/pokemon";
import Image from "next/image";
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
		<div className='flex flex-col justify-center items-center min-h-screen'>
			<h1 className='font-medium text-5xl'>Pokemon Finder</h1>
			<ul>
				{pokemons?.map(pokemon => (
					<div key={pokemon.name} className='flex flex-row'>
						<li>{pokemon.name}</li>
						<Image
							alt={`${pokemon.name}`}
							width={100}
							height={100}
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
						/>
					</div>
				))}
			</ul>
		</div>
	);
}
