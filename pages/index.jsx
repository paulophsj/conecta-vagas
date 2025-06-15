import ListCard from "@/components/Cards/ListCard";
import ListComments from "@/components/Comments/ListComments";
import { useLocalidades } from "@/hooks/Localidades";
import Link from "next/link";
import { useState } from "react";

export default function index() {
    const { estados, municipios } = useLocalidades()
    const [valoresBuscados, setValoresBuscados] = useState(null)

    const [inputEstado, setInputEstado] = useState(null)

    const showOpcoes = (e) => {
        if (e.length >= 1) {
            const opcoesEstados = estados.filter((estado) => estado.nome.toLowerCase().includes(e.toLowerCase()))
            const opcoesMunicipios = municipios.filter((municipio) => municipio.nome?.toLowerCase().includes(e.toLowerCase())).map((value) => ({ nome: value?.nome, uf: value?.microrregiao?.mesorregiao?.UF?.nome }))
            setValoresBuscados([...opcoesEstados, ...opcoesMunicipios])
        }
        else {
            setValoresBuscados(null)
        }
    }
    return (
        <>
            <section className="container mx-auto p-15 max-sm:p-10 flex flex-col items-center gap-10">
                <h1 className="text-center text-5xl max-lg:text-4xl text-blue-900 dark:text-white font-bold">
                    Encontre a vaga ideal <br /> para você
                </h1>
                <form className="w-4xl flex justify-center gap-2 max-sm:flex-col max-sm:w-full max-lg:w-full">
                    <div className="w-full flex gap-2">
                        <input type="text" className="shadow-sm shadow-blue-400 placeholder:text-sm w-full max-sm:h-10 placeholder:text-blue-900 dark:placeholder:text-white p-2 max-sm:pl-3 focus:outline-1 focus:outline-blue-400 rounded-sm placeholder:text-center h-full" placeholder="O que você procura?(ex.: vendedor, TI...)" />
                        <div className="w-full relative hidden md:block">
                            <input
                            type="text"
                            id="buscar-localidade"
                            value={inputEstado}
                            onChange={(e) => {
                                setInputEstado(e.target.value)
                                showOpcoes(e.target.value)
                            }}
                            autoComplete="off"
                            className="max-sm:hidden shadow-sm shadow-blue-400 placeholder:text-sm w-full max-sm:h-10 placeholder:text-blue-900 dark:placeholder:text-white p-2 focus:outline-1 focus:outline-blue-400 rounded-sm placeholder:text-center h-full"
                            placeholder="Localização (Cidade/Estado)"
                        />
                            {
                                valoresBuscados && valoresBuscados.length > 0 ? (
                                    <div className="absolute w-full z-10 max-sm:w-80 max-sm:top-10 max-sm:left-0 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-blue-100 dark:border-gray-600">
                                        <ul className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                                            {valoresBuscados.map((localidade) => (
                                                <li
                                                    key={localidade.id}
                                                    onClick={() => {
                                                        setInputEstado(localidade.nome + (localidade?.uf ? `, ${localidade.uf}` : ''))
                                                        setValoresBuscados(null);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 border-b border-blue-50 dark:border-gray-700 last:border-b-0 flex items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-blue-800 dark:text-blue-100 font-medium">
                                                        {localidade.nome}
                                                        {
                                                            localidade?.uf && (
                                                                `, ${localidade.uf}`
                                                            )
                                                        }
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                    <button className="bg-orange-400 max-sm:h-10 p-5 rounded-sm flex items-center justify-center gap-4 hover:bg-orange-500 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                        <p className="text-white m-0 hidden max-sm:block">Buscar vagas</p>
                    </button>
                    <Link href={{ pathname: "/vagas" }} className="bg-blue-400 text-white rounded-sm h-10 sm:hidden hover:bg-blue-500 cursor-pointer flex justify-center items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                            <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                        </svg>
                        <p>Buscar todas as vagas</p>
                    </Link>
                </form>
            </section>
            <section className="container mb-10 mx-auto sm:px-6 lg:px-6">
                <h2 className="text-blue-900 dark:text-white text-2xl mb-10 font-bold text-center sm:text-left sm:text-3xl">Vagas em destaque</h2>
                <ListCard quantidade={4} />
            </section>
            <section className="container mx-auto sm:px-6 lg:px-8 mb-10">
                <h2 className="text-blue-900 dark:text-white text-2xl mb-10 font-bold text-center sm:text-left sm:text-3xl">Como funciona?</h2>
                <ul className="flex justify-center flex-wrap items-center gap-10 sm:justify-around">
                    <li className="w-40 h-40 flex flex-col items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="oklch(62.3% 0.214 259.815)" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                        <p className="text-blue-900 dark:text-white font-semibold text-center">1. Cadastre-se</p>
                    </li>
                    <li className="w-40 h-40 flex flex-col items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="oklch(62.3% 0.214 259.815)" className="bi bi-file-text" viewBox="0 0 16 16">
                            <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                        </svg>
                        <p className="text-blue-900 dark:text-white font-semibold text-center">2. Envie seu currículo</p>
                    </li>
                    <li className="w-40 h-40 flex flex-col items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="oklch(62.3% 0.214 259.815)" className="bi bi-hand-index-thumb" viewBox="0 0 16 16">
                            <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025" />
                        </svg>
                        <p className="text-blue-900 dark:text-white font-semibold text-center">3. Candidate-se com um clique</p>
                    </li>
                </ul>
            </section>
            <section className="container mb-10 mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-blue-900 dark:text-white text-2xl mb-10 font-bold text-center sm:text-left sm:text-3xl">Comentários</h2>
                <ListComments quantidade={4} />
            </section>
        </>
    );
}