import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { checkAllCandidaturas } from "@/api/Candidatura";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import ProtectedRouter from "@/components/Router/ProtectedRouter";

export default function VagasAplicadasPage() {
    const router = useRouter();
    const [candidaturas, setCandidaturas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                const response = await checkAllCandidaturas();
                setCandidaturas(response || []);
            } catch (error) {
                toast.error(error.message || "Erro ao carregar candidaturas");
            } finally {
                setLoading(false);
            }
        };
        fetchVagas();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

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
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
                <Spinner />
            </div>
        );
    }

    if (!candidaturas || candidaturas.length === 0) {
        return (
            <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <h1 className="text-2xl font-bold text-blue-500 mb-4">Nenhuma candidatura encontrada</h1>
                    <p className="text-blue-800 mb-6">Você ainda não se candidatou a nenhuma vaga.</p>
                    <button
                        onClick={() => router.push('/vagas')}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                    >
                        Ver Vagas Disponíveis
                    </button>
                </div>
            </div>
        );
    }

    return (
        <ProtectedRouter>
        <>
            <Head>
                <title>Minhas Candidaturas | Nome da Empresa</title>
                <meta name="description" content="Lista de vagas para as quais você se candidatou" />
            </Head>

            <div className="py-8 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
                <div className="max-w-6xl mx-auto"> {/* Aumentei para max-w-6xl */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:shadow-sm transition-all duration-300 group"
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

                        <h1 className="text-3xl font-bold text-blue-500">Minhas Candidaturas</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Layout em grid para desktop */}
                        {candidaturas.map((candidatura) => {
                            const vaga = candidatura.vagas;
                            return (
                                <article 
                                    key={candidatura.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Cabeçalho */}
                                    <header className="p-6 border-b border-blue-100 bg-blue-500">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <h2 className="text-xl font-bold text-white">{vaga.titulo}</h2>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={`px-3 py-1 text-sm rounded-full ${vaga.ativa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {vaga.ativa ? 'Ativa' : 'Inativa'}
                                                </span>
                                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                                                    {vaga.tipoContrato}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-3 flex flex-wrap items-center gap-3">
                                            <span className="text-sm text-white font-medium">
                                                {vaga.cargaHoraria}h/semana
                                            </span>
                                            <span className="text-sm text-white font-medium">
                                                {formatSalary(vaga.salario)}
                                            </span>
                                        </div>
                                        
                                        <p className="mt-3 text-sm text-white">
                                            <span className="font-medium">Candidatura em:</span> {formatDate(candidatura.dataCriacao)}
                                        </p>
                                    </header>

                                    {/* Informações básicas */}
                                    <section className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-sm font-bold text-blue-500 mb-2">Localização</h3>
                                                <p className="text-blue-800">{vaga.localizacao}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-blue-500 mb-2">Publicada em</h3>
                                                <p className="text-blue-800">{formatDate(vaga.dataCriacao)}</p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Descrição */}
                                    <section className="p-6 border-t border-blue-100">
                                        <h3 className="text-base font-bold text-blue-500 mb-3">Descrição</h3>
                                        <p className="text-sm text-blue-800 whitespace-pre-line">{vaga.descricao}</p>
                                    </section>

                                    {/* Requisitos */}
                                    <section className="p-6 border-t border-blue-100">
                                        <h3 className="text-base font-bold text-blue-500 mb-3">Requisitos</h3>
                                        <p className="text-sm text-blue-800 whitespace-pre-line">{vaga.requisitos}</p>
                                    </section>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </> 
        </ProtectedRouter>
    );
}