import { useState } from "react";
import { useUserPlan } from "../http/user-plan";
import { Dialog } from "./dialog";
import { useUnsubscribePlan } from "../http/unsubscribe-plan";
import { SpinLoader } from "./spin-loader";
import { useUpdateUsername } from "../http/updateUsername";
import { toast } from "react-toastify";
// import { useUsername } from "../http/username";

export default function ProfilePage({ datasSession, dataUsername }: { datasSession: any, dataUsername: string }) {

   // TODO: refatorar para usar o username do useUsername, e não do session, para evitar problemas de cache após atualizar o nome de usuário

   const { data: userPlan, isLoading } = useUserPlan(datasSession.user.id);
   const { mutateAsync: unsubscribePlan, isPending } = useUnsubscribePlan();
   const { mutateAsync: updateUsername, isPending: isPendingMutation } = useUpdateUsername();

   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [notEditingName, setNotEditingName] = useState(true);
   const [userName, setUserName] = useState<string>(dataUsername);

   if (isLoading) {
      return <SpinLoader />;
   }

   function handleClickToCancelSubscription() {
      setIsDialogOpen(true);
   }

   async function handleCancelSubscription() {

      unsubscribePlan({
         session: datasSession.user
      }, {
         onSuccess: () => {
            setIsDialogOpen(false);
         },
         onError: (error) => {
            console.error('Erro ao assinar:', error);
            // Aqui você pode mostrar um toast/notificação
         }
      })

   }

   async function handleEditUsername() {

      if (userName.length < 3) {
         toast.error("O nome deve conter no minimo 3 caracteres.");
         return;
      }

      const formattedTrimUsername = userName.trim();

      updateUsername({
         newUsername: formattedTrimUsername,
         session: datasSession.user
      }, {
         onSuccess: async () => {
            setNotEditingName(true);
            toast.success("Nome alterado com sucesso!");
         },
         onError: (error) => {
            console.error('Erro ao assinar:', error);
            // Aqui você pode mostrar um toast/notificação
         }
      })


   }

   const hasPlan = userPlan && userPlan.length > 0;
   const currentPlan = hasPlan ? userPlan[0].plan : "Nenhuma";

   return (
      <div>
         <Dialog
            onPositiveAnswer={handleCancelSubscription}
            closeDialog={() => setIsDialogOpen(false)}
            title="Cancelar assinatura"
            content="Tem certeza de que deseja cancelar sua assinatura?"
            isVisible={isDialogOpen}
            isPending={isPending}
         />
         <div className="flex flex-col gap-5">
            <h1 className="font-bold text-5xl">PROFILE</h1>
            <div className="flex flex-col min-h-20 items-center gap-6 rounded-lg bg-app-black p-6">
               <div className="flex flex-col gap-2 w-full">
                  <h2 className="font-bold text-2xl text-app-white w-full text-left">
                     Conta
                  </h2>
                  <div className="h-1 w-full rounded-lg bg-app-white" />
               </div>
               <div className="flex flex-col w-full">
                  <div className="flex w-full">
                     <label
                        className={`bg-app-gray p-3 ${notEditingName ? "rounded-l-lg" : "rounded-tl-lg"}`}
                        htmlFor="name"
                     >
                        Nome
                     </label>
                     <input
                        readOnly={notEditingName}
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                        defaultValue={userName}
                        className={`outline-0 bg-app-white p-3 w-full`}
                        id="name"
                     />
                     <button
                        className={`cursor-pointer bg-app-blue_dark px-4 py-2 font-semibold text-white transition-colors hover:bg-app-blue_light ${notEditingName ? "rounded-r-lg" : "rounded-tr-lg"}`}
                        onClick={() => setNotEditingName(!notEditingName)}
                     >
                        {
                           notEditingName ? "Editar" : "Editando"
                        }
                     </button>
                  </div>
                  {
                     !notEditingName && (
                        <button
                           disabled={isPendingMutation}
                           className="cursor-pointer flex justify-center w-full text-sm rounded-b-lg bg-app-blue_dark p-2 font-semibold text-white transition-colors hover:bg-app-blue_light"
                           onClick={handleEditUsername}
                        >
                           {
                              isPendingMutation ? (
                                 <SpinLoader />
                              ) : (
                                 <span>Salvar</span>
                              )
                           }
                        </button>
                     )
                  }
               </div>
               <div className="flex w-full">
                  <label
                     className="bg-app-gray p-3 rounded-l-lg"
                     htmlFor="email"
                  >
                     Email
                  </label>
                  <input
                     readOnly
                     type="text"
                     defaultValue={datasSession.user.email}
                     className="outline-0 bg-app-white p-3 rounded-r-lg w-full"
                     id="email"
                  />
               </div>
            </div>
            <div className="flex flex-col min-h-20 items-center gap-6 rounded-lg bg-app-black p-6">
               <div className="flex flex-col gap-2 w-full">
                  <h2 className="font-bold text-2xl text-app-white w-full text-left">
                     Assinatura
                  </h2>
                  <div className="h-1 w-full rounded-lg bg-app-white" />
               </div>
               <h2 className="text-app-white w-full text-left">
                  Assinatura atual:{" "}
                  <span className="font-bold">{currentPlan}</span>
               </h2>
               {hasPlan && (
                  <button
                     className="cursor-pointer text-app-black rounded-md bg-red-400 p-3 transition-transform hover:bg-red-500 w-full"
                     onClick={handleClickToCancelSubscription}
                  >
                     Cancelar assinatura
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}