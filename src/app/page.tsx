"use client";

import { EBackend } from "@/consts/api";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		async function fetchPokemon() {
			try {
				const response = await fetch(EBackend.API_URL);

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json = await response.json();
				console.log(json);
			} catch (error) {
				console.error(error);
			}
		}

		fetchPokemon();
	}, []);

	return (
		<div className='flex flex-col justify-center items-center min-h-screen'>
			<h1 className='font-medium text-5xl'>Pokemon Finder</h1>
		</div>
	);
}
