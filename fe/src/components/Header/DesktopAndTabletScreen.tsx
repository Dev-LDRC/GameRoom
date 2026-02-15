import { Link } from "react-router-dom";
import { routesHeaders } from "../../utils/routes-header";

interface DesktopAndTabletScreenProps {
	session: any;
	handleSignOut: () => void;
}

export default function DesktopAndTabletScreen({
	session,
	handleSignOut,
}: DesktopAndTabletScreenProps) {
	return (
		<>
			{/* Desktop and Tablet Navigation */}
			<nav className="hidden md:flex justify-between items-center">
				<div className="flex items-center">
					<h1 className="font-bold text-2xl">GameRoom</h1>
				</div>

				<div className="flex items-center gap-10">
					{routesHeaders.map((route) => (
						<Link
							className="hover:text-app-blue_light hover:underline transition"
							key={route.label}
							to={route.url}
						>
							{route.label}
						</Link>
					))}
				</div>

				{session ? (
					<div className="flex items-center gap-5">
						<Link className="hover:underline transition" to={"/profile"}>
							Meu perfil
						</Link>
						<Link
							className="cursor-pointer rounded-md p-2.5 bg-app-blue_light text-app-black font-bold transition hover:bg-app-blue_dark"
							to={"/game-room"}
						>
							Vá para sua GameRoom
						</Link>
						<button
							className="cursor-pointer hover:underline transition"
							onClick={handleSignOut}
						>
							Logout
						</button>
					</div>
				) : (
					<div className="flex items-center gap-5">
						<Link
							className="cursor-pointer p-2 rounded-md bg-app-blue_light text-app-black font-bold text-center transition hover:bg-app-blue_dark"
							to={"/login"}
						>
							Entrar
						</Link>
						<Link
							className="cursor-pointer p-2 rounded-md border-2 border-app-blue_light text-app-blue_light text-center transition hover:bg-app-blue_light/20"
							to={"/register"}
						>
							Registrar
						</Link>
					</div>
				)}
			</nav>
		</>
	);
}