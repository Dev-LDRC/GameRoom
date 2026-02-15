import { useMutation } from "@tanstack/react-query";

export function useSubscribePlan() {
   return useMutation({
      mutationFn: async ({ plan_name, session }: { plan_name: string, session: any }) => {

         if (!session) {
   		   throw new Error("User is required", { cause: 400 });
         }

         const response = await fetch(
            `http://localhost:4444/subscriptions/create-subscription`,
            {
               method: "POST",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  plan: plan_name,
                  email_user: session.user.email,
               }),
            }
         );

         if (!response.ok) {
            throw new Error('Erro ao criar pagamento');
         }

         const result = await response.json();
         return result;
      },
   });
}