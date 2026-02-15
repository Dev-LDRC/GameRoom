import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUsername() {

   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({ newUsername, session }: { newUsername: string, session: any }) => {

         if (!session) {
   		   throw new Error("User is required", { cause: 400 });
         }

         const response = await fetch(
            `http://localhost:4444/users`,
            {
               method: "PATCH",
               credentials: "include",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  newUsername,
               }),
            }
         );

         if (!response.ok) {
            throw new Error('Erro ao alterar nome de usuário');
         }

         const result = await response.json();
         return result;
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["get-username"]
         });
      },
   });
}