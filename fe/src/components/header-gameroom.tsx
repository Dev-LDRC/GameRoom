import { useUserPlan } from "../http/user-plan";
import { SpinLoader } from "./spin-loader";

export default function HeaderGameRoom({ userId }: { userId: any }) {


   const { data, isLoading } = useUserPlan(userId);

   const hasPlan = data && data.length > 0;
   const currentPlan = hasPlan ? data[0].plan : "Nenhum";

   return (
      <div className="flex items-center justify-between">
         <h1 className="font-bold text-5xl">Meus jogos</h1>
         {
            isLoading ? (
               <SpinLoader />
            ) : (
               <p className="">
                  Seu plano: <span className="font-bold">{currentPlan}</span>
               </p>
            )
         }
      </div>
   )
}