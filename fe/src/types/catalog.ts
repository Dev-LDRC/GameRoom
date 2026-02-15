export type GameTier = "Basic" | "Premium" | "Ultimate";

export const tierColors: Record<GameTier, string> = {
	Basic: "bg-app-black",
	Premium: "bg-app-blue_dark",
	Ultimate: "bg-app-purple",
};

export type Game = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	tier: GameTier;
	genre: string;
};

export type GameCardProps = {
	game: Game;
};
