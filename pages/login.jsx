import { Auth } from "@/api/Auth";
import { useUser } from "@/components/UserContext";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
    const { fetchUser } = useUser()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const DataObject = Object.fromEntries(formData.entries());

        try {
            const response = await Auth(DataObject)
            await fetchUser()
            return toast.success(response + '\n' + 'Redirecionando...', { position: "top-center", pauseOnHover: false, onClose: () => router.push('/'), autoClose: 1500 })
        } catch (error) {
            return toast.error(error, { position: "top-center", pauseOnHover: false, autoClose: 1500 })
        }
    }
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login" />
            </Head>
            <div className="flex justify-center p-4 w-full md:w-2xl">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full border border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">Login</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="username"
                                id="username"
                                name="username"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-200"
                                placeholder="********"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            Entrar
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <a href="#" className="text-sm text-blue-400 hover:underline dark:text-blue-400">
                            Esqueceu sua senha?
                        </a>
                    </div>

                    <div className="mt-2 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Não tem uma conta?{' '}
                            <Link href={{ pathname: "/cadastro" }} className="text-blue-400 hover:underline dark:text-blue-400">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};