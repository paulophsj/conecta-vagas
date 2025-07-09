import ListCard from "@/components/Cards/ListCard";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function vaga_index() {
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflow = "auto"
        }
    }, [openModal])

    return (
        <>
            <Head>
                <title>Lista de vagas</title>
                <meta name="description" content="Tela listagem de vagas" />
            </Head>
            <span onClick={() => setOpenModal(false)} className={`${openModal ? "opacity-50 pointer-events-all" : "opacity-0 pointer-events-none"} fixed z-50 w-full h-full top-0 left-0 bg-gray-900 transition-all duration-200`}></span>

            {/* Botão para abrir filtros em mobile */}
            <button
                onClick={() => setOpenModal(true)}
                className="md:hidden fixed bottom-5 right-5 z-40 p-3 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-full shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
            </button>

            <section className="container p-5 mx-auto flex flex-col md:flex-row gap-5 items-start">
                {/* Filtros - agora alinhados ao topo */}
                <div className={`bg-white w-11/12 md:w-1/4 p-4 shadow-md rounded-sm max-md:fixed h-fit top-1/2 left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 ${openModal ? "fixed inset-0 z-50 overflow-y-auto" : "hidden md:block"}`}>
                    <div className="flex flex-col h-full">
                        <div className="mb-2">
                            <header className="mb-4">
                                <p className="font-bold text-lg">FILTROS</p>
                            </header>
                            <section className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold" id="localidade">Localidade</p>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>São Paulo</span>
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>Florianópolis</span>
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>Remoto</span>
                                    </label>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="font-bold" id="area">Área</p>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>Desenvolvimento</span>
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>Design</span>
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>Dados</span>
                                    </label>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className="font-bold" id="tipoEmprego">Tipo de emprego</p>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>Tempo integral</span>
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>Meio período</span>
                                    </label>
                                    <label className="flex gap-2 items-center">
                                        <input type="checkbox" />
                                        <span>Estágio</span>
                                    </label>
                                </div>
                            </section>
                        </div>

                        <footer className="mt-4 flex flex-col gap-3">
                            <button className="text-xs w-full justify-center cursor-pointer p-2 items-center rounded-sm text-white flex gap-3 bg-blue-500 hover:bg-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-5 h-5 max-sm:w-3 max-sm:h-3 bi bi-check-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                                <p>Salvar alterações</p>
                            </button>
                            <button className="text-xs w-full justify-center cursor-pointer p-2 items-center rounded-sm text-white flex gap-3 bg-blue-500 hover:bg-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-5 h-5 max-sm:w-3 max-sm:h-3 bi bi-eraser-fill" viewBox="0 0 16 16">
                                    <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
                                </svg>
                                <p>Limpar filtros</p>
                            </button>
                        </footer>
                    </div>
                </div>

                {/* Conteúdo principal */}
                <div className="w-full md:w-3/4">
                    <ListCard />
                </div>
            </section>
        </>
    )
}