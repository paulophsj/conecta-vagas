import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "@/components/UserContext";
import { useRouter } from "next/router";
import { findOneFormacao, updateFormacao, createFormacao } from "@/api/Candidato";
import ProtectedRouter from "@/components/Router/ProtectedRouter";

export default function FormacaoAcademicaForm({ mode = "create" }) {
  const router = useRouter();
  const { id } = router.query;

  const { user, fetchUser } = useUser();
  const [formacao, setFormacao] = useState({
    nivelAcademico: "",
    curso: "",
    instituicao: "",
    anoConclusao: ""
  });

  const niveisAcademicos = [
    { value: "ENSINO_FUNDAMENTAL", label: "Ensino Fundamental" },
    { value: "ENSINO_MEDIO", label: "Ensino Médio" },
    { value: "TECNICO", label: "Técnico" },
    { value: "TECNOLOGO", label: "Tecnólogo" },
    { value: "SUPERIOR", label: "Superior" },
    { value: "POS_GRADUACAO", label: "Pós-Graduação" },
    { value: "MESTRADO", label: "Mestrado" },
    { value: "DOUTORADO", label: "Doutorado" }
  ];

  const operationMode = mode || (id ? "update" : "create");

  useEffect(() => {
    const loadFormacao = async () => {
      try {
        if (operationMode === "update" && id) {
          const data = await findOneFormacao(id);
          setFormacao({
            ...data,
            anoConclusao: data.anoConclusao?.toString() || ""
          });
        } else if (operationMode === "create") {
          setFormacao({
            nivelAcademico: "",
            curso: "",
            instituicao: "",
            anoConclusao: ""
          });
        }
      } catch (error) {
        toast.error(error.message, { 
          position: "top-center", 
          onClose: () => router.back(), 
          pauseOnHover: false, 
          autoClose: 1500 
        });
      }
    };

    loadFormacao();
  }, [id, operationMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nivelAcademico: formData.get("nivelAcademico"),
      curso: formData.get("curso"),
      instituicao: formData.get("instituicao"),
      anoConclusao: parseInt(formData.get("anoConclusao")) || null
    };

    try {
      if (operationMode === "update") {
        await updateFormacao(id, data);
        toast.success("Formação acadêmica atualizada com sucesso!", {
          position: "top-center",
          pauseOnHover: false,
          onClose: () => router.push('/profile'),
          autoClose: 1500
        });
      } else {
        await createFormacao([data]);
        toast.success("Formação acadêmica criada com sucesso!", {
          position: "top-center",
          pauseOnHover: false,
          onClose: () => router.push('/profile'),
          autoClose: 1500
        });
      }
      await fetchUser();
    } catch (error) {
      toast.error(error.message, { 
        position: "top-center", 
        pauseOnHover: false, 
        autoClose: 1500 
      });
    }
  };

  return (
    <ProtectedRouter byCandidato={true}>
      <div className="flex justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center text-blue-400 dark:text-blue-500 mb-8">
              {operationMode === "update" ? "Editar Formação Acadêmica" : "Adicionar Formação Acadêmica"}
            </h1>

            <div className="grid grid-cols-1 gap-8">
              {/* Nível Acadêmico */}
              <div className="mb-4">
                <label
                  htmlFor="nivelAcademico"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Nível Acadêmico
                </label>
                <select
                  id="nivelAcademico"
                  name="nivelAcademico"
                  value={formacao.nivelAcademico}
                  onChange={(e) => setFormacao({...formacao, nivelAcademico: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Selecione um nível acadêmico</option>
                  {niveisAcademicos.map((nivel) => (
                    <option key={nivel.value} value={nivel.value}>
                      {nivel.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Curso */}
              <div className="mb-4">
                <label
                  htmlFor="curso"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Curso
                </label>
                <input
                  type="text"
                  id="curso"
                  name="curso"
                  value={formacao.curso}
                  onChange={(e) => setFormacao({...formacao, curso: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Nome do curso"
                  required
                />
              </div>

              {/* Instituição */}
              <div className="mb-4">
                <label
                  htmlFor="instituicao"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Instituição de Ensino
                </label>
                <input
                  type="text"
                  id="instituicao"
                  name="instituicao"
                  value={formacao.instituicao}
                  onChange={(e) => setFormacao({...formacao, instituicao: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Nome da instituição"
                  required
                />
              </div>

              {/* Ano de Conclusão */}
              <div className="mb-4">
                <label
                  htmlFor="anoConclusao"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Ano de Conclusão
                </label>
                <input
                  type="number"
                  id="anoConclusao"
                  name="anoConclusao"
                  min="1900"
                  max={new Date().getFullYear() + 10}
                  value={formacao.anoConclusao}
                  onChange={(e) => setFormacao({...formacao, anoConclusao: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Ano de conclusão"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Dica:
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Preencha todas as informações corretamente para que os recrutadores possam avaliar sua formação acadêmica.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full lg:w-1/2 mx-auto block cursor-pointer bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              {operationMode === "update" ? "Salvar Alterações" : "Cadastrar Formação"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRouter>
  );
}