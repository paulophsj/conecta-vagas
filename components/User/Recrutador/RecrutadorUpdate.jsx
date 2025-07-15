import { useState } from "react";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import Estados from "@/components/Inputs/Estados";
import Cidades from "@/components/Inputs/Cidades";
import { useUser } from "@/components/UserContext";
import { updateRecrutador } from "@/api/Recrutador";
import { useRouter } from "next/router";

export default function RecrutadorUpdate() {
  const router = useRouter()
  const { user, fetchUser } = useUser();
  const [selectedEstado, setSelectedEstado] = useState(user?.estado || null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target))

    try {
      await updateRecrutador(data)
      await fetchUser()
      toast.success("Informações atualizadas com sucesso!", { position: "top-center", pauseOnHover: false, onClose: () => router.push('/profile'), autoClose: 1500 });
    } catch (error) {
      toast.error(error.message, { position: "top-center", pauseOnHover: false, autoClose: 1500 });
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-6xl">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-blue-400 dark:text-blue-500 mb-8">
            Editar Informações da Empresa
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna 1 - Informações Básicas */}
            <div className="w-full">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Informações Básicas
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="cnpj"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    CNPJ
                  </label>
                  <IMaskInput
                    mask="00.000.000/0000-00"
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    value={user?.cnpj}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="nomeEmpresa"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Nome da Empresa
                  </label>
                  <IMaskInput
                    type="text"
                    id="nomeEmpresa"
                    name="nomeEmpresa"
                    value={user?.nomeEmpresa}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    placeholder="Nome da empresa"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="numeroTelefone"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Telefone
                  </label>
                  <IMaskInput
                    mask="(00) 00000-0000"
                    type="tel"
                    id="numeroTelefone"
                    name="numeroTelefone"
                    value={user?.numeroTelefone}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div className="flex flex-wrap justify-between gap-4">
                  <div className="w-full sm:w-5/12">
                    <label
                      htmlFor="estado"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Estado
                    </label>
                    <Estados
                      defaultValue={user?.estado}
                      handleChange={(e) => setSelectedEstado(e)}
                    />
                  </div>
                  <div className="w-full sm:w-6/12">
                    <label
                      htmlFor="cidade"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Cidade
                    </label>
                    <Cidades
                      defaultValue={user?.cidade}
                      byEstado={selectedEstado}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 2 - Informações Corporativas */}
            <div className="w-full">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Informações Corporativas
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="anoFundacao"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Ano de Fundação
                  </label>
                  <IMaskInput
                    mask="0000"
                    type="text"
                    id="anoFundacao"
                    name="anoFundacao"
                    value={user?.anoFundacao}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    placeholder="AAAA"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="porteEmpresa"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Porte da Empresa
                    </label>
                    <select
                      id="porteEmpresa"
                      name="porteEmpresa"
                      defaultValue={user?.porteEmpresa}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">
                        Selecione
                      </option>
                      <option value="MEI">MEI</option>
                      <option value="MICRO">Microempresa</option>
                      <option value="PEQUENA">Pequena</option>
                      <option value="MEDIA">Média</option>
                      <option value="GRANDE">Grande</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="numeroFuncionarios"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Nº de Funcionários
                    </label>
                    <IMaskInput
                      mask="num"
                      blocks={{
                        num: {
                          mask: Number,
                        },
                      }}
                      type="text"
                      id="numeroFuncionarios"
                      name="numeroFuncionarios"
                      value={String(user?.numeroFuncionarios)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      placeholder="Quantidade"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="setorEmpresa"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Setor Principal
                  </label>
                  <select
                    id="setorEmpresa"
                    name="setorEmpresa"
                    defaultValue={user?.setorEmpresa}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="TECNOLOGIA">Tecnologia</option>
                    <option value="SAUDE">Saúde</option>
                    <option value="EDUCACAO">Educação</option>
                    <option value="FINANCAS">Finanças</option>
                    <option value="INDUSTRIA">Indústria</option>
                    <option value="COMERCIO">Comércio</option>
                    <option value="SERVICOS">Serviços</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="descricaoEmpresa"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Descrição da Empresa
                  </label>
                  <textarea
                    id="descricaoEmpresa"
                    name="descricaoEmpresa"
                    defaultValue={user?.descricaoEmpresa}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    rows="5"
                    placeholder="Descreva sua empresa..."
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
      </div>
    </div>
  );
}