import { GameCatalog } from "../components/game-catalog";
import { SubscriptionTiers } from "../components/subscription-tiers";
import { TemplateApresentation } from "../components/template-apresentation";

export function Home() {
	return (
		<div className="flex flex-col gap-10">
			<section>
				<TemplateApresentation />
			</section>
			<section>
				<SubscriptionTiers />
			</section>
			<section>
				<GameCatalog />
			</section>
		</div>
	);
}
