export type SubscriptionTier = {
	name: string;
	price: number;
	features: string[];
};

export type SubscriptionCardProps = {
	tier: SubscriptionTier;
};
