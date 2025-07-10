import { useState } from 'react';
import IMask from 'imask';
import Link from 'next/link';
import { IMaskInput } from 'react-imask';
import ProtectedRouter from '@/components/Router/ProtectedRouter';

export default function CreateVagaPage() {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    requisitos: '',
    localizacao: '',
    salario: '',
    ativa: true,
    tipoContrato: '',
    cargaHoraria: '',
    formato: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const tipoContratoOptions = [
    { value: 'CLT', label: 'CLT' },
    { value: 'PJ', label: 'PJ' },
    { value: 'FREELANCER', label: 'Freelancer' },
    { value: 'MEI', label: 'MEI' },
    { value: 'VOLUNTARIO', label: 'Voluntário' },
    { value: 'APRENDIZ', label: 'Aprendiz' },
    { value: 'INDERTEMINADO', label: 'Indeterminado' },
    { value: 'ESTAGIO', label: 'Estágio' }
  ];

  const formatoOptions = [
    { value: 'PRESENCIAL', label: 'Presencial' },
    { value: 'HIBRIDO', label: 'Híbrido' },
    { value: 'REMOTO', label: 'Remoto' }
  ];

  return (
    <ProtectedRouter byRecrutador={true}>
      <div className="flex justify-center p-8">
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-7xl">
          <h1 className="text-3xl font-bold text-center text-blue-500 mb-12">Criar Nova Vaga</h1>

          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* Seção de Informações Básicas */}
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Informações Básicas</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="titulo" className="block text-gray-700 text-lg font-medium mb-3">
                      Título da Vaga*
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Ex: Desenvolvedor Front-end"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="localizacao" className="block text-gray-700 text-lg font-medium mb-3">
                      Localização*
                    </label>
                    <input
                      type="text"
                      id="localizacao"
                      name="localizacao"
                      value={formData.localizacao}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Ex: Recife - PE"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="salario" className="block text-gray-700 text-lg font-medium mb-3">
                      Salário (R$)
                    </label>
                    <IMaskInput
                      mask={Number}
                      scale={2}
                      thousandsSeparator="."
                      radix=","
                      mapToRadix={["."]}
                      id="salario"
                      name="salario"
                      value={formData.salario}
                      onAccept={(value) => setFormData({...formData, salario: value})}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Ex: 1.512,00"
                    />
                  </div>

                  <div>
                    <label htmlFor="cargaHoraria" className="block text-gray-700 text-lg font-medium mb-3">
                      Carga Horária (horas/semana)
                    </label>
                    <IMaskInput
                      mask={Number}
                      id="cargaHoraria"
                      name="cargaHoraria"
                      value={formData.cargaHoraria}
                      onAccept={(value) => setFormData({...formData, cargaHoraria: value})}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Ex: 40"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="descricao" className="block text-gray-700 text-lg font-medium mb-3">
                    Descrição da Vaga*
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="6"
                    placeholder="Descreva as responsabilidades e atividades da vaga"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="requisitos" className="block text-gray-700 text-lg font-medium mb-3">
                    Requisitos*
                  </label>
                  <textarea
                    id="requisitos"
                    name="requisitos"
                    value={formData.requisitos}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="6"
                    placeholder="Liste os requisitos necessários para a vaga"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Seção de Detalhes da Vaga */}
            <div className="space-y-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Detalhes da Vaga</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="tipoContrato" className="block text-gray-700 text-lg font-medium mb-3">
                      Tipo de Contrato*
                    </label>
                    <select
                      id="tipoContrato"
                      name="tipoContrato"
                      value={formData.tipoContrato}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    >
                      <option value="" disabled>Selecione um tipo</option>
                      {tipoContratoOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="formato" className="block text-gray-700 text-lg font-medium mb-3">
                      Formato de Trabalho*
                    </label>
                    <select
                      id="formato"
                      name="formato"
                      value={formData.formato}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    >
                      <option value="" disabled>Selecione um formato</option>
                      {formatoOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="bg-gray-50 p-6 rounded-lg w-full">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="ativa"
                        name="ativa"
                        checked={formData.ativa}
                        onChange={(e) => setFormData({...formData, ativa: e.target.checked})}
                        className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="ativa" className="ml-3 block text-gray-700 text-lg">
                        Vaga ativa
                      </label>
                    </div>
                    <p className="mt-2 text-gray-500 text-sm">
                      Desmarque esta opção se quiser criar a vaga como inativa inicialmente
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full lg:w-1/3 mx-auto block bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-6 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Publicar Vaga
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Ao enviar, você concorda com nossos{' '}
              <Link href={{ pathname: '/' }} className="text-blue-500 hover:underline font-medium">
                Termos de Uso
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ProtectedRouter>
  );
}