import { useEffect, useRef, useState } from "react";
import { type GameCardProps, tierColors } from "../types/catalog";

export function GameCardUser({ game }: GameCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [canBeTruncated, setCanBeTruncated] = useState(false);
	const descriptionRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (
			descriptionRef.current &&
			descriptionRef.current.scrollHeight >
				descriptionRef.current.clientHeight
		) {
			setCanBeTruncated(true);
		}
	}, []);

	return (
		<div className="group relative overflow-hidden rounded-xl bg-white shadow-lg">
			<div className="aspect-video w-full">
				<img
					alt={game.title}
					className="h-full w-full object-cover"
					src={game.imageUrl}
				/>
			</div>
			<div className="flex flex-col gap-4 p-4">
				<div className="flex items-center justify-between">
					<h2 className="font-extrabold">{game.title}</h2>
					<span
						className={`rounded-full px-2 py-1 text-white text-xs ${
							tierColors[game.tier]
						}`}
					>
						{game.tier}
					</span>
				</div>
				<div className="flex flex-col">
					<p
						className={`text-app-black text-sm ${
							isExpanded ? "" : "h-24 overflow-hidden"
						}`}
						ref={descriptionRef}
					>
						{game.description}
					</p>
					{canBeTruncated && (
						<button
							className="cursor-pointer text-center font-semibold text-blue-600 text-sm hover:underline"
							onClick={() => setIsExpanded(!isExpanded)}
						>
							<span>{isExpanded ? "Ler menos" : "Ler mais"}</span>
						</button>
					)}
				</div>
				<div className="flex items-center gap-5">
					<span className="text-app-black text-xs underline">
						{game.genre}
					</span>
					<button className="w-full cursor-pointer rounded-md bg-app-blue_dark px-2 py-3 font-bold text-app-black hover:bg-app-blue_light hover:text-app-black">
						JOGAR
					</button>
				</div>
			</div>
		</div>
	);
}
