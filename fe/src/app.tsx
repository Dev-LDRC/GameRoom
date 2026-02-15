import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import GameRoom from "./pages/game-room";
import { Home } from "./pages/home";
import Plans from "./pages/plans";
import { Profile } from "./pages/profile";
import { ToastContainer, Bounce } from "react-toastify";

const query_client = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={query_client}>
         <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
         />
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route element={<Home />} index />
						<Route element={<Profile />} path="/profile" />
						<Route element={<GameRoom />} path="/game-room" />
						<Route element={<Plans />} path="/plans" />
					</Route>
					<Route element={<Login />} path="/login" />
					<Route element={<Register />} path="/register" />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
