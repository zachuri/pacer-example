import { Pokemons } from "@/components/Pokemons";

export default function Home() {
	return (
		<div className='mx-auto flex flex-col justify-center items-center min-h-screen gap-10'>
			<h1 className='font-medium text-5xl uppercase'>Pokedex</h1>
			<Pokemons />
		</div>
	);
}
