import { Auth } from "@/api/Auth";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginPage() {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const DataObject = Object.fromEntries(formData.entries());

        try {
            const response = await Auth(DataObject)
            return toast.success(response)
        } catch (error) {
            return toast.error(error)
        }
    }
    return (
        <div className="flex justify-center p-4 w-full md:w-2xl">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-blue-400 hover:underline">
                        Esqueceu sua senha?
                    </a>
                </div>

                <div className="mt-2 text-center">
                    <p className="text-sm text-gray-600">
                        Não tem uma conta?{' '}
                        <Link href={{pathname: "/cadastro"}} className="text-blue-400 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};