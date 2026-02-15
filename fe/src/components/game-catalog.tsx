import { useState } from "react";
import type { GameTier } from "../types/catalog";
import { GameCard } from "./game-card";
import { useGames } from "../http/games";

export function GameCatalog() {
   const { data: getGames } = useGames()

	const [selectedTier, setSelectedTier] = useState<GameTier | "All">("All");

	const filteredGames = (getGames || []).filter((game: any) => {
		if (selectedTier === "All") {
			return true;
		}
		return game.tier === selectedTier;
	});

	return (
		<div className="flex flex-col gap-12">
			<div className="flex flex-col gap-8 text-center">
				<div className="flex flex-col gap-4">
					<h2 className="font-bold text-4xl">Catálogo de jogos</h2>
					<p className="mx-auto max-w-2xl text-app-black">
						Explore nossa coleção de jogos disponíveis em diferentes
						níveis de assinatura.
					</p>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-4">
					{["All", "Basic", "Premium", "Ultimate"].map((tier) => (
						<button
							className={`cursor-pointer rounded-md px-4 py-2 font-medium transition ${
								selectedTier === tier
									? "border-4 border-app-black text-app-black"
									: "bg-app-white text-black hover:bg-app-gray"
							}`}
							key={tier}
							onClick={() => setSelectedTier(tier as GameTier | "All")}
						>
							{tier}
						</button>
					))}
				</div>
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filteredGames?.map((game: any) => (
					<GameCard game={game} key={game.id} />
				))}
			</div>
		</div>
	);
}
