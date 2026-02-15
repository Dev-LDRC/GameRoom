import HeaderGameRoom from "../../components/header-gameroom";
import UserGameList from "../../components/UserGameList";
import { authClient } from "../../lib/auth-client";
import { SpinLoader } from "../../components/spin-loader";

export default function GameRoom() {

   const { data, isPending } = authClient.useSession();

	if (!data || isPending) {
		return <SpinLoader />;
	}

	return (
		<div className="flex flex-col gap-5">
         <HeaderGameRoom userId={data.session.userId} />
         <UserGameList userId={data.session.userId} />
		</div>
	);
}
