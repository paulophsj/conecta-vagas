import { createCandidato, createEndereco, createFormacao } from "@/api/Candidato";
import { useState } from "react";
import { IMaskInput } from "react-imask";

export default function candidato() {
    const [formacaoAcademica, setFormacaoAcademica] = useState(0);
    const [enderecos, setEnderecos] = useState(0);

    const formSubmitHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        // Coletando os dados de formação acadêmica
        const cursos = formData.getAll('curso')
        const instituicoes = formData.getAll('instituicao')
        const anosConclusao = formData.getAll('anoConclusao')
        const niveisAcademicos = formData.getAll('nivelAcademico')

        const todosCursos = cursos.map((curso, index) => ({
            curso: curso,
            instituicao: instituicoes[index],
            anoConclusao: anosConclusao[index],
            nivelAcademico: niveisAcademicos[index],
        }))

        // Coletando dados de endereço
        const cep = formData.getAll('cep')
        const logradouro = formData.getAll('logradouro')
        const numero = formData.getAll('numero')
        const complemento = formData.getAll('complemento')
        const bairro = formData.getAll('bairro')
        const cidade = formData.getAll('cidade')
        const estado = formData.getAll('estado')

        const todosEnderecos = logradouro.map((logradouro, index) => ({
            enderecoCep: cep[index],
            enderecoRua: logradouro,
            enderecoNumero: numero[index],
            enderecoComplemento: complemento[index],
            enderecoBairro: bairro[index],
            enderecoCidade: cidade[index],
            enderecoEstado: estado[index],
        }))

        const informacoesPessoais = {
            cpf: data.cpf,
            nome: data.nome,
            dataNascimento: data.dataNascimento,
            numeroTelefone: data.numeroTelefone,
            resumoProfissional: data.resumoProfissional,
            cargoPretendido: data.cargoPretendido,
            pretensaoSalarial: parseFloat(data.pretensaoSalarial.toString().replace('R$ ', '')),
        }
        const formacaoAcademica = todosCursos

        const endereco = todosEnderecos

        await salvarCandidato(informacoesPessoais, endereco, formacaoAcademica)

    }
    const salvarCandidato = async (informacoesPessoais, endereco, formacaoAcademica) => {
        try {
            const { id: candidato_id } = await createCandidato(informacoesPessoais)
            await createEndereco(candidato_id, endereco)
            await createFormacao(candidato_id, formacaoAcademica)
            console.log("Candidato cadastrado com sucesso!")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
                <h1 className="text-2xl font-bold text-center text-blue-400 mb-8">Cadastro</h1>

                <form className="space-y-8" onSubmit={formSubmitHandler}>
                    {/* Layout principal em grid (2 colunas em desktop) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Coluna 1 - Informações Pessoais e Formação */}
                        <div className="space-y-8">
                            {/* Seção de Informações Pessoais */}
                            <div className="border-b border-gray-200 pb-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">
                                            CPF
                                        </label>
                                        <IMaskInput
                                            mask="000.000.000-00"
                                            type="text"
                                            id="cpf"
                                            name="cpf"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="000.000.000-00"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">
                                            Nome Completo
                                        </label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Seu nome completo"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="dataNascimento" className="block text-gray-700 text-sm font-bold mb-2">
                                            Data Nascimento
                                        </label>
                                        <IMaskInput
                                            mask="00/00/0000"
                                            type="text"
                                            id="dataNascimento"
                                            name="dataNascimento"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="DD/MM/AAAA"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="numeroTelefone" className="block text-gray-700 text-sm font-bold mb-2">
                                            Telefone
                                        </label>
                                        <IMaskInput
                                            mask="(00) 00000-0000"
                                            type="tel"
                                            id="numeroTelefone"
                                            name="numeroTelefone"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="(00) 00000-0000"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Seção de Formação Acadêmica */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex justify-between mb-4 max-md:flex-col items-start">
                                    <h2 className="text-lg font-semibold text-gray-800">Formação Acadêmica</h2>
                                    <button
                                        type="button"
                                        className="text-sm bg-blue-100 text-blue-600 px-3 py-1 cursor-pointer rounded hover:bg-blue-200 transition-colors"
                                        onClick={() => setFormacaoAcademica(formacaoAcademica + 1)}
                                    >
                                        + Adicionar Formação
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor="curso" className="block text-gray-700 text-sm font-bold mb-2">
                                            Curso
                                        </label>
                                        <input
                                            type="text"
                                            id="curso"
                                            name="curso"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Nome do curso"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="mb-4">
                                            <label htmlFor="instituicao" className="block text-gray-700 text-sm font-bold mb-2">
                                                Instituição
                                            </label>
                                            <input
                                                type="text"
                                                id="instituicao"
                                                name="instituicao"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                placeholder="Nome da instituição"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="anoConclusao" className="block text-gray-700 text-sm font-bold mb-2">
                                                Ano de Conclusão
                                            </label>
                                            <IMaskInput
                                                mask="0000"
                                                type="text"
                                                id="anoConclusao"
                                                name="anoConclusao"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                placeholder="AAAA"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="nivelAcademico" className="block text-gray-700 text-sm font-bold mb-2">
                                            Nível de Formação
                                        </label>
                                        <select
                                            id="nivelAcademico"
                                            name="nivelAcademico"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <option value="">Selecione</option>
                                            <option value="MEDIO">Ensino Médio</option>
                                            <option value="TECNICO">Técnico</option>
                                            <option value="TECNOLOGO">Tecnólogo</option>
                                            <option value="GRADUACAO">Graduação</option>
                                            <option value="POS_GRADUACAO">Pós-Graduação</option>
                                            <option value="MESTRADO">Mestrado</option>
                                            <option value="DOUTORADO">Doutorado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {
                                Array.from({ length: formacaoAcademica }).map((_, index) => (
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="flex justify-between mb-4 max-md:flex-col items-start">
                                            <h2 className="text-lg font-semibold text-gray-800">Formação Acadêmica {index + 1}</h2>
                                            <button
                                                type="button"
                                                className="text-sm bg-blue-100 text-blue-600 px-3 py-1 cursor-pointer rounded hover:bg-blue-200 transition-colors"
                                                onClick={() => setFormacaoAcademica(formacaoAcademica + 1)}
                                            >
                                                + Adicionar Formação
                                            </button>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="curso" className="block text-gray-700 text-sm font-bold mb-2">
                                                Curso
                                            </label>
                                            <input
                                                type="text"
                                                id="curso"
                                                name="curso"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                placeholder="Nome do curso"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="instituicao" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Instituição
                                                </label>
                                                <input
                                                    type="text"
                                                    id="instituicao"
                                                    name="instituicao"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    placeholder="Nome da instituição"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="anoConclusao" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Ano de Conclusão
                                                </label>
                                                <IMaskInput
                                                    mask="0000"
                                                    type="text"
                                                    id="anoConclusao"
                                                    name="anoConclusao"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    placeholder="AAAA"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="nivelAcademico" className="block text-gray-700 text-sm font-bold mb-2">
                                                Nível de Formação
                                            </label>
                                            <select
                                                id="nivelAcademico"
                                                name="nivelAcademico"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            >
                                                <option value="">Selecione</option>
                                                <option value="MEDIO">Ensino Médio</option>
                                                <option value="TECNICO">Técnico</option>
                                                <option value="TECNOLOGO">Tecnólogo</option>
                                                <option value="GRADUACAO">Graduação</option>
                                                <option value="POS_GRADUACAO">Pós-Graduação</option>
                                                <option value="MESTRADO">Mestrado</option>
                                                <option value="DOUTORADO">Doutorado</option>
                                            </select>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Coluna 2 - Endereço e Informações Profissionais */}
                        <div className="space-y-8">
                            {/* Seção de Endereço */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex justify-between max-md:flex-col items-start mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Endereço</h2>
                                    <button
                                        type="button"
                                        className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                                        onClick={() => setEnderecos(enderecos + 1)}
                                    >
                                        + Adicionar Endereço
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor="cep" className="block text-gray-700 text-sm font-bold mb-2">
                                            CEP
                                        </label>
                                        <IMaskInput
                                            mask="00000-000"
                                            type="text"
                                            id="cep"
                                            name="cep"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="00000-000"
                                        />
                                    </div>

                                    <div className="mb-4 md:col-span-2">
                                        <label htmlFor="logradouro" className="block text-gray-700 text-sm font-bold mb-2">
                                            Logradouro
                                        </label>
                                        <input
                                            type="text"
                                            id="logradouro"
                                            name="logradouro"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Rua/Avenida"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="numero" className="block text-gray-700 text-sm font-bold mb-2">
                                            Número
                                        </label>
                                        <input
                                            type="text"
                                            id="numero"
                                            name="numero"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Número"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="complemento" className="block text-gray-700 text-sm font-bold mb-2">
                                            Complemento
                                        </label>
                                        <input
                                            type="text"
                                            id="complemento"
                                            name="complemento"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Complemento"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="bairro" className="block text-gray-700 text-sm font-bold mb-2">
                                            Bairro
                                        </label>
                                        <input
                                            type="text"
                                            id="bairro"
                                            name="bairro"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Bairro"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="cidade" className="block text-gray-700 text-sm font-bold mb-2">
                                            Cidade
                                        </label>
                                        <input
                                            type="text"
                                            id="cidade"
                                            name="cidade"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Cidade"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="estado" className="block text-gray-700 text-sm font-bold mb-2">
                                            Estado
                                        </label>
                                        <select
                                            id="estado"
                                            name="estado"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <option value="">Selecione</option>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            {/* Adicione todos os estados brasileiros */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {
                                Array.from({ length: enderecos }).map((_, index) => (
                                    <div className="border-b border-gray-200 pb-6">
                                <div className="flex justify-between max-md:flex-col items-start mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Endereço {index + 1}</h2>
                                    <button
                                        type="button"
                                        className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                                        onClick={() => setEnderecos(enderecos + 1)}
                                    >
                                        + Adicionar Endereço
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor="cep" className="block text-gray-700 text-sm font-bold mb-2">
                                            CEP
                                        </label>
                                        <IMaskInput
                                            mask="00000-000"
                                            type="text"
                                            id="cep"
                                            name="cep"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="00000-000"
                                        />
                                    </div>

                                    <div className="mb-4 md:col-span-2">
                                        <label htmlFor="logradouro" className="block text-gray-700 text-sm font-bold mb-2">
                                            Logradouro
                                        </label>
                                        <input
                                            type="text"
                                            id="logradouro"
                                            name="logradouro"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Rua/Avenida"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="numero" className="block text-gray-700 text-sm font-bold mb-2">
                                            Número
                                        </label>
                                        <input
                                            type="text"
                                            id="numero"
                                            name="numero"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Número"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="complemento" className="block text-gray-700 text-sm font-bold mb-2">
                                            Complemento
                                        </label>
                                        <input
                                            type="text"
                                            id="complemento"
                                            name="complemento"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Complemento"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="bairro" className="block text-gray-700 text-sm font-bold mb-2">
                                            Bairro
                                        </label>
                                        <input
                                            type="text"
                                            id="bairro"
                                            name="bairro"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Bairro"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="cidade" className="block text-gray-700 text-sm font-bold mb-2">
                                            Cidade
                                        </label>
                                        <input
                                            type="text"
                                            id="cidade"
                                            name="cidade"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Cidade"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="estado" className="block text-gray-700 text-sm font-bold mb-2">
                                            Estado
                                        </label>
                                        <select
                                            id="estado"
                                            name="estado"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <option value="">Selecione</option>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            {/* Adicione todos os estados brasileiros */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                                ))
                            }

                            {/* Seção de Informações Profissionais */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações Profissionais</h2>

                                <div className="mb-4">
                                    <label htmlFor="cargoPretendido" className="block text-gray-700 text-sm font-bold mb-2">
                                        Cargo Pretendido
                                    </label>
                                    <input
                                        type="text"
                                        id="cargoPretendido"
                                        name="cargoPretendido"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Cargo desejado"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="pretensaoSalarial" className="block text-gray-700 text-sm font-bold mb-2">
                                        Pretensão Salarial
                                    </label>
                                    <IMaskInput
                                        mask="R$ num"
                                        blocks={{
                                            num: {
                                                mask: Number,
                                            }
                                        }}
                                        type="text"
                                        id="pretensaoSalarial"
                                        name="pretensaoSalarial"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="R$ 0,00"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="resumoProfissional" className="block text-gray-700 text-sm font-bold mb-2">
                                        Resumo Profissional
                                    </label>
                                    <textarea
                                        id="resumoProfissional"
                                        name="resumoProfissional"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        rows="4"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full lg:w-1/2 mx-auto block cursor-pointer bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Enviar Candidatura
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Ao enviar, você concorda com nossos{' '}
                        <a href="#" className="text-blue-400 hover:underline">
                            Termos de Uso
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}