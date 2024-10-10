interface IPokemonLayout {
  children: React.ReactNode;
}

export function PokemonLayout({children} : IPokemonLayout) {
  return (
    <div className='grid grid-cols-4 gap-10'>
      {children}
    </div>
  )
}