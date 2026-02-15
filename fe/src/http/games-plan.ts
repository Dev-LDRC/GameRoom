import { useQuery } from "@tanstack/react-query";

export function useGamesPlan(userPlan: any) {
   return useQuery({
      queryKey: ["get-user-games-Plan"],
      queryFn: async () => {
         const response = await fetch(
            `http://localhost:4444/games/plan/${userPlan}`,
            {
               credentials: "include",
            }
         );

         if (!response.ok) {
            throw new Error('Erro ao buscar jogos do plano');
         }

         const result = await response.json();

         return result;
      },
   });
}