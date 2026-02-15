import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { SpinLoader } from "../../components/spin-loader";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-toastify";

const signUpSchema = z
	.object({
		name: z.string().min(3, "O nome deve conter no minimo 3 caracteres"),
		email: z.email({ message: "Digite um email válido" }),
		password: z.string().min(6, "A senha deve conter no minimo 6 caracteres"),
		confirmPassword: z
			.string({ message: "Confirmação de senha é formado por caracteres" })
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não são compativeis",
		path: ["password"],
	});

type SignUpSchema = z.infer<typeof signUpSchema>;

export function Register() {
	const navigate = useNavigate();

	const { register, handleSubmit, formState } = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
	});

	async function handleSignUp({ name, email, password }: SignUpSchema) {
		try {
			const res = await authClient.signUp.email({
				name,
				email,
				password,
				fetchOptions: {
					onSuccess() {
						navigate("/login");
					},
				},
			});

         if (res.error) {
            console.log(res);

            if (res.error.status === 422) {
               toast.warn("Este usuário já existe, utilize outro email.");
            }

         }
		} catch (err) {
			console.error("SIGNUP ERROR:");
			console.log(err);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-app-white p-10">
			<div className="flex w-full max-w-md flex-col gap-8 rounded-xl bg-white p-8 shadow-app-blue_light shadow-lg">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="font-bold text-3xl text-app-black">
						Crie uma conta
					</h1>
					<p className="text-app-black">
						Registre-se para acessar sua biblioteca de jogos
					</p>
				</div>

				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit(handleSignUp)}
				>
					<div className="flex flex-col gap-2">
						<label
							className="font-medium text-app-black text-sm"
							htmlFor="name"
						>
							Nome
						</label>
						<input
							className="rounded-lg border border-app-gray bg-app-white px-4 py-2 outline-none focus:border-app-blue_light"
							{...register("name")}
						/>
					</div>

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

					<div className="flex flex-col gap-2">
						<label
							className="font-medium text-app-black text-sm"
							htmlFor="confirmPassword"
						>
							Confirmação de senha
						</label>
						<input
							className="rounded-lg border border-app-gray bg-app-white px-4 py-2 outline-none focus:border-app-blue_light"
							type="password"
							{...register("confirmPassword")}
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
							<span>Criar conta</span>
						)}
					</button>
				</form>

				<p className="text-center text-app-black text-sm">
					Já possui uma conta?{" "}
					<Link
						className="font-semibold text-app-blue_dark hover:underline"
						to="/login"
					>
						Entrar
					</Link>
				</p>
			</div>
		</div>
	);
}
