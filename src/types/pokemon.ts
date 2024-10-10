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
	sprites: {
		front_default: string;
	};
	types: {
		type: {
			name: string;
		};
	}[];
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
	abilities: {
		ability: {
			name: string;
		};
	}[];
	base_experience: number;
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
