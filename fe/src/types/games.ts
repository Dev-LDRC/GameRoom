export interface Genre {
	id: number;
	name: string;
	slug: string;
}

export interface GameProps {
	id: number;
	name: string;
	background_image: string;
	genres: Genre[];
}
