import { useQuery } from "@tanstack/react-query";

export function useUserPlan(userId: any) {
   return useQuery({
      queryKey: ["get-user-plan"],
      queryFn: async () => {
         const response = await fetch(
            `http://localhost:4444/subscriptions/user-plan/${userId}`,
            {
               credentials: "include",
            }
         );
         const result = await response.json();

         return result;
      },
   });
}