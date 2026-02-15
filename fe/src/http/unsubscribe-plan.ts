import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUnsubscribePlan() {

   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({ session }: { session: any }) => {

         if (!session) {
            throw new Error("User is required", { cause: 400 });
         }

         const response = await fetch(
            `http://localhost:4444/subscriptions/cancel-subscription`,
            {
               method: "POST",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  id: session.id,
               }),
            }
         );

         if (!response.ok) {
            throw new Error('Erro ao cancelar assinatura');
         }

         const result = await response.json();
         return result;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["get-user-plan"]
         });
      },
   });
}