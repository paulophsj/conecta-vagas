import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import Estados from "@/components/Inputs/Estados";
import Cidades from "@/components/Inputs/Cidades";
import { useUser } from "@/components/UserContext";
import { useRouter } from "next/router";
import { findOneEndereco, updateEndereco, createEndereco } from "@/api/Candidato";
import ProtectedRouter from "@/components/Router/ProtectedRouter";

export default function EnderecoForm({ mode = "create" }) {
  const router = useRouter();
  const { id } = router.query;

  const { user, fetchUser } = useUser();
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [endereco, setEndereco] = useState({
    enderecoCep: "",
    enderecoRua: "",
    enderecoNumero: "",
    enderecoComplemento: "",
    enderecoBairro: "",
    enderecoCidade: "",
    enderecoEstado: ""
  });

  const operationMode = mode || (id ? "update" : "create");

  useEffect(() => {
    const loadEndereco = async () => {
      try {
        if (operationMode === "update" && id) {
          const data = await findOneEndereco(id);
          setEndereco({
            ...data,
            enderecoNumero: data.enderecoNumero?.toString() || ""
          });
          setSelectedEstado(data.enderecoEstado);
        } else if (user?.endereco) {
          // Verifica se user.endereco existe antes de fazer o spread
          const userEndereco = user.endereco || {};
          setEndereco({
            enderecoCep: userEndereco.enderecoCep || "",
            enderecoRua: userEndereco.enderecoRua || "",
            enderecoNumero: userEndereco.enderecoNumero?.toString() || "",
            enderecoComplemento: userEndereco.enderecoComplemento || "",
            enderecoBairro: userEndereco.enderecoBairro || "",
            enderecoCidade: userEndereco.enderecoCidade || "",
            enderecoEstado: userEndereco.enderecoEstado || ""
          });
          setSelectedEstado(userEndereco.enderecoEstado || null);
        }
      } catch (error) {
        toast.error(error.message, { position: "top-center", onClose: () => router.back(), pauseOnHover: false, autoClose: 1500 });
      }
    };

    loadEndereco();
  }, [id, operationMode, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      enderecoCep: formData.get("enderecoCep"),
      enderecoRua: formData.get("enderecoRua"),
      enderecoNumero: parseInt(formData.get("enderecoNumero")) || 0,
      enderecoComplemento: formData.get("enderecoComplemento"),
      enderecoBairro: formData.get("enderecoBairro"),
      enderecoCidade: formData.get("cidade"),
      enderecoEstado: selectedEstado
    };

    try {
      if (operationMode === "update") {
        await updateEndereco(id, data);
        toast.success("Endereço atualizado com sucesso!", {
          position: "top-center",
          pauseOnHover: false,
          onClose: () => router.push('/profile'),
          autoClose: 1500
        });
      } else {
        await createEndereco([data]);
        toast.success("Endereço criado com sucesso!", {
          position: "top-center",
          pauseOnHover: false,
          onClose: () => router.push('/profile'),
          autoClose: 1500
        });
      }
      await fetchUser();
    } catch (error) {
      toast.error(error.message, { position: "top-center", pauseOnHover: false, autoClose: 1500 });
    }
  };

  return (
    <ProtectedRouter byCandidato={true}>
      <div className="flex justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-6xl">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center text-blue-400 dark:text-blue-500 mb-8">
              {operationMode === "update" ? "Editar Endereço" : "Adicionar Endereço"}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Coluna 1 - Informações do Endereço */}
              <div className="w-full">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Informações do Endereço
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="enderecoCep"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      CEP
                    </label>
                    <IMaskInput
                      mask="00000-000"
                      type="text"
                      id="enderecoCep"
                      name="enderecoCep"
                      value={endereco.enderecoCep}
                      onChange={(e) => setEndereco({...endereco, enderecoCep: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      placeholder="00000-000"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="enderecoRua"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Rua
                    </label>
                    <input
                      type="text"
                      id="enderecoRua"
                      name="enderecoRua"
                      value={endereco.enderecoRua}
                      onChange={(e) => setEndereco({...endereco, enderecoRua: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      placeholder="Nome da rua"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="enderecoNumero"
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                      >
                        Número
                      </label>
                      <IMaskInput
                        mask="num"
                        blocks={{
                          num: {
                            mask: Number,
                            min: 0
                          },
                        }}
                        type="text"
                        id="enderecoNumero"
                        name="enderecoNumero"
                        value={endereco.enderecoNumero}
                        onChange={(e) => setEndereco({...endereco, enderecoNumero: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                        placeholder="Número"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="enderecoComplemento"
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                      >
                        Complemento
                      </label>
                      <input
                        type="text"
                        id="enderecoComplemento"
                        name="enderecoComplemento"
                        value={endereco.enderecoComplemento}
                        onChange={(e) => setEndereco({...endereco, enderecoComplemento: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                        placeholder="Complemento"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="enderecoBairro"
                      className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                    >
                      Bairro
                    </label>
                    <input
                      type="text"
                      id="enderecoBairro"
                      name="enderecoBairro"
                      value={endereco.enderecoBairro}
                      onChange={(e) => setEndereco({...endereco, enderecoBairro: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                      placeholder="Bairro"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Coluna 2 - Localização */}
              <div className="w-full">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Localização
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="w-full sm:w-5/12">
                      <label
                        htmlFor="enderecoEstado"
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                      >
                        Estado
                      </label>
                      <Estados
                        value={selectedEstado}
                        handleChange={(e) => {
                          setSelectedEstado(e);
                          setEndereco({...endereco, enderecoEstado: e});
                        }}
                      />
                    </div>
                    <div className="w-full sm:w-6/12">
                      <label
                        htmlFor="enderecoCidade"
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                      >
                        Cidade
                      </label>
                      <Cidades
                        value={endereco.enderecoCidade}
                        onChange={(e) => setEndereco({...endereco, enderecoCidade: e.target.value})}
                        byEstado={selectedEstado}
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Dica:
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Certifique-se de que todas as informações do endereço estão corretas para que possamos entrar em contato quando necessário.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full lg:w-1/2 mx-auto block cursor-pointer bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              {operationMode === "update" ? "Salvar Alterações" : "Cadastrar Endereço"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRouter>
  );
}