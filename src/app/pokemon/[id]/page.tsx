"use client";

import { API_URL } from "@/consts/api";
import { IPokemonInfo } from "@/types/pokemon";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const [pokemon, setPokemon] = useState<IPokemonInfo | undefined>(undefined);

	const params = useParams();
	const pokemonId = params.id;

	useEffect(() => {
		async function fetchPokemon() {
			try {
				const response = await fetch(`${API_URL}/${pokemonId}` || "");

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json: IPokemonInfo = await response.json();

				setPokemon(json);
				console.log(json);
			} catch (error) {
				console.error(error);
			}
		}
		fetchPokemon();
	}, [pokemonId]);

	return (
		<div className='flex flex-col items-center justify-center w-[300px]'>
			<h1>{pokemon?.forms[0].name}</h1>
		</div>
	);
}
