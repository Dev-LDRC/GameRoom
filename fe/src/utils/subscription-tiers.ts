import type { SubscriptionTier } from "../types/subscription";

export const tiers: SubscriptionTier[] = [
	{
		name: "Basic",
		price: 7,
		features: [
			"HD streaming",
			"Play on 1 device at a time",
			"New games added monthly",
		],
	},
	{
		name: "Premium",
		price: 14,
		features: [
			"Full HD streaming",
			"Play on 2 devices at a time",
			"Day-one indie releases",
			"Exclusive discounts",
		],
	},
	{
		name: "Ultimate",
		price: 21,
		features: [
			"4K HDR streaming",
			"Play on 4 devices at a time",
			"All new releases",
			"Cloud gaming",
			"Exclusive content",
		],
	},
];
