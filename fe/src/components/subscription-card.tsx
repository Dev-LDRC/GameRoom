import { FaCheck } from "react-icons/fa6";
import { authClient } from "../lib/auth-client";
import type { SubscriptionCardProps } from "../types/subscription";
import { useSubscribePlan } from "../http/subscribe-plan";
import { toast } from "react-toastify";

export function SubscriptionCard({ tier }: SubscriptionCardProps) {
	const { data: session } = authClient.useSession();
   const { mutateAsync: subscribePlan, isPending } = useSubscribePlan();

	async function handleSubscribe(plan_name: string) {

		subscribePlan({
         plan_name, session
      }, {
         onSuccess: (data) => {
            window.location.href = data.url;
         },
         onError: (error) => {
            console.error('Erro ao assinar:', error);
            if (error.message === "User is required") {
               toast.warn("Faça login para assinar um plano!")
            }
         }
      })
	}

	return (
		<div
			className={`flex flex-col gap-5 rounded-md border-2 p-6 ${tier.name === "Ultimate" ? "border-app-purple shadow-app-purple shadow-md transition hover:shadow-lg" : ""}
            ${tier.name === "Premium" ? "border-app-blue_dark shadow-app-blue_dark shadow-md transition hover:shadow-lg" : ""}
            ${tier.name === "Basic" ? "border-app-black shadow-app-black shadow-md transition hover:shadow-lg" : ""}
         `}
		>
			<div className="flex flex-col gap-2">
				<h3 className="font-bold text-2xl">{tier.name}</h3>
				<div className="flex items-center gap-1">
					<span className="font-bold text-3xl">R${tier.price}</span>
					<span className="text-app-black">/mês</span>
				</div>
			</div>

			<ul className="flex flex-1 flex-col gap-2">
				{tier.features.map((feature, index) => (
					<li className="flex items-center gap-2" key={index}>
						<FaCheck />
						{feature}
					</li>
				))}
			</ul>

			<button
            disabled={isPending}
				className={
					"cursor-pointer rounded-md border-4 border-transparent bg-app-black px-4 py-2 font-semibold text-white transition hover:border-app-black hover:bg-transparent hover:text-app-black"
				}
				onClick={() => handleSubscribe(tier.name)}
			>
				Escolher {tier.name}
			</button>
		</div>
	);
}
