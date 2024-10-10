import { Pokemons } from "@/components/Pokemons";

export default function Home() {
	return (
		<div className='flex flex-col justify-center items-center min-h-screen gap-10'>
			<h1 className='font-medium text-5xl'>Pokemon Finder</h1>
			<Pokemons />
		</div>
	);
}
