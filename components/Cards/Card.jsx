import Link from "next/link";
import { useRouter } from "next/router";

export default function Card({ vagaEmprego }) {
    const { pathname } = useRouter();
    const { id, titulo, empresa, localidade, descricao, dataPublicacao } = vagaEmprego;
    
    return (
        <>
            {pathname == "/vagas" ? (
                // Versão detalhada (página /vagas)
                <article className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                    <header className="bg-gradient-to-r from-blue-500 to-blue-600 p-5">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <div className="border-2 border-white w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                                    {empresa.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{titulo}</h2>
                                <p className="text-blue-100">{empresa}</p>
                            </div>
                        </div>
                    </header>
                    
                    <section className="p-5">
                        <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{localidade}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{dataPublicacao || 'Tempo Integral'}</span>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                            {descricao}
                        </p>
                        
                        <Link 
                            href={{ pathname: "/vagas/[id]", query: { id: id } }} 
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-md transition-colors duration-300"
                        >
                            Ver detalhes
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </section>
                </article>
            ) : (
                // Versão COMPACTA OTIMIZADA PARA DESKTOP
                <article className="w-11/12 md:max-w-xs bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 h-full flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                        <header className="mb-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg p-3 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{titulo}</h2>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium">{empresa}</p>
                                </div>
                            </div>
                        </header>
                        
                        <section className="mb-5 flex-1">
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                {descricao}
                            </p>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{localidade}</span>
                            </div>
                        </section>
                    </div>
                    
                    <footer className="px-6 pb-6">
                        <Link
                            href={{ pathname: "/vagas/[id]", query: { id: id } }}
                            className="w-full text-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            <span>Ver vaga</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </footer>
                </article>
            )}
        </>
    );
}