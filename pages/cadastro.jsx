import { createCandidato, createEndereco, createFormacao } from "@/api/Candidato";
import { createRecrutador } from "@/api/Recrutador";
import Cidades from "@/components/Inputs/Cidades";
import Estados from "@/components/Inputs/Estados";
import ProtectedRouterCaseToken from "@/components/Router/ProtectedRouterCaseToken";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";

export default function CadastroPage() {
  const [formacaoAcademica, setFormacaoAcademica] = useState(0)
  const [enderecos, setEnderecos] = useState(0)
  const [isCandidato, setIsCandidato] = useState(true)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [isValidusername, setIsValidusername] = useState(false)

  const [selectedEstado, setSelectedEstado] = useState(null)

  useEffect(() => {
    if (password === '' || confirmPassword === '') {
      setPasswordsMatch(false)
      return
    }
    setPasswordsMatch(password === confirmPassword)
  }, [confirmPassword, password])

  useEffect(() => {
    const form = document.getElementById('form')

    if (form) {
      form.reset()
    }

    setFormacaoAcademica(0)
    setEnderecos(0)
    setPassword('')
    setConfirmPassword('')
    setPasswordsMatch(false)
    setShowPassword(false)
    setShowConfirmPassword(false)
    setIsValidusername(false)
    setSelectedEstado(null)
  }, [isCandidato])

  const formSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    if (!isCandidato) {
      return await salvarRecrutador({ ...data, tipoPerfil: {}, password: password })
    }

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
      enderecoRua: logradouro[index],
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
      email: data.email,
      pretensaoSalarial: parseFloat(data.pretensaoSalarial?.toString().replace('R$ ', '')),
      ...(passwordsMatch ? { password: password } : {}),
    }
    const formacaoAcademica = todosCursos

    const endereco = todosEnderecos

    return await salvarCandidato(informacoesPessoais, endereco, formacaoAcademica)
  }
  const salvarCandidato = async (informacoesPessoais, endereco, formacaoAcademica) => {
    try {
      await createCandidato(informacoesPessoais)
      await createEndereco(endereco)
      await createFormacao(formacaoAcademica)
      toast.success("Você foi cadastrado com sucesso!")
    } catch (error) {
      toast.error(error.message)
    }
  }
  const salvarRecrutador = async (recrutadorProfile) => {
    try {
      await createRecrutador(recrutadorProfile)
      toast.success("Você foi cadastrado com sucesso!")
    } catch (error) {
      toast.error(error.message)
    }
  }
  const handleusername = (e) => {
    if (e.includes("@") && e.includes(".com")) setIsValidusername(true)
    else setIsValidusername(false)

  }

  return (
    <ProtectedRouterCaseToken>
      <Head>
        <title>Cadastro</title>
        <meta name="description" content="Tela de cadastro" />
      </Head>
      <div className="flex justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
          <form id="form" className="space-y-8" onSubmit={formSubmitHandler} autoComplete="off">
            <div className="">
              <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Cadastro de Usuário</h1>
              {/* Seletor de Perfil */}
              <div className="flex justify-center mb-10">
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setIsCandidato(true)}
                    className={`px-8 py-3 text-lg font-medium rounded-l-lg ${isCandidato ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Sou Candidato
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCandidato(false)}
                    className={`px-8 py-3 text-lg font-medium rounded-r-lg ${!isCandidato ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Sou Recrutador
                  </button>
                </div>
              </div>
            </div>
            {/* Layout principal em grid (2 colunas em desktop) */}
            <div className="">
              {/* Coluna 1 - Informações Pessoais e Formação */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Seção de Informações Pessoais */}
                <div className="w-full">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label htmlFor={isCandidato ? "cpf" : "cnpj"} className="block text-gray-700 text-sm font-bold mb-2">
                        {
                          isCandidato ? "CPF" : "CNPJ"
                        }
                      </label>
                      <IMaskInput
                        mask={isCandidato ? "000.000.000-00" : "00.000.000/0000-00"}
                        type="text"
                        id={isCandidato ? "cpf" : "cnpj"}
                        name={isCandidato ? "cpf" : "cnpj"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder={isCandidato ? "000.000.000-00" : "00.000.000/0000-00"}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor={isCandidato ? "nome" : "nomeEmpresa"} className="block text-gray-700 text-sm font-bold mb-2">
                        {isCandidato ? "Nome completo" : "Nome da empresa"}
                      </label>
                      <IMaskInput
                        mask={/^[A-Za-zÀ-ÿ\s]*$/}
                        type="text"
                        id={isCandidato ? "nome" : "nomeEmpresa"}
                        name={isCandidato ? "nome" : "nomeEmpresa"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder={isCandidato ? "Seu nome completo" : "Nome da empresa"}
                        required
                      />
                    </div>
                    {
                      isCandidato &&
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
                    }
                    <div className={`mb-4 ${isCandidato ? "" : "col-span-2"}`}>
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
                  <div className="grid grid-cols-1 mb-4">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input onChange={(e) => handleusername(e.target.value)} type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                      <span className={`text-sm ${isValidusername ? 'text-green-500' : 'text-red-500'} flex gap-2 mt-2`}>
                        {
                          !isValidusername ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg>
                          ) :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                        }
                        O email deve ser válido.
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 border-b border-gray-200 pb-6">
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Senha
                      </label>
                      <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} minLength={6} maxLength={50} required value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" autoComplete="new-password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <button tabIndex={-1} className={`cursor-pointer text-gray-700 absolute inset-y-0 right-0 px-3 flex items-center`} type="button" onClick={() => setShowPassword(!showPassword)}>
                          {
                            showPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                            </svg> :
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                              </svg>
                          }
                        </button>
                      </div>
                      <span className={`text-sm ${password.length >= 6 ? 'text-green-500' : 'text-red-500'} flex gap-2 mt-2`}>
                        {
                          password.length < 6 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg>
                          ) :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                        }
                        Deve ter pelo menos 6 caracteres
                      </span>
                      {
                        password.length === 50 && (
                          <span className="text-yellow-500 flex gap-2 mt-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                              <path d="M8.982 1.566a1.5 1.5 0 0 0-2.964 0L.165 13.233A1.5 1.5 0 0 0 1.5 15h13a1.5 1.5 0 0 0 1.335-2.767L8.982 1.566zM7.002 6a1 1 0 1 1 2 .001v3a1 1 0 0 1-2 .001V6zm1.002 6a1.002 1.002 0 1 1 .001-2.004A1.002 1.002 0 0 1 8.004 12z" />
                            </svg>
                            A senha não pode ter mais de 50 caracteres
                          </span>
                        )
                      }
                    </div>
                    <div className="mb-7">
                      <label htmlFor="confirmar-password" className={`block ${password.length < 6 ? 'text-gray-400' : 'text-gray-700'} text-sm font-bold mb-2`}>
                        Confirmar senha
                      </label>
                      <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'} minLength={6} maxLength={50} disabled={password.length < 6} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmar-password" autoComplete="new-password" name="confirmar-password" className={`w-full px-3 py-2 border ${password.length < 6 ? 'bg-gray-200 opacity-50' : ''} border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`} />
                        <button tabIndex={-1} className={`cursor-pointer ${password.length < 6 ? 'text-gray-400 pointer-events-none' : 'text-gray-700 pointer-events-all'} absolute inset-y-0 right-0 px-3 flex items-center`} type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {
                            showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                            </svg> :
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                              </svg>
                          }
                        </button>
                      </div>
                      <span>
                        {
                          confirmPassword.length >= 6 && (
                            passwordsMatch ?
                              <span className="text-green-500 flex gap-2 mt-2 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </svg>
                                As senhas coincidem</span>
                              :
                              <span className="text-red-500 flex gap-2 mt-2 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                </svg>
                                As senhas não coincidem</span>
                          )
                        }
                      </span>
                      {
                        confirmPassword.length === 50 && (
                          <span className="text-yellow-500 flex gap-2 mt-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                              <path d="M8.982 1.566a1.5 1.5 0 0 0-2.964 0L.165 13.233A1.5 1.5 0 0 0 1.5 15h13a1.5 1.5 0 0 0 1.335-2.767L8.982 1.566zM7.002 6a1 1 0 1 1 2 .001v3a1 1 0 0 1-2 .001V6zm1.002 6a1.002 1.002 0 1 1 .001-2.004A1.002 1.002 0 0 1 8.004 12z" />
                            </svg>
                            A senha não pode ter mais de 50 caracteres
                          </span>
                        )
                      }
                    </div>
                  </div>
                  {
                    isCandidato &&
                    <>
                      <button
                        type="button"
                        className="text-sm my-8 cursor-pointer bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                        onClick={() => setEnderecos(enderecos + 1)}
                      >
                        + Adicionar Endereço
                      </button>
                      {
                        Array.from({ length: enderecos }).map((_, index) => (
                          <div className="border-b border-gray-200 py-6" key={index}>
                            <div className="flex justify-between max-md:flex-col items-start mb-4">
                              <h2 className="text-lg font-semibold text-gray-800">Endereço {index + 1}</h2>
                              <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
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
                                <IMaskInput
                                  mask={/^[A-Za-zÀ-ÿ\s]*$/}
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
                                <IMaskInput
                                  mask={/^\d+$/}
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
                                <IMaskInput
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
                                <IMaskInput
                                  mask={/^[A-Za-zÀ-ÿ\s]*$/}
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
                                <IMaskInput
                                  mask={/^[A-Za-zÀ-ÿ\s]*$/}
                                  type="text"
                                  id="cidade"
                                  name="cidade"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  placeholder="Cidade"
                                />
                              </div>

                              <div className="">
                                <label htmlFor="estado" className="block text-gray-700 text-sm font-bold mb-2">
                                  Estado
                                </label>
                                <Estados />
                              </div>
                            </div>
                          </div>
                        )).reverse()
                      }
                    </>
                  }
                </div>


                {/* Seção de Informações Profissionais */}
                {
                  isCandidato ?
                    <div className="space-y-8">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações Profissionais</h2>

                      <div className="mb-4">
                        <label htmlFor="cargoPretendido" className="block text-gray-700 text-sm font-bold mb-2">
                          Cargo Pretendido
                        </label>
                        <IMaskInput
                          mask={/^[A-Za-zÀ-ÿ\s]*$/}
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
                          rows="14"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        className="text-sm bg-blue-100 text-blue-600 px-3 py-1 cursor-pointer rounded hover:bg-blue-200 transition-colors"
                        onClick={() => setFormacaoAcademica(formacaoAcademica + 1)}
                      >
                        + Adicionar Formação
                      </button>
                      {
                        Array.from({ length: formacaoAcademica }).map((_, index) => (
                          <div className="border-b border-gray-200 py-6" key={index}>
                            <div className="flex justify-between mb-4 max-md:flex-col items-start">
                              <h2 className="text-lg font-semibold text-gray-800">Formação Acadêmica {index + 1}</h2>
                              <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                              <div className="mb-4">
                                <label htmlFor="curso" className="block text-gray-700 text-sm font-bold mb-2">
                                  Curso
                                </label>
                                <IMaskInput
                                  mask={/^[A-Za-zÀ-ÿ\s]*$/}
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
                                  <IMaskInput
                                    mask={/^[A-Za-zÀ-ÿ\s]*$/}
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
                                  className="w-full px-3 py-[10] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  defaultValue=""
                                >
                                  <option value={""} disabled>Selecione</option>
                                  <option value="ENSINO_FUNDAMENTAL">Ensino Fundamental</option>
                                  <option value="ENSINO_MEDIO">Ensino Médio</option>
                                  <option value="TECNICO">Técnico</option>
                                  <option value="TECNOLOGO">Tecnólogo</option>
                                  <option value="SUPERIOR">Superior</option>
                                  <option value="POS_GRADUACAO">Pós-Graduação</option>
                                  <option value="MESTRADO">Mestrado</option>
                                  <option value="DOUTORADO">Doutorado</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )).reverse()
                      }
                    </div>
                    :
                    <div className="max-w-3xl mx-auto bg-white">
                      <div className="space-y-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações Corporativas</h2>
                        <div className="mb-6">
                          <div className="flex flex-wrap justify-between gap-4">
                            <div className="w-full sm:w-3/12">
                              <label for="estado" className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                              <Estados handleChange={(e) => setSelectedEstado(e.target.value)} />
                            </div>
                            <div className="w-full sm:w-8/12">
                              <label for="cidade" className="block text-gray-700 text-sm font-bold mb-2">Cidade</label>
                              <Cidades byEstado={selectedEstado} />
                            </div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="mb-4">
                                <label htmlFor="anoFundacao" className="block text-gray-700 text-sm font-bold mb-2">
                                  Ano de Fundação
                                </label>
                                <IMaskInput
                                  mask="0000"
                                  type="text"
                                  id="anoFundacao"
                                  name="anoFundacao"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  placeholder="AAAA"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label for="porteEmpresa" className="block text-gray-700 text-sm font-bold mb-2">Porte da Empresa</label>
                              <select
                                id="porteEmpresa"
                                name="porteEmpresa"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                                defaultValue={""}
                              >
                                <option value="" disabled selected>Selecione</option>
                                <option value="MEI">MEI</option>
                                <option value="MICRO">Microempresa</option>
                                <option value="PEQUENA">Pequena</option>
                                <option value="MEDIA">Média</option>
                                <option value="GRANDE">Grande</option>
                              </select>
                            </div>
                            <div>
                              <label for="numeroFuncionarios" className="block text-gray-700 text-sm font-bold mb-2">Nº de Funcionários</label>
                              <IMaskInput
                                mask="num"
                                blocks={{
                                  num: {
                                    mask: Number,
                                  }
                                }}
                                type="text"
                                id="numeroFuncionarios"
                                name="numeroFuncionarios"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Quantidade"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="grid grid-cols-1">
                            <div>
                              <label for="setorEmpresa" className="block text-gray-700 text-sm font-bold mb-2">Setor Principal</label>
                              <select
                                id="setorEmpresa"
                                name="setorEmpresa"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                                defaultValue={""}
                              >
                                <option value="" disabled selected>Selecione</option>
                                <option value="TECNOLOGIA">Tecnologia</option>
                                <option value="SAUDE">Saúde</option>
                                <option value="EDUCACAO">Educação</option>
                                <option value="FINANCAS">Finanças</option>
                                <option value="INDUSTRIA">Indústria</option>
                                <option value="COMERCIO">Comércio</option>
                                <option value="SERVICOS">Serviços</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label for="descricaoEmpresa" className="block text-gray-700 text-sm font-bold mb-2">
                            Cultura Organizacional (descreva em poucas palavras)
                          </label>
                          <textarea
                            id="descricaoEmpresa"
                            name="descricaoEmpresa"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="5"
                            placeholder="Ex: Ambiente dinâmico, foco em inovação, horários flexíveis..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                }
              </div>
            </div>

            <button
              type="submit"
              className={`w-full lg:w-1/2 mx-auto block cursor-pointer ${passwordsMatch && isValidusername ? 'bg-blue-400' : 'bg-gray-300 pointer-events-none'} text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
              disabled={!passwordsMatch || !isValidusername}
            >
              {
                passwordsMatch && isValidusername
                  ? 'Enviar Cadastro'
                  : !passwordsMatch ? 'As senhas não coincidem'
                    : !isValidusername ? "O username precisa ser válido"
                      : "Algo deu errado."
              }
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Ao enviar, você concorda com nossos{' '}
              <Link href={{ pathname: '/' }} className="text-blue-400 hover:underline">
                Termos de Uso
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ProtectedRouterCaseToken>
  );
}