import Link from "next/link";
import { useRouter } from "next/router";

export default function Card({ vagaEmprego }) {
    const { pathname } = useRouter()
    const { id, titulo, empresa, localidade, descricao } = vagaEmprego;
    return (
        <>
            {
                pathname == "/vagas" ? (
                    <article className="border w-full">
                        <header className="bg-blue-900 flex p-4 items-center gap-5">
                            <span className="border border-white w-10 h-10 rounded-full"></span>
                            <h2 className="text-white font-bold">{titulo}</h2>
                        </header>
                        <section className="p-4 flex flex-col items-start gap-5">
                            <aside className="flex gap-5">
                                <p>{localidade}</p>
                                <p>Tempo Integral</p>
                            </aside>
                            <p>
                                {descricao}
                            </p>
                            <Link href={{pathname: "/vagas/[id]", query: {id: id}}} className="bg-orange-400 text-white p-2 font-bold self-end hover:bg-orange-500 rounded text-sm">
                                VER MAIS
                            </Link>
                        </section>
                    </article>
                ) : (
                    <article className="w-44 h-40 flex flex-col justify-between">
                        <header className="h-full flex flex-col justify-between">
                            <h2 className="text-blue-900 font-bold text-lg">{titulo}</h2>
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
                                className="bg-orange-400 hover:bg-orange-500 p-2 text-white text-center rounded-sm w-full block"
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
