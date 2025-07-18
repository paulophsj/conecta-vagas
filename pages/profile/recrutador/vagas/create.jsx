import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";
import { useUser } from "@/components/UserContext";
import { createVaga } from "@/api/Vagas";
import Estados from "@/components/Inputs/Estados";
import Cidades from "@/components/Inputs/Cidades";

export default function CriarVagaPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estados, setEstados] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const localizacao = data?.cidade && data?.estado ? `${data.cidade}, ${data.estado}` : "Sem cidade ou sem estado";

    const { estado, cidade, ...others } = data

    const newData = {
      ...others,
      localizacao
    }

    console.log(newData)

    // Convertendo tipos
    data.ativa = data.ativa === 'true';
    data.salario = data.salario ? parseFloat(data.salario) : null;
    data.cargaHoraria = data.cargaHoraria ? parseInt(data.cargaHoraria) : null;

    try {
      await createVaga(newData);
      toast.success("Vaga criada com sucesso!", {
        position: "top-center",
        pauseOnHover: false,
        onClose: () => router.push('/vagas'),
        autoClose: 1500
      });
    } catch (error) {
      toast.error(error.message, { position: "top-center", pauseOnHover: false, autoClose: 1500 });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-6xl">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-blue-400 dark:text-blue-500 mb-8">
            Criar Nova Vaga de Emprego
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
                    htmlFor="titulo"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Título da Vaga *
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    placeholder="Título da vaga"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="descricao"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    rows="4"
                    placeholder="Descrição detalhada da vaga..."
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="requisitos"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Requisitos *
                  </label>
                  <textarea
                    id="requisitos"
                    name="requisitos"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    rows="4"
                    placeholder="Liste os requisitos para a vaga..."
                    required
                    maxLength={1000}
                  />
                </div>
              </div>
            </div>

            {/* Coluna 2 - Informações Adicionais */}
            <div className="w-full">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Informações Adicionais
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="localizacao"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Localização
                  </label>
                  <div className="flex gap-2">
                    <Estados handleChange={(e) => setEstados(e)} />
                    <Cidades byEstado={estados} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="salario"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Salário (R$)
                    </label>
                    <IMaskInput
                      mask="num"
                      radix="."
                      mapToRadix={['.']}
                      unmask={true}
                      blocks={{
                        num: {
                          mask: Number,
                          scale: 2,
                          normalizeZeros: true,
                          min: 0
                        }
                      }}
                      type="text"
                      id="salario"
                      name="salario"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="cargaHoraria"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Carga Horária (h)
                    </label>
                    <IMaskInput
                      mask="num"
                      blocks={{
                        num: {
                          mask: Number,
                          min: 0,
                          max: 999
                        }
                      }}
                      type="text"
                      id="cargaHoraria"
                      name="cargaHoraria"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      placeholder="Horas semanais"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="tipoContrato"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Tipo de Contrato *
                    </label>
                    <select
                      id="tipoContrato"
                      name="tipoContrato"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="CLT">CLT</option>
                      <option value="PJ">PJ</option>
                      <option value="FREELANCER">Freelancer</option>
                      <option value="MEI">MEI</option>
                      <option value="VOLUNTARIO">Voluntário</option>
                      <option value="APRENDIZ">Aprendiz</option>
                      <option value="INDERTEMINADO">Indeterminado</option>
                      <option value="ESTAGIO">Estágio</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="formato"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Formato de Trabalho *
                    </label>
                    <select
                      required
                      id="formato"
                      name="formato"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Selecione</option>
                      <option value="PRESENCIAL">Presencial</option>
                      <option value="HIBRIDO">Híbrido</option>
                      <option value="REMOTO">Remoto</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="ativa"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Status da Vaga
                  </label>
                  <select
                    id="ativa"
                    name="ativa"
                    defaultValue="true"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="true">Ativa</option>
                    <option value="false">Inativa</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700 text-white py-2 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Criando...
                </span>
              ) : "Criar Vaga"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}