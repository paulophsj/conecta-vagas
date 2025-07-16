import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Card({ vagaEmprego, cardFilter = [] }) {
    const { pathname } = useRouter();

    useEffect(() => {
        console.log(cardFilter);
        
    }, [])

    const {
        id,
        titulo,
        descricao,
        localizacao,
        dataCriacao,
        salario,
        tipoContrato,
        cargaHoraria,
        ativa,
        requisitos,
        formato,
        nomeEmpresa
    } = vagaEmprego;

    // Função para formatar a data
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    // Função para formatar salário
    const formatSalary = (value) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <>
            {
                (!cardFilter.localidade || cardFilter.localidade.length === 0 || cardFilter.localidade.some(local => localizacao.includes(local))) &&
                (!cardFilter.cargo || titulo.includes(cardFilter.cargo)) &&
                (!cardFilter.tipoEmprego || cardFilter.tipoEmprego.length === 0 || cardFilter.tipoEmprego.some(tipo => tipoContrato.includes(tipo))) && (

                    pathname === "/vagas" ? (
                        // Versão detalhada (página /vagas)
                        <article className="w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                            <header className="bg-gradient-to-r from-blue-400 to-blue-500 p-5 dark:from-blue-600 dark:to-blue-700">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="border-2 border-white w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                                                {titulo.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="lg:flex lg:items-center">
                                                <h2 className="text-xl font-bold text-white">{titulo}</h2>
                                                <span className="hidden lg:block px-2 font-bold text-white">|</span>
                                                <h2 className="font-thin italic lg:text-xl text-white lg:font-bold ">{nomeEmpresa}</h2>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-1 text-xs rounded-full ${ativa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {ativa ? 'Vaga Ativa' : 'Vaga Inativa'}
                                                </span>
                                                <span className="text-blue-100 text-sm">{tipoContrato}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-white">{salario !== null ? formatSalary(salario) : "A caombinar"}</p>
                                        <p className="text-blue-100 text-sm">{cargaHoraria}h semanais</p>
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
                                        <span>{localizacao}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Publicada em {formatDate(dataCriacao)}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        <span>{formato ? String(formato)[0] + String(formato).slice(1, String(formato).length).toLowerCase() : "Não definido"}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Descrição da Vaga:</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {descricao}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Requisitos:</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {requisitos}
                                    </p>
                                </div>

                                <Link
                                    href={{ pathname: "/vagas/[id]", query: { id: id } }}
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white font-medium rounded-md transition-colors duration-300"
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
                        <article className="w-11/12 md:max-w-md bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 h-full flex flex-col">
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
                                            <i className="text-sm text-blue-600">{nomeEmpresa}</i>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-0.5 text-xs rounded-full ${ativa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {ativa ? 'Ativa' : 'Inativa'}
                                                </span>
                                                <span className="text-blue-600 dark:text-blue-400 text-sm">{tipoContrato}</span>
                                                {
                                                    formato &&
                                                    <span className="text-blue-600 dark:text-blue-400 text-sm">{formato[0] + formato.slice(1, formato.length).toLowerCase()}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </header>

                                <section className="mb-5 flex-1">
                                    <div className="space-y-2 mt-auto">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{localizacao}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{salario !== null ? formatSalary(salario) : "A caombinar"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>Publicada em {formatDate(dataCriacao)}</span>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <footer className="px-6 pb-6">
                                <Link
                                    href={{ pathname: "/vagas/[id]", query: { id: id } }}
                                    className="w-full text-center px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                    <span>Ver vaga</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </footer>
                        </article>
                    ))
            }
        </>
    );
}