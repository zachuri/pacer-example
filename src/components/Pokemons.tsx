"use client";

import { EBackend } from "@/consts/api";
import { IPokemon, IPokemonBaseUrl } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { Card } from "./ui/card";
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
				<div className='grid grid-cols-4 gap-10'>
					{pokemons.map(pokemon => (
						<Card
							key={pokemon.name}
							className='flex flex-col justify-center items-center'>
							<Link href={pokemon.url}>
								<Image
									alt={`${pokemon.name}`}
									width={100}
									height={100}
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
								/>
							</Link>
							<h1 className='capitalize'>{pokemon.name}</h1>
						</Card>
					))}
				</div>
			)}
		</>
	);
});
