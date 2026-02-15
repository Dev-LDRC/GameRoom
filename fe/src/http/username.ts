import { useQuery } from "@tanstack/react-query";

export function useUsername() {
   return useQuery({
      queryKey: ["get-username"],
      queryFn: async () => {
         const response = await fetch(
            `http://localhost:4444/users/username`,
            {
               credentials: "include",
            }
         );
         const result = await response.json();

         return result;
      },
   });
}