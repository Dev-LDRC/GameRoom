import { Link } from "react-router-dom";
import { routesHeaders } from "../../utils/routes-header";
import HamburgerMenuButton from "./HamburgerMenuButton";

interface MobileScreenProps {
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (open: boolean) => void;
	session: any;
	handleSignOut: () => void;
	closeMobileMenu: () => void;
}

export default function MobileScreen({
	mobileMenuOpen,
	setMobileMenuOpen,
	session,
	handleSignOut,
	closeMobileMenu,
}: MobileScreenProps) {
	return (
		<>
			{/* Mobile Navigation */}
			<div className="md:hidden flex justify-between items-center">
				<div className="flex items-center">
					<h1 className="font-bold text-2xl">GameRoom</h1>
				</div>

				<HamburgerMenuButton
					mobileMenuOpen={mobileMenuOpen}
					setMobileMenuOpen={setMobileMenuOpen}
				/>
			</div>

			{/* Mobile Menu Dropdown */}
			<div
				className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
					mobileMenuOpen ? "max-h-96" : "max-h-0"
				}`}
			>
				<div className="h-1 my-4 w-full bg-app-blue_light/20 rounded-full" />

				<nav className="flex flex-col gap-4">
					{routesHeaders.map((route) => (
						<Link
							className="hover:text-app-blue_light transition"
							key={route.label}
							to={route.url}
							onClick={closeMobileMenu}
						>
							{route.label}
						</Link>
					))}

					<div className="h-1 w-full bg-app-blue_light/20 rounded-full" />

					{session ? (
						<div className="flex flex-col gap-4">
							<Link
								className="hover:text-app-blue_light transition"
								to={"/profile"}
								onClick={closeMobileMenu}
							>
								Meu perfil
							</Link>
							<Link
								className="cursor-pointer rounded-md p-2.5 bg-app-blue_light text-app-black font-bold text-center transition hover:bg-app-blue_dark"
								to={"/game-room"}
								onClick={closeMobileMenu}
							>
								Vá para sua GameRoom
							</Link>
							<button
								className="cursor-pointer hover:text-app-blue_light transition text-left"
								onClick={() => {
									handleSignOut();
									closeMobileMenu();
								}}
							>
								Logout
							</button>
						</div>
					) : (
						<div className="flex flex-col gap-4">
							<Link
								className="cursor-pointer p-2 rounded-md bg-app-blue_light text-app-black font-bold text-center transition hover:bg-app-blue_dark"
								to={"/login"}
								onClick={closeMobileMenu}
							>
								Entrar
							</Link>
							<Link
								className="cursor-pointer p-2 rounded-md border-2 border-app-blue_light text-app-blue_light text-center transition hover:bg-app-blue_light/20"
								to={"/register"}
								onClick={closeMobileMenu}
							>
								Registrar
							</Link>
						</div>
					)}
				</nav>
			</div>
		</>
	);
}