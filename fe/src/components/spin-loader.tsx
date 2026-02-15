import { type ClassNameValue, twMerge } from "tailwind-merge";

type SpinLoaderProps = {
	className?: ClassNameValue;
};

export function SpinLoader({ className = "" }: SpinLoaderProps) {
	return (
		<div
			className={twMerge(
				"h-5 w-5 animate-spin rounded-full border-5 border-app-black border-t-transparent",
				className,
			)}
		/>
	);
}
