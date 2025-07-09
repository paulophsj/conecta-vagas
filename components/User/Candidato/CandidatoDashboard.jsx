import Link from "next/link";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useUser } from "@/components/UserContext";

export default function CandidatoDashboard() {
  const {user} = useUser()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(user){
      setLoading(false)
    }
    else{
      setLoading(true)
    }
  }, [user]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) {
    return<Spinner />
  }

  return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-400/10 to-blue-500/5 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-blue-500 dark:text-blue-300 mb-2">
              Olá, {user?.nome || 'Usuário'}!
            </h2>
            <p className="text-blue-600 dark:text-blue-200">
              Bem-vindo ao seu painel de candidato. Aqui você pode gerenciar suas informações e vagas.
            </p>
          </div>
        </section>

        {/* User Info Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Personal Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-500 dark:bg-blue-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">Informações Pessoais</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Nome Completo</p>
                  <p className="text-blue-800 dark:text-white font-medium">{user.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-500 dark:text-blue-400">CPF</p>
                  <p className="text-blue-800 dark:text-white font-medium">{user.cpf}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Data de Nascimento</p>
                  <p className="text-blue-800 dark:text-white font-medium">{formatDate(user.dataNascimento)}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Telefone</p>
                  <p className="text-blue-800 dark:text-white font-medium">{user.numeroTelefone}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Email</p>
                  <p className="text-blue-800 dark:text-white font-medium">{user.usuario.username}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-500 dark:bg-blue-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">Informações Profissionais</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Cargo Pretendido</p>
                  <p className="text-blue-800 dark:text-white font-medium">{user.cargoPretendido}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Pretensão Salarial</p>
                  <p className="text-blue-800 dark:text-white font-medium">
                    {user.pretensaoSalarial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-500 dark:text-blue-400">Resumo Profissional</p>
                  <p className="text-blue-800 dark:text-white font-medium">{user.resumoProfissional}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-500 dark:bg-blue-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">Formação Acadêmica</h3>
            </div>
            <div className="p-6">
              {user.formacaoAcademica.length > 0 ? (
                user.formacaoAcademica.map((formacao, index) => (
                  <div key={index} className="space-y-4 mb-6 last:mb-0">
                    <div>
                      <p className="text-sm text-blue-500 dark:text-blue-400">Nível Acadêmico</p>
                      <p className="text-blue-800 dark:text-white font-medium">{formacao.nivelAcademico}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-500 dark:text-blue-400">Curso</p>
                      <p className="text-blue-800 dark:text-white font-medium">{formacao.curso}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-500 dark:text-blue-400">Instituição</p>
                      <p className="text-blue-800 dark:text-white font-medium">{formacao.instituicao}</p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-500 dark:text-blue-400">Ano de Conclusão</p>
                      <p className="text-blue-800 dark:text-white font-medium">{formacao.anoConclusao}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-blue-600 dark:text-blue-300">Nenhuma formação cadastrada</p>
              )}
            </div>
          </div>
        </section>

        {/* Addresses Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="bg-blue-500 dark:bg-blue-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">Endereços Cadastrados</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.enderecos.length > 0 ? (
                  user.enderecos.map((endereco, index) => (
                    <div key={index} className="border border-blue-100 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-blue-700 dark:text-white mb-3">Endereço {index + 1}</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          <span className="font-medium">CEP:</span> {endereco.enderecoCep}
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          <span className="font-medium">Endereço:</span> {endereco.enderecoRua}, {endereco.enderecoNumero}
                        </p>
                        {endereco.enderecoComplemento && (
                          <p className="text-sm text-blue-600 dark:text-blue-300">
                            <span className="font-medium">Complemento:</span> {endereco.enderecoComplemento}
                          </p>
                        )}
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          <span className="font-medium">Bairro:</span> {endereco.enderecoBairro}
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          <span className="font-medium">Cidade/UF:</span> {endereco.enderecoCidade}/{endereco.enderecoEstado}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-blue-600 dark:text-blue-300">Nenhum endereço cadastrado</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Actions Section */}
        <section className="bg-gradient-to-r from-blue-400/10 to-blue-500/5 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-500 dark:text-blue-300 mb-4">Ações</h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              href={{pathname: "/perfil/editar"}} 
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
              Editar Perfil
            </Link>
            <Link 
              href={{pathname: "/vagas/aplicadas"}}
              className="px-6 py-3 bg-white dark:bg-gray-700 border border-blue-500 text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-600 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5zM3 12v-2h8v2zm0-3v-2h8v2z"/>
              </svg>
              Minhas Candidaturas
            </Link>
          </div>
        </section>
      </div>
  );
}