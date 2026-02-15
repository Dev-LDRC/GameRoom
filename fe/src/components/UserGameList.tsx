import { SpinLoader } from "./spin-loader";
import { useUserPlan } from "../http/user-plan";
import GameList from "./GameList";

export default function UserGameList({ userId }: { userId: any }) {

   const { data, isLoading } = useUserPlan(userId);

   if (isLoading) {
      return <SpinLoader />;
   }

   return (
      <GameList userPlan={data} />
   )
}