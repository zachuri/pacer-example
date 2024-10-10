"use client";

import { IPokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

export function PokemonCard({ id, name }: IPokemon) {
	return (
		<Card className='flex flex-col justify-center items-center'>
			<Link href={`/pokemon/${id}`}>
				<Image
					alt={`${name}`}
					width={100}
					height={100}
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
				/>
			</Link>
			<h1 className='capitalize'>{name}</h1>
		</Card>
	);
}
