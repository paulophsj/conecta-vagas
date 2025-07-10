import Link from "next/link";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useUser } from "@/components/UserContext";
import { findAllVagasByRecrutador } from "@/api/Vagas";
import { toast } from "react-toastify";

export default function RecrutadorDashboard() {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [recruiterVagas, setRecruiterVagas] = useState([])

    useEffect(() => {
        if (user) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [user]);

    useEffect(() => {
        const fetchVagas = async () => {
            try {
                const data = await findAllVagasByRecrutador()
                setRecruiterVagas(data)
                return
            } catch (error) {
                toast.error(error, { position: "top-center", pauseOnHover: false, autoClose: 1500 })
            }
        }
        fetchVagas()
    }, [user])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <section className="mb-12">
                <div className="bg-gradient-to-r from-blue-400/10 to-blue-500/5 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl p-6 md:p-8">
                    <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-300 mb-2">
                        Olá, Recrutador da {user?.nomeEmpresa || 'Empresa'}!
                    </h2>
                    <p className="text-blue-600 dark:text-blue-200">
                        Bem-vindo ao seu painel de recrutador. Aqui você pode gerenciar suas vagas e candidaturas.
                    </p>
                </div>
            </section>

            {/* Company Info Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Company Details Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="bg-blue-500 dark:bg-blue-700 px-6 py-4">
                        <h3 className="text-lg font-semibold text-white">Informações da Empresa</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Nome da Empresa</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.nomeEmpresa}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">CNPJ</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.cnpj}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Ano de Fundação</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.anoFundacao}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Porte da Empresa</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.porteEmpresa}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Setor</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.setorEmpresa}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="bg-blue-500 dark:bg-blue-700 px-6 py-4">
                        <h3 className="text-lg font-semibold text-white">Contato</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Email</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.usuario.username}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Telefone</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.numeroTelefone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Localização</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.cidade}/{user.estado}</p>
                            </div>
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Número de Funcionários</p>
                                <p className="text-blue-800 dark:text-white font-medium">{user.numeroFuncionarios}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Company Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="bg-blue-500 dark:bg-blue-700 px-6 py-4">
                        <h3 className="text-lg font-semibold text-white">Sobre a Empresa</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-blue-800 dark:text-white">{user.descricaoEmpresa}</p>
                    </div>
                </div>
            </section>

            {/* Job Listings Section */}
            <section className="mb-12">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="bg-blue-500 dark:bg-blue-700 px-6 py-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Vagas Publicadas</h3>
                        <span className="bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-medium">
                            {recruiterVagas.length} vagas
                        </span>
                    </div>
                    <div className="p-6">
                        {recruiterVagas.length > 0 ? (
                            <div className="space-y-6">
                                {recruiterVagas.map((vaga) => (
                                    <div key={vaga.id} className="border border-blue-100 dark:border-gray-700 rounded-lg p-5 hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="md:flex items-center">
                                                    <h4 className="font-bold text-lg text-blue-700 dark:text-white">{vaga.titulo}</h4>
                                                    <span className="hidden md:block px-2 text-blue-700">|</span>
                                                    <h4 className="mb-1 italic text-blue-700 md:mb-0">{vaga.nomeEmpresa}</h4>
                                                </div>
                                                <p className="text-blue-600 dark:text-blue-300 mb-3">{vaga.localizacao}</p>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs">
                                                        {vaga.tipoContrato}
                                                    </span>
                                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs">
                                                        {vaga.cargaHoraria}h semanais
                                                    </span>
                                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs">
                                                        {vaga.ativa ? 'Ativa' : 'Inativa'}
                                                    </span>
                                                    {
                                                        vaga.formato && <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs">
                                                        {vaga.formato[0] + vaga.formato.slice(1, vaga.formato.length).toLowerCase()}
                                                    </span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-blue-600 dark:text-blue-300">
                                                    {vaga.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </p>
                                                <p className="text-sm text-blue-500 dark:text-blue-400">
                                                    Criada em: {formatDate(vaga.dataCriacao)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-1">Requisitos:</p>
                                            <p className="text-blue-800 dark:text-blue-100 text-sm">{vaga.requisitos}</p>
                                        </div>
                                        <div className="mt-4 flex justify-end gap-3">
                                            <Link
                                                href={`/vagas/editar/${vaga.id}`}
                                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                </svg>
                                                Editar
                                            </Link>
                                            <Link
                                                href={{pathname: "/profile/recrutador/candidaturas/[id]", query: {id: vaga.id}}}
                                                className="px-4 py-2 bg-white dark:bg-gray-700 border border-blue-500 text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-600 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275z" />
                                                </svg>
                                                Candidatos
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-blue-600 dark:text-blue-300 mb-4">Nenhuma vaga publicada ainda</p>
                                <Link
                                    href="/vagas/nova"
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                                >
                                    Criar primeira vaga
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Total de Vagas</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{recruiterVagas.length}</p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Vagas Ativas</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                                    {recruiterVagas.filter(v => v.ativa).length}
                                </p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-500 dark:text-blue-400">Média Salarial</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
                                    {recruiterVagas.length > 0
                                        ?
                                        (recruiterVagas.reduce((prev, curr) => prev + curr.salario, 0) / recruiterVagas.length).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                        : 'R$ 0,00'
                                    }
                                </p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Actions Section */}
            <section className="bg-gradient-to-r from-blue-400/10 to-blue-500/5 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-500 dark:text-blue-300 mb-4">Ações Rápidas</h3>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/perfil/editar"
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                        Editar Perfil
                    </Link>
                    <Link
                        href="/profile/recrutador/vagas/create"
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        Nova Vaga
                    </Link>
                </div>
            </section>
        </div>
    );
}