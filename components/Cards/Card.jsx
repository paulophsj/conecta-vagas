import Link from "next/link";
import { useRouter } from "next/router";

export default function Card({ vagaEmprego }) {
    const { pathname } = useRouter()
    const { id, titulo, empresa, localidade, descricao } = vagaEmprego;
    return (
        <>
            {
                pathname == "/vagas" ? (
                    <article className="shadow-md w-full">
                        <header className="bg-blue-400 flex p-4 items-center gap-5">
                            <span className="border border-white w-10 h-10 rounded-full"></span>
                            <h2 className="text-white font-bold dark:text-white">{titulo}</h2>
                        </header>
                        <section className="p-4 flex flex-col items-start gap-5">
                            <aside className="flex gap-5 md:flex-col">
                                <div className="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="oklch(62.3% 0.214 259.815)" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                    <p>{localidade}</p>
                                </div>
                                <div className="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="oklch(62.3% 0.214 259.815)" class="bi bi-calendar" viewBox="0 0 16 16">
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                    </svg>
                                    <p>Tempo Integral</p>
                                </div>
                            </aside>
                            <p>
                                {descricao}
                            </p>
                            <Link href={{ pathname: "/vagas/[id]", query: { id: id } }} className="bg-blue-400 text-white p-2 font-bold self-end hover:bg-blue-500 rounded text-sm">
                                VER MAIS
                            </Link>
                        </section>
                    </article>
                ) : (
                    <article className="w-44 h-fit-content flex flex-col justify-between shadow-2xl rounded-sm p-2">
                        <header className="h-full flex flex-col justify-between">
                            <h2 className="text-blue-400 dark:text-white font-bold text-lg">{titulo}</h2>
                            <p className="font-semibold">{empresa}</p>
                        </header>
                        <section>
                            <p className="text-gray-500 text-sm">{localidade}</p>
                        </section>
                        <footer className="mt-4">
                            <Link
                                href={{
                                    pathname: "/vagas/[id]",
                                    query: { id: id }
                                }}
                                className="bg-blue-400 hover:bg-blue-500 p-2 text-white text-center rounded-sm w-full block"
                            >
                                Ver mais
                            </Link>
                        </footer>
                    </article>
                )
            }
        </>
    );
}
