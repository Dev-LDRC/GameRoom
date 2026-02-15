"use client";

import { SpinLoader } from "./spin-loader";

interface DialogProps {
	title: string;
	content: string;
	isVisible?: boolean;
	closeDialog: () => void;
	onPositiveAnswer: () => void;
   isPending?: boolean;
}

export function Dialog({
	title,
	content,
	closeDialog,
	onPositiveAnswer,
	isVisible = false,
   isPending = false,
}: DialogProps) {
	if (!isVisible) return null;

	return (
		<div className="z-50 bg-black/75 fixed inset-0 backdrop-blur-xs flex justify-center items-center">
			<div
				className="flex flex-col bg-slate-100 rounded-lg max-w-screen-2xl mx-10 p-5 gap-10 shadow-lg shadow-black/50"
				role="dialog"
				aria-modal={true}
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
			>
				<h3 id="dialog-title" className="text-center text-3xl font-bold">
					{title}
				</h3>
				<p id="dialog-description">{content}</p>
				<div className="flex flex-col md:flex-row justify-around gap-2.5 md:gap-5">
					<button
                  disabled={isPending}
						className="bg-slate-400 hover:bg-slate-600 w-full h-full p-3 rounded-lg cursor-pointer transition flex itens-center justify-center"
						type="button"
						onClick={() => closeDialog()}
					>
                  {
                     isPending ? <SpinLoader /> : "Cancelar"
                  }
					</button>
					<button
                  disabled={isPending}
						className="bg-blue-400 hover:bg-blue-600 w-full h-full p-3 rounded-lg cursor-pointer transition flex itens-center justify-center"
						type="button"
                  onClick={onPositiveAnswer}
					>
                  {
                     isPending ? <SpinLoader /> : "Ok"
                  }
					</button>
				</div>
			</div>
		</div>
	);
}
