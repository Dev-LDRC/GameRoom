interface HamburgerMenuButtonProps {
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (open: boolean) => void;
}

export default function HamburgerMenuButton({
	mobileMenuOpen,
	setMobileMenuOpen,
}: HamburgerMenuButtonProps) {
	return (
		<button
			onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
			className="flex flex-col gap-1.5 justify-center"
		>
			<span
				className={`h-0.5 w-6 bg-white transition-all duration-300 ${
					mobileMenuOpen ? "rotate-45 translate-y-2" : ""
				}`}
			/>
			<span
				className={`h-0.5 w-6 bg-white transition-all duration-300 ${
					mobileMenuOpen ? "opacity-0" : ""
				}`}
			/>
			<span
				className={`h-0.5 w-6 bg-white transition-all duration-300 ${
					mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
				}`}
			/>
		</button>
	);
}