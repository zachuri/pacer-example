import { IPokemon } from "@/types/pokemon";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IPokemonState {
	pokemons: IPokemon[];
	isLoadingPokemons: boolean;
	setPokemons: (pokemons: IPokemon[]) => void;
	setIsLoadingPokemons: (isLoading: boolean) => void;
	addPokemon: (pokemon: IPokemon) => void;
	removePokemon: (id: number) => void;
	clearPokemons: () => void;
}

const usePokemonStore = create<IPokemonState>()(
	persist(
		set => ({
			pokemons: [],
			isLoadingPokemons: true,
			setPokemons: pokemons => set({ pokemons }),
			setIsLoadingPokemons: isLoading => set({ isLoadingPokemons: isLoading }),
			addPokemon: pokemon =>
				set(state => ({
					pokemons: [...state.pokemons, pokemon],
				})),
			removePokemon: id =>
				set(state => ({
					pokemons: state.pokemons.filter(p => p.id !== id),
				})),
			clearPokemons: () => set({ pokemons: [] }),
		}),
		{
			name: "pokemon-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default usePokemonStore;
