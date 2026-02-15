import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import MobileScreen from "./MobileScreen";
import DesktopAndTabletScreen from "./DesktopAndTabletScreen";

export function Header() {

	const { data: session } = authClient.useSession();

	const navigate = useNavigate();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	function handleSignOut() {
		authClient.signOut();
		navigate("/login");
	}

	function closeMobileMenu() {
		setMobileMenuOpen(false);
	}

	return (
		<header className="bg-app-black p-5 text-white">
			<DesktopAndTabletScreen
				session={session}
				handleSignOut={handleSignOut}
			/>
			<MobileScreen
				mobileMenuOpen={mobileMenuOpen}
				setMobileMenuOpen={setMobileMenuOpen}
				session={session}
				handleSignOut={handleSignOut}
				closeMobileMenu={closeMobileMenu}
			/>
		</header>
	);
}
