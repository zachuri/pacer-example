interface IAbility {
	ability: {
		name: string;
		url: string;
	};
	is_hidden: boolean;
	slot: number;
}

interface IForm {
	name: string;
	url: string;
}

interface ISpriteSet {
	back_default: string;
	back_gray: string;
	back_transparent: string;
	front_default: string;
	front_gray: string;
	front_transparent: string;
}

export interface IPokemon {
	id: number;
	name: string;
	url: string;
}


export interface IPokemonBaseUrl {
	count: number;
	next: string | null;
	previous: string | null;
	results: IPokemon[] | null;
}

export interface IPokemonInfo {
	abilities: IAbility[];
	base_experience: number;
	cries: {
		latest: string;
		legacy: string;
	};
	forms: IForm[];
	sprites: ISpriteSet;
}
