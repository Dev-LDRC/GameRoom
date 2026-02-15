import { Link } from "react-router-dom";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { SpinLoader } from "../../components/spin-loader";

const signInSchema = z
   .object({
      email: z.email({ message: "Digite um email válido" }),
      password: z.string().min(6, "A senha deve conter no minimo 6 caracteres"),
   });

type SignInSchema = z.infer<typeof signInSchema>;

export function Login() {

   const { register, handleSubmit, formState } = useForm<SignInSchema>({
      resolver: zodResolver(signInSchema),
   });

	async function handleSignIn({ email, password }: SignInSchema) {

		try {
			const res = await authClient.signIn.email({
				email,
				password,
				callbackURL: "http://localhost:5173",
			});

			if (res.error) {
            console.log(res);

            if (res.error.code === "INVALID_EMAIL_OR_PASSWORD") {
               toast.error("Email ou senha inválidos.");
            }

			}
		} catch (err) {
			console.error("SIGNIN ERROR:");
			console.log(err);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-app-white p-10">
			<div className="flex w-full max-w-md flex-col gap-8 rounded-xl bg-white p-8 shadow-app-blue_light shadow-lg">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="font-bold text-3xl text-app-black">
						Bem vindo de volta!
					</h1>
					<p className="text-app-black">
						Entre para acessar sua biblioteca de jogos
					</p>
				</div>

				<form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
					<div className="flex flex-col gap-2">
						<label
							className="font-medium text-app-black text-sm"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="rounded-lg border border-app-gray bg-app-white px-4 py-2 outline-none focus:border-app-blue_light"
							{...register("email")}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							className="font-medium text-app-black text-sm"
							htmlFor="password"
						>
							Senha
						</label>
						<input
							className="rounded-lg border border-app-gray bg-app-white px-4 py-2 outline-none focus:border-app-blue_light"
							type="password"
							{...register("password")}
						/>
					</div>

               {Object.keys(formState.errors).length > 0 && (
                  <div className="bg-red-200 p-3 rounded-lg">
                     {Object.entries(formState.errors).map(([campo, erro]) => (
                        <p className="text-sm text-red-500" key={campo}>
                           <span>• {erro.message}</span>
                        </p>
                     ))}
                  </div>
               )}

					<button
						className="flex cursor-pointer justify-center rounded-lg bg-app-blue_dark px-4 py-2 font-semibold text-white transition-colors hover:bg-app-blue_light"
						type="submit"
                  disabled={formState.isSubmitting}
					>
                  {formState.isSubmitting ? (
                     <SpinLoader />
                  ) : (
                     <span>Entrar</span>
                  )}
					</button>
				</form>

				<p className="text-center text-app-black text-sm">
					Não tem uma conta?{" "}
					<Link
						className="font-semibold text-app-blue_dark hover:underline"
						to="/register"
					>
						Registre-se
					</Link>
				</p>
			</div>
		</div>
	);
}
