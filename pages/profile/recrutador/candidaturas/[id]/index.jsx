import { checkAllCandidaturasByIdVaga } from '@/api/Candidatura';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Spinner from '@/components/Spinner';
import ProtectedRouter from '@/components/Router/ProtectedRouter';
import { toast } from 'react-toastify';
import { useUser } from '@/components/UserContext';
import { createChat } from '@/api/Chat';
import { chatContext } from '@/components/Chat/Chat';
import { findOneVaga } from '@/api/Vagas';

const CandidaturasPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const {fetchChats, setIsOpen} = useContext(chatContext)

    const [candidaturas, setCandidaturas] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [candidaturaExpandida, setCandidaturaExpandida] = useState(null);
    const [loading, setLoading] = useState(true);

    const [vaga, setVaga] = useState(null)

    useEffect(() => {
        const fetchCandidaturas = async () => {
            try {
                const candidatuas = await checkAllCandidaturasByIdVaga(id);
                const vaga = await findOneVaga(id)

                setCandidaturas(candidatuas);
                setVaga(vaga)
                
                toast.success('Candidaturas carregadas com sucesso!', { position: "top-center", pauseOnHover: false, autoClose: 1500 });
            } catch (error) {
                toast.error(error, { position: "top-center", pauseOnHover: false, autoClose: 1500 });
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCandidaturas();
    }, [id]);

    const toggleExpandirCandidatura = (id) => {
        setCandidaturaExpandida(candidaturaExpandida === id ? null : id);
    };

    const candidaturasFiltradas = candidaturas.filter(candidatura =>
        candidatura.candidato.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        candidatura.candidato.cargoPretendido.toLowerCase().includes(filtro.toLowerCase())
    );

    // Função para formatar data
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

    const criarChat = async (idCandidato) => {
        try {
            const candidatuas = await createChat(idCandidato)
            await fetchChats()
            setIsOpen(true)
            toast.success('Chat criado com sucesso!', { position: "top-center", pauseOnHover: false, autoClose: 1500 });
            return candidatuas;
        } catch (error) {
            toast.error(error, { position: "top-center", pauseOnHover: false, autoClose: 1500 });
        }
    }

    if (loading) return <Spinner />

    return (
        <ProtectedRouter byRecrutador={true}>
            <Head>
                <title>Candidaturas para {vaga?.titulo}</title>
                <meta name="description" content={`Candidaturas para a vaga de ${vaga?.titulo}`} />
            </Head>

            <div className="min-h-screen dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <header className="mb-10">
                        <div className="flex flex-col items-center">
                            {/* Botão Voltar Minimalista */}
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-1 px-3 py-1.5 mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="text-sm font-medium">Voltar</span>
                            </button>

                            {/* Título e Subtítulo */}
                            <div className="text-center">
                                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                                    Candidatos para <span className="text-blue-600 dark:text-blue-400">{vaga?.titulo}</span>
                                </h1>
                                <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
                                    {vaga?.nomeEmpresa}
                                </p>

                                {/* Linha decorativa */}
                                <div className="mt-4 mx-auto w-16 h-0.5 bg-blue-200 dark:bg-blue-800/60 rounded-full"></div>
                            </div>
                        </div>
                    </header>

                    {/* Adicione esta seção após o header e antes do filtro */}
                    <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Detalhes da Vaga
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Coluna 1 */}
                                <div>
                                    <div className="mb-3">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição</h3>
                                        <p className="text-gray-900 dark:text-white mt-1">{vaga?.descricao}</p>
                                    </div>

                                    <div className="mb-3">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Requisitos</h3>
                                        <p className="text-gray-900 dark:text-white mt-1">{vaga?.requisitos}</p>
                                    </div>

                                    <div className="mb-3">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Localização</h3>
                                        <p className="text-gray-900 dark:text-white mt-1">{vaga?.localizacao}</p>
                                    </div>
                                </div>

                                {/* Coluna 2 */}
                                <div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Salário</h3>
                                            <p className="text-gray-900 dark:text-white mt-1">{formatSalary(vaga?.salario)}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Carga Horária</h3>
                                            <p className="text-gray-900 dark:text-white mt-1">{vaga?.cargaHoraria}h semanais</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tipo de Contrato</h3>
                                            <p className="text-gray-900 dark:text-white mt-1">{vaga?.tipoContrato}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                                            <span className={`mt-1 px-2 py-1 text-xs rounded-full ${vaga?.ativa ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                                                {vaga?.ativa ? 'Ativa' : 'Inativa'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Criada em</h3>
                                            <p className="text-gray-900 dark:text-white mt-1">{formatDate(vaga?.dataCriacao)}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Atualizada em</h3>
                                            <p className="text-gray-900 dark:text-white mt-1">{formatDate(vaga?.dataUltimaModificacao)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filtro e contador */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <input
                            type="text"
                            placeholder="Filtrar por nome ou cargo pretendido"
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                            {candidaturasFiltradas.length} candidatura(s) encontrada(s)
                        </span>
                    </div>

                    {/* Lista de candidaturas */}
                    <div className="space-y-4">
                        {candidaturasFiltradas.length === 0 ? (
                            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Nenhuma candidatura encontrada</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {filtro ? 'Nenhum resultado para o filtro aplicado' : 'Ainda não há candidaturas para esta vaga'}
                                </p>
                            </div>
                        ) : (
                            candidaturasFiltradas.map((candidatura) => (
                                <div
                                    key={candidatura.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                                >
                                    {/* Cabeçalho da candidatura */}
                                    <div
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 cursor-pointer"
                                        onClick={() => toggleExpandirCandidatura(candidatura.id)}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-10 h-10 flex items-center justify-center font-medium">
                                                    {candidatura.candidato.nome.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{candidatura.candidato.nome}</h3>
                                                    <p className="text-gray-600 dark:text-gray-400 truncate">Cargo pretendido: {candidatura.candidato.cargoPretendido}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 sm:mt-0 flex items-center gap-4 justify-between md:justify-center w-full md:w-auto">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Pretensão</p>
                                                <p className="text-gray-900 dark:text-white font-medium">{formatSalary(candidatura.candidato.pretensaoSalarial)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Candidatura</p>
                                                <p className="text-gray-900 dark:text-white font-medium">{formatDate(candidatura.dataCriacao)}</p>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${candidaturaExpandida === candidatura.id ? 'rotate-180' : ''}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Detalhes expandidos */}
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${candidaturaExpandida === candidatura.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                                            {/* Grid de informações */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                                {/* Coluna 1 - Informações Pessoais */}
                                                <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-lg">
                                                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Informações Pessoais
                                                    </h4>
                                                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                                        <p><span className="font-medium">CPF:</span> {candidatura.candidato.cpf}</p>
                                                        <p><span className="font-medium">Data Nasc.:</span> {formatDate(candidatura.candidato.dataNascimento)}</p>
                                                        <p><span className="font-medium">Telefone:</span> {candidatura.candidato.numeroTelefone}</p>
                                                        <p><span className="font-medium">Email:</span> {candidatura.candidato.usuario.username}</p>
                                                    </div>
                                                </div>

                                                {/* Coluna 2 - Resumo Profissional */}
                                                <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-lg">
                                                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        Resumo Profissional
                                                    </h4>
                                                    <p className="text-gray-700 dark:text-gray-300">{candidatura.candidato.resumoProfissional}</p>
                                                </div>

                                                {/* Formação Acadêmica */}
                                                {candidatura.candidato.formacaoAcademica.length > 0 && (
                                                    <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-lg">
                                                        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                            </svg>
                                                            Formação Acadêmica
                                                        </h4>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            {candidatura.candidato.formacaoAcademica.map((formacao) => (
                                                                <div key={formacao.id} className="border-l-4 border-blue-500 pl-3 py-1">
                                                                    <p className="font-medium text-gray-900 dark:text-white">{formacao.curso} - {formacao.instituicao}</p>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Nível: {formacao.nivelAcademico}</p>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Ano de conclusão: {formacao.anoConclusao}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Endereços */}
                                                {candidatura.candidato.enderecos.length > 0 && (
                                                    <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-lg">
                                                        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            Endereços
                                                        </h4>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            {candidatura.candidato.enderecos.map((endereco) => (
                                                                <div key={endereco.id} className="border-l-4 border-blue-500 pl-3 py-1">
                                                                    <p className="text-gray-900 dark:text-white">{endereco.enderecoRua}, {endereco.enderecoNumero} {endereco.enderecoComplemento && `- ${endereco.enderecoComplemento}`}</p>
                                                                    <p className="text-gray-900 dark:text-white">{endereco.enderecoBairro}, {endereco.enderecoCidade} - {endereco.enderecoEstado}</p>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">CEP: {endereco.enderecoCep}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Ações */}
                                            <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                                                <button onClick={() => criarChat(candidatura.candidato.id)} className="cursor-pointer px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow-sm flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                                    </svg>
                                                    Criar chat
                                                </button>
                                                <button className="cursor-pointer px-5 py-2.5 bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-gray-600 transition-colors duration-300 shadow-sm flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Rejeitar Candidatura
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRouter>
    );
};

export default CandidaturasPage;