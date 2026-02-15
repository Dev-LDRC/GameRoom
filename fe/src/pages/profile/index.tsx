import { authClient } from "../../lib/auth-client";
import ProfilePage from "../../components/ProfilePage";
import { SpinLoader } from "../../components/spin-loader";
import { Navigate } from "react-router-dom";
import { useUsername } from "../../http/username";

export function Profile() {
   const { data, isPending } = authClient.useSession();

   const { data: dataUsername, isLoading: isLoadingUsername } = useUsername();

   if (isPending || isLoadingUsername) {
      return <SpinLoader />;
   }

   if (!data || !dataUsername) {
      return <Navigate to="/login" replace />;
   }

   return <ProfilePage datasSession={data} dataUsername={dataUsername[0].name} />;
   ;
}