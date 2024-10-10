export interface IPokemon {
	name: string;
	url: string;
}

export interface IPokemonBaseUrl {
	count: number;
	next: string | null;
	previous: string | null;
	results: IPokemon[] | null;
}
