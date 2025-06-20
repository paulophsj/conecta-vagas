import Link from "next/link";

export default function Footer(){
    return (
        <footer className="w-full bg-blue-400 self-end">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
                    <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0 flex flex-col items-center justify-center">
                        <a href="/" className="flex flex-col items-center">
                            <svg className="shrink-0 w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white mb-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                            </svg>
                            <p className="m-0 p-0 text-white">Conecta Vagas</p>
                        </a>
                    </div>

                    {/* Ajuste para centralizar e alinhar os itens */}
                    <div className="flex flex-col items-center justify-center">
                        <Link href={{pathname: "/"}} className="text-sm text-white">Sobre</Link>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Link href={{pathname: "/"}} className="text-sm text-white">Contato</Link>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Link href={{pathname: "/"}} className="text-sm text-white">Termos de uso</Link>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <Link href={{pathname: "/"}} className="text-sm text-white">Política de privacidade</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
