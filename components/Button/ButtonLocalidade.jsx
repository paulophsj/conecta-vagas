import useLocalidades from "@/hooks/Localidades"
import { useEffect, useState } from "react"

export default function ButtonLocalidade() {
    const [openModal, setOpenModal] = useState(false)
    const {error, loading, localidades} = useLocalidades()

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
            <button type="button" onClick={() => setOpenModal(true)} title="Inserir localidade" className={`hidden bg-blue-400 p-2 w-auto max-sm:flex justify-center items-center rounded-sm hover:bg-blue-500 cursor-pointer`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
            </button>
            <span className={`${openModal ? "opacity-50 pointer-events-all" : "opacity-0 pointer-events-none"} fixed z-50 w-full h-full top-0 left-0 bg-gray-900 transition-all duration-200`}></span>
            <div id="default-modal" tabindex="-1" aria-hidden="true" className={`${openModal ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Selecione o Estado
                            </h3>
                            <button type="button" onClick={() => setOpenModal(false)} className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <select name="Opções" id="" defaultValue="1">
                                <option value="1" disabled>Selecionar Estado</option>
                                {
                                    localidades.map((localidade) => (
                                        <option key={localidade.id} value={localidade.sigla}>{localidade.nome}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="button" className="cursor-pointer text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Definir</button>
                            <button onClick={() => setOpenModal(false)} data-modal-hide="default-modal" type="button" className="cursor-pointer py-2.5 px-5 ms-3 text-sm font-bold text-gray-900 focus:outline-none bg-red-400 rounded-lg border border-gray-200 hover:bg-red-500 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}