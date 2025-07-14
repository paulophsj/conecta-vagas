import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import { useUser } from "@/components/UserContext";
import { updateCandidato } from "@/api/Candidato";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CandidatoUpdate() {
  const router = useRouter();
  const { user, fetchUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.pretensaoSalarial = String(data.pretensaoSalarial).replace("R$ ", "")

    try {
      await updateCandidato(data);
      await fetchUser();
      toast.success("Informações atualizadas com sucesso!", { 
        position: "top-center", 
        pauseOnHover: false, 
        onClose: () => router.push('/profile'),
        autoClose: 1500 
      });
    } catch (error) {
      toast.error(error.message, { 
        position: "top-center", 
        pauseOnHover: false, 
        autoClose: 1500 
      });
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-6xl">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-blue-400 dark:text-blue-500 mb-8">
            Editar Informações Pessoais
          </h1>

          {/* Seção de Informações Pessoais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Dados Pessoais
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label htmlFor="nome" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    defaultValue={user?.nome}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="cpf" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                    CPF
                  </label>
                  <IMaskInput
                    mask="000.000.000-00"
                    type="text"
                    id="cpf"
                    name="cpf"
                    defaultValue={user?.cpf}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="dataNascimento" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                    Data de Nascimento
                  </label>
                        <IMaskInput
                          mask="00/00/0000"
                          type="text"
                          id="dataNascimento"
                          name="dataNascimento"
                          defaultValue={String(user?.dataNascimento).split('-').reverse().join('/')}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                          placeholder="DD/MM/AAAA"
                          required
                        />
                </div>
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Informações Profissionais
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label htmlFor="cargoPretendido" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                    Cargo Pretendido
                  </label>
                  <input
                    type="text"
                    id="cargoPretendido"
                    name="cargoPretendido"
                    defaultValue={user?.cargoPretendido}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="pretensaoSalarial" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                    Pretensão Salarial
                  </label>
                  <IMaskInput
                    mask="R$ num"
                        blocks={{
                          num: {
                            mask: Number,
                          },
                        }}
                    type="text"
                    id="pretensaoSalarial"
                    name="pretensaoSalarial"
                    defaultValue={user?.pretensaoSalarial}
                    placeholder="R$ 0,00"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="numeroTelefone" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                    Telefone
                  </label>
                  <IMaskInput
                    mask="(00) 00000-0000"
                    type="tel"
                    id="numeroTelefone"
                    name="numeroTelefone"
                    defaultValue={user?.numeroTelefone}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="resumoProfissional" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                    Resumo Profissional
                  </label>
                  <textarea
                    id="resumoProfissional"
                    name="resumoProfissional"
                    defaultValue={user?.resumoProfissional}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    rows="4"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full lg:w-1/2 mx-auto block cursor-pointer bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Salvar Alterações
          </button>
        </form>

        {/* Seção de Endereços (Somente visualização) */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Meus Endereços
            </h2>
            <Link href="/enderecos/novo" className="text-blue-400 dark:text-blue-500 hover:underline">
              + Adicionar Endereço
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.enderecos?.map((endereco) => (
              <div key={endereco.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg relative">
                <Link 
                  href={`/enderecos/editar/${endereco.id}`}
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </Link>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  {endereco.enderecoRua}, {endereco.enderecoNumero}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {endereco.enderecoBairro}, {endereco.enderecoCidade} - {endereco.enderecoEstado}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  CEP: {endereco.enderecoCep}
                </p>
                {endereco.enderecoComplemento && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Complemento: {endereco.enderecoComplemento}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Formações Acadêmicas (Somente visualização) */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Minhas Formações
            </h2>
            <Link href="/formacoes/nova" className="text-blue-400 dark:text-blue-500 hover:underline">
              + Adicionar Formação
            </Link>
          </div>

          <div className="space-y-4">
            {user?.formacaoAcademica?.map((formacao) => (
              <div key={formacao.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg relative">
                <Link
                  href={`/formacoes/editar/${formacao.id}`}
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </Link>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  {formacao.curso} ({formacao.nivelAcademico})
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {formacao.instituicao}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Conclusão: {formacao.anoConclusao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}