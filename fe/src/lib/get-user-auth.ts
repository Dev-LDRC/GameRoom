import { useNavigate } from "react-router-dom";
import { authClient } from "./auth-client";
import { useEffect } from "react";

export function useGetUserAuth() {
	const { data: session, isPending } = authClient.useSession();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isPending && !session?.user) {
			navigate("/login");
		}
	}, [session, isPending, navigate]);

	return {
		userId: session?.user?.id,
		user: session?.user,
		isPending,
		isAuthenticated: !!session?.user,
	};
}
