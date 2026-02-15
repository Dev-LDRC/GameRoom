import { useQuery } from "@tanstack/react-query";

export function useGames() {
   return useQuery({
      queryKey: ["get-games"],
      queryFn: async () => {

         const response = await fetch(
            "http://localhost:4444/games",
         );
         const result = await response.json();

         return result;
      },
   });
}