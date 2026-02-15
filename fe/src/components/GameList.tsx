import { Link } from "react-router-dom";
import { GameCardUser } from "./game-card-user";
import { useGamesPlan } from "../http/games-plan";
import { SpinLoader } from "./spin-loader";

export default function GameList({ userPlan }: { userPlan: any }) {

   const { data: gamesPlan, isLoading, isError } = useGamesPlan(userPlan[0]?.plan);

   if (isLoading) {
      return <SpinLoader />;
   }

   if (isError){
      return (
         <div className="flex text-app-white justify-center text-center min-h-20 items-center gap-6 rounded-lg bg-app-black p-6">
            Houve um erro ao carregar os jogos, tente novamente mais tarde.
         </div>
      )
   }

   return (
      <div className="grid min-h-20 items-center gap-6 rounded-lg bg-app-black p-6 sm:grid-cols-2 lg:grid-cols-3">
         {gamesPlan.length > 0 ? (
            gamesPlan.map((game: any, index: any) => (
               <GameCardUser game={game} key={index} />
            ))
         ) : (
            <p className="col-span-full text-center text-white">
               Nenhum jogo disponível, faça uma{" "}
               <Link
                  to={"/plans"}
                  className="underline hover:text-app-blue_light"
               >
                  assinatura
               </Link>
               .
            </p>
         )}
      </div>
   )
}