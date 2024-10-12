"use client";

import { IPokemon } from "@/types/pokemon";
import {
	Activity,
	Award,
	Crosshair,
	Heart,
	Shield,
	Sparkles,
	Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function PokemonCard({
	id,
	name,
	sprites,
	types,
	stats,
	abilities,
	base_experience,
}: IPokemon) {
	return (
		<Link href={`/pokemon/${id}`}>
			<Card
				key={id}
				className='overflow-hidden w-[300px]
        hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 cursor-pointer
        '>
				<CardHeader className='p-0'>
					<div className='relative h-48 bg-gray-100'>
						<Image
							src={sprites.front_default}
							alt={name}
							width={100}
							height={100}
							className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full object-contain'
						/>
					</div>
				</CardHeader>
				<CardContent className='p-4'>
					<CardTitle className='text-xl font-semibold mb-2 capitalize'>
						{name}
					</CardTitle>
					<div className='flex flex-wrap gap-2 mb-4'>
						{types.map(type => (
							<Badge
								key={type.type.name}
								variant='secondary'
								className='capitalize'>
								{type.type.name}
							</Badge>
						))}
					</div>
					<div className='grid grid-cols-2 gap-2 text-sm mb-4'>
						<div className='flex items-center'>
							<Heart className='w-4 h-4 mr-1 text-red-500' />
							<span>
								HP: {stats.find(stat => stat.stat.name === "hp")?.base_stat}
							</span>
						</div>
						<div className='flex items-center'>
							<Zap className='w-4 h-4 mr-1 text-yellow-500' />
							<span>
								Attack:{" "}
								{stats.find(stat => stat.stat.name === "attack")?.base_stat}
							</span>
						</div>
						<div className='flex items-center'>
							<Shield className='w-4 h-4 mr-1 text-blue-500' />
							<span>
								Defense:{" "}
								{stats.find(stat => stat.stat.name === "defense")?.base_stat}
							</span>
						</div>
						<div className='flex items-center'>
							<Activity className='w-4 h-4 mr-1 text-green-500' />
							<span>
								Speed:{" "}
								{stats.find(stat => stat.stat.name === "speed")?.base_stat}
							</span>
						</div>
						<div className='flex items-center'>
							<Crosshair className='w-4 h-4 mr-1 text-purple-500' />
							<span>
								Sp. Atk:{" "}
								{
									stats.find(stat => stat.stat.name === "special-attack")
										?.base_stat
								}
							</span>
						</div>
						<div className='flex items-center'>
							<Sparkles className='w-4 h-4 mr-1 text-indigo-500' />
							<span>
								Sp. Def:{" "}
								{
									stats.find(stat => stat.stat.name === "special-defense")
										?.base_stat
								}
							</span>
						</div>
					</div>
					<div className='mb-2'>
						<h3 className='font-semibold mb-1'>Abilities:</h3>
						<div className='flex flex-wrap gap-2'>
							{abilities.map(ability => (
								<Badge
									key={ability.ability.name}
									variant='outline'
									className='capitalize'>
									{ability.ability.name}
								</Badge>
							))}
						</div>
					</div>
					<div className='flex items-center text-sm'>
						<Award className='w-4 h-4 mr-1 text-amber-500' />
						<span>Base Experience: {base_experience}</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
