interface IPokemonLayout {
	children: React.ReactNode;
}

export function PokemonLayout({ children }: IPokemonLayout) {
	return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
			{children}
    </div>
	);
}
