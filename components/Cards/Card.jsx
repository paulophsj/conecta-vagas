import Link from "next/link";

export default function Card({ vagaEmprego }) {
    const { id, titulo, empresa, localidade } = vagaEmprego;
    return (
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
                        pathname: "/vaga/[id]",
                        query: { id: id }
                    }}
                    className="bg-orange-400 hover:bg-orange-500 p-2 text-white text-center rounded-sm w-full block"
                >
                    Ver mais
                </Link>
            </footer>
        </article>
    );
}
