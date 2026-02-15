import { tiers } from "../utils/subscription-tiers";
import { SubscriptionCard } from "./subscription-card";

export function SubscriptionTiers() {
	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col items-center gap-5 text-center">
				<h2 className="font-bold text-4xl">Escolha seu plano</h2>
				<p className="max-w-2xl text-app-black">
					Selecione a assinatura de jogos perfeita para o seu estilo. Faça
					upgrade ou downgrade a qualquer momento.
				</p>
			</div>
			<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
				{tiers.map((tier) => (
					<SubscriptionCard key={tier.name} tier={tier} />
				))}
			</div>
		</div>
	);
}
