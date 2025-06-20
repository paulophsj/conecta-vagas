import Link from "next/link";

export default function CommentsCard({ comments }) {
    const { id, nome, data, comentario } = comments;

    return (
        <div className="max-w-lg mx-auto shadow-lg shadow-blue-400 px-6 py-4 rounded-lg w-full flex-shrink-0 max-lg:shadow-none" key={id}>
            <div className="flex items-center mb-6 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
                <div className="ml-4">
                    <div className="text-lg font-medium text-blue-400">{nome}</div>
                    <div className="text-blue-400">{data}</div>
                </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">{comentario}</p>
            <div className="flex justify-between items-center">
                <div>
                    <Link href={{pathname: "/"}} className="text-gray-500 hover:text-gray-700 mr-4"> Gostei</Link>
                    <Link href={{pathname: "/"}} className="text-gray-500 hover:text-gray-700"> Responder</Link>
                </div>
                <div className="flex items-center">
                    <Link href={{pathname: "/"}} className="text-gray-500 hover:text-gray-700 mr-4"> Reportar</Link>
                    <Link href={{pathname: "/"}} className="text-gray-500 hover:text-gray-700">Compartilhar</Link>
                </div>
            </div>
        </div>
    );
}
