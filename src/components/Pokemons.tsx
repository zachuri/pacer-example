"use client";

import { API_URL } from "@/consts/api";
import usePokemonStore from "@/store/pokemonStore";
import { IPokemon } from "@/types/pokemon";
import { memo, useCallback, useEffect, useState } from "react";
import { PokemonCard } from "./pokemon/PokemonCard";
import { PokemonLayout } from "./pokemon/PokemonLayout";
import PokemonSkeletonCard from "./pokemon/PokemonSkeletonCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export const Pokemons = memo(function Pokemons() {
	const [search, setSearch] = useState("");
	const [error, setError] = useState<string | null>("");
	const [apiUrl, setApiUrl] = useState<string | null>(API_URL);
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);
	const [displayedPokemons, setDisplayedPokemons] = useState<IPokemon[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// NOTE: I wanted to use Zustand stage but there is a limited amount of storage for the pokemons
	// Will use useState for now as I can search through the 100+ fetch pokemons
	const { isLoadingPokemons, setIsLoadingPokemons } = usePokemonStore();
	const [next, setNext] = useState<string | null>(null);
	const [previous, setPrevious] = useState<string | null>(null);

	const [itemsPerPage, setItemsPerPage] = useState<number>(6);

	const fetchPokemon = useCallback(async () => {
		console.log("FETCHED");
		try {
			const response = await fetch(
				`${API_URL}?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`
			);

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			const json = await response.json();

			const pokemonDetails = await Promise.all(
				json.results.map(async (pokemon: { url: string }) => {
					const res = await fetch(pokemon.url);
					return res.json();
				})
			);

			setPokemons(pokemonDetails);
			setIsLoadingPokemons(false);
			setNext(json.next);
			setPrevious(json.previous);
			setTotalPages(Math.ceil(json.count / itemsPerPage));
		} catch (error) {
			console.error(error);
			setError("Failed to fetch data");
			setIsLoadingPokemons(false);
		}
	}, [currentPage, itemsPerPage, setIsLoadingPokemons]);

	useEffect(() => {
		setIsLoadingPokemons(true);
		fetchPokemon();
	}, [currentPage, itemsPerPage, fetchPokemon]);

	useEffect(() => {
		const filteredPokemon = pokemons.filter(
			pokemon =>
				pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
				pokemon.types.some(type =>
					type.type.name.toLowerCase().includes(search.toLowerCase())
				)
		);
		setDisplayedPokemons(filteredPokemon);
	}, [search, pokemons]);

	function handleNext() {
		if (currentPage < totalPages) {
			setCurrentPage(prev => prev + 1);
		}
	}

	function handlePrevious() {
		if (currentPage > 1) {
			setCurrentPage(prev => prev - 1);
		}
	}

	const handleLimitChange = (value: string) => {
		const newLimit = parseInt(value, 10);
		setItemsPerPage(newLimit);
		setCurrentPage(1); // Reset to first page when changing limit
	};

	function Navigation() {
		return (
			<div className='flex col-span-full items-center justify-center gap-4'>
				<Button onClick={handlePrevious} disabled={currentPage === 1}>
					Previous
				</Button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<Button onClick={handleNext} disabled={currentPage === totalPages}>
					Next
				</Button>
			</div>
		);
	}

	if (error) {
		return <div className='text-center text-red-500'>{error}</div>;
	}

	return (
		<PokemonLayout>
			<div className='col-span-full flex flex-row gap-5'>
				<Input
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='Enter your favorite pokemon'
				/>
				<Select
					onValueChange={handleLimitChange}
					value={itemsPerPage.toString()}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Limit' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='6'>6</SelectItem>
						<SelectItem value='12'>12</SelectItem>
						<SelectItem value='20'>20</SelectItem>
					</SelectContent>
				</Select>
			</div>
			{isLoadingPokemons && pokemons.length === 0
				? Array(6)
						.fill(0)
						.map((_, index) => <PokemonSkeletonCard key={index} />)
				: displayedPokemons.map(pokemon => (
						<PokemonCard key={pokemon.id} {...pokemon} />
				  ))}
			<Navigation />
		</PokemonLayout>
	);
});
