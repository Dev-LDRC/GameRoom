import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./Header/header";

export function Layout() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="min-h-screen bg-app-white p-10">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
