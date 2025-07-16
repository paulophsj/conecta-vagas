import ListCard from "@/components/Cards/ListCard";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VagaIndexPage() {
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    const searchParams = useSearchParams()

    const [qntLocalidades, setQtdLocalidades] = useState(1)

    const [filtros, setFiltros] = useState({
        cargo: '',
        localidade: [],
        tipoEmprego: [],
    })

    useEffect(() => {
        const cargo = searchParams.get('cargo')
        const localidade = decodeURIComponent(searchParams.get('localidade')).split(',')
        console.log(localidade);
        
        if(cargo){
            setFiltros({
                cargo: cargo
            })
        }
    }, [searchParams])

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflow = "auto"
        }
    }, [openModal])

    const formSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const cargo = formData.get("cargo")
        const allLocalidades = formData.getAll("localidade")
        const allTipoEmprego = formData.getAll("tipoEmprego")

        setFiltros({
            cargo: cargo,
            localidade: allLocalidades,
            tipoEmprego: allTipoEmprego
        })

        console.log(filtros)
    }
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

                {!isLoading && (
                    <form onSubmit={(e) => formSubmit(e)} className={`bg-white dark:bg-gray-800 w-11/12 md:w-1/4 p-4 shadow-md rounded-sm border border-gray-200 dark:border-gray-700 max-md:fixed h-fit top-1/2 left-1/2 max-md:transform max-md:-translate-x-1/2 max-md:-translate-y-1/2 ${openModal ? "fixed inset-0 z-50 overflow-y-auto" : "hidden md:block"}`}>
                        <div className="flex flex-col h-full">
                            <div className="mb-2">
                                <header className="mb-4">
                                    <p className="font-bold text-lg dark:text-white">FILTROS</p>
                                </header>
                                <section className="space-y-4">
                                    <div>
                                        <p className="font-bold dark:text-gray-200">Nome do cargo</p>
                                        <input type="text" defaultValue={filtros?.cargo} name="cargo" className="dark:bg-gray-700 dark:border-gray-600 rounded-sm outline-1 p-1 outline-blue-500" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-bold dark:text-gray-200" id="localidade">Localidade</p>
                                        <button type="button" onClick={() => setQtdLocalidades(qntLocalidades + 1)} className="p-1 px-3 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-colors w-fit m-0 flex items-center justify-center gap-3 font-bold text-sm">
                                            +
                                            <p>Adicionar localidade</p>
                                        </button>
                                        <div className="flex flex-col gap-2">
                                            {
                                                Array.from({ length: qntLocalidades }).map((_, index) =>
                                                    <label key={index} className="flex gap-2 items-center dark:text-gray-300">
                                                        <input
                                                            type="text"
                                                            name="localidade"
                                                            className="dark:bg-gray-700 dark:border-gray-600 rounded-sm outline-1 p-1 outline-blue-500"
                                                        />
                                                        <button
                                                            tabIndex={1}
                                                            type="button"
                                                            onClick={() => setQtdLocalidades(qntLocalidades - 1)}
                                                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                            </svg>
                                                        </button>
                                                    </label>
                                                )
                                            }
                                        </div>

                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="font-bold dark:text-gray-200" id="tipoEmprego">Tipo de emprego</p>
                                        <label className="flex gap-2 items-center dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                name="tipoEmprego"
                                                value="CLT"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span>CLT</span>
                                        </label>
                                        <label className="flex gap-2 items-center dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                name="tipoEmprego"
                                                value="PJ"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span>PJ</span>
                                        </label>
                                        <label className="flex gap-2 items-center dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                name="tipoEmprego"
                                                value="FREELANCER"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span>Freelancer</span>
                                        </label>
                                        <label className="flex gap-2 items-center dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                name="tipoEmprego"
                                                value="MEI"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span>MEI</span>
                                        </label>
                                        <label className="flex gap-2 items-center dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                name="tipoEmprego"
                                                value="VOLUNTARIO"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span>Voluntário</span>
                                        </label>
                                        <label className="flex gap-2 items-center dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                name="tipoEmprego"
                                                value="APRENDIZ"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span>Aprendiz</span>
                                        </label>
                                        <label className="flex gap-2 items-center dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                name="tipoEmprego"
                                                value="INDERTEMINADO"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span>Indeterminado</span>
                                        </label>
                                        <label className="flex gap-2 items-center dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                name="tipoEmprego"
                                                value="ESTAGIO"
                                                className="dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <span>Estágio</span>
                                        </label>
                                    </div>
                                </section>
                            </div>

                            <footer className="mt-4 flex flex-col gap-3">
                                <button
                                    type="submit"
                                    className="text-xs w-full justify-center cursor-pointer p-2 items-center rounded-sm text-white flex gap-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-5 h-5 max-sm:w-3 max-sm:h-3 bi bi-check-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                    </svg>
                                    <p>Salvar alterações</p>
                                </button>
                                <button
                                    type="button"
                                    className="text-xs w-full justify-center cursor-pointer p-2 items-center rounded-sm text-white flex gap-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-5 h-5 max-sm:w-3 max-sm:h-3 bi bi-eraser-fill" viewBox="0 0 16 16">
                                        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
                                    </svg>
                                    <p>Limpar filtros</p>
                                </button>
                            </footer>
                        </div>
                    </form>
                )}

                <div className="w-full md:w-3/4">
                    <ListCard setIsLoading={() => setIsLoading()} listCardFilter={filtros} />
                </div>
            </section>
        </>
    )
}