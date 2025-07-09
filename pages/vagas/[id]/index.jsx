import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { findOneVaga } from "@/api/Vagas";
import Spinner from "@/components/Spinner";
import { enviarCandidatura } from "@/api/Candidatura";
import { toast } from "react-toastify";

export default function VagaDetalhes() {
    const router = useRouter();
    const { id } = router.query;
    const [vaga, setVaga] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchVaga = async () => {
                try {
                    const response = await findOneVaga(id)
                    setVaga(response);
                } catch (error) {
                    console.error("Erro ao carregar vaga:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchVaga();
        }
    }, [id]);

    const enviarCurriculo = async () => {
        try {
            const response = await enviarCandidatura(id)
            return toast.success(response, {position: 'top-center'})
        } catch (error) {
            return toast.error(error, {position: 'top-center'})
        }
    }

    // Função para formatar a data
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    // Função para formatar salário
    const formatSalary = (value) => {
        if (!value) return "";
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    if (loading) {
        return <Spinner />
    }

    if (!vaga) {
        return (
            <div className="dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Vaga não encontrada</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">A vaga solicitada não existe ou foi removida.</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{vaga.titulo} | Nome da Empresa</title>
                <meta name="description" content={`Detalhes da vaga para ${vaga.titulo}`} />
            </Head>

            <div className="dark:bg-gray-900 py-5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex cursor-pointer items-center gap-2 px-4 py-2.5 mb-6 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:shadow-sm transition-all duration-300 group"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Voltar</span>
                    </button>

                    <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                        {/* Cabeçalho com destaque */}
                        <header className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="border-2 border-white w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {vaga.titulo.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">{vaga.titulo}</h1>
                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                            <span className={`px-3 py-1 text-sm rounded-full ${vaga.ativa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {vaga.ativa ? 'Vaga Ativa' : 'Vaga Inativa'}
                                            </span>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full">
                                                {vaga.tipoContrato}
                                            </span>
                                            {vaga.formato && (
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full">
                                                    {vaga.formato[0] + vaga.formato.slice(1, vaga.formato.length).toLowerCase()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-white">{formatSalary(vaga.salario)}</p>
                                    <p className="text-blue-100 text-sm mt-1">{vaga.cargaHoraria}h semanais</p>
                                </div>
                            </div>
                        </header>

                        {/* Corpo da vaga */}
                        <section className="p-6 sm:p-8">
                            {/* Informações básicas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Localização</h3>
                                        <p className="text-base">{vaga.localizacao}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Publicada em</h3>
                                        <p className="text-base">{formatDate(vaga.dataCriacao)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Salário</h3>
                                        <p className="text-base">{formatSalary(vaga.salario)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo de Contrato</h3>
                                        <p className="text-base">{vaga.tipoContrato}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Descrição da vaga */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Descrição da Vaga
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{vaga.descricao}</p>
                            </div>

                            {/* Requisitos */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    Requisitos e Qualificações
                                </h2>
                                <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-2">
                                    {vaga.requisitos.split('\n').map((item, index) => (
                                        item.trim() && <li key={index}>{item.trim()}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Ação - Candidatar-se */}
                            <div className="mt-10 pt-6">
                                <button onClick={enviarCurriculo} className="w-full text-center px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer">
                                    Candidatar-se à Vaga
                                </button>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </>
    );
}