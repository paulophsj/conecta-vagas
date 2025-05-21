import ListCard from "@/components/Cards/ListCard";
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
            <span className={`${openModal ? "opacity-50 pointer-events-all" : "opacity-0 pointer-events-none"} fixed z-50 w-full h-full top-0 left-0 bg-gray-900 transition-all duration-200`}></span>
            <section className="container p-5 mx-auto flex flex-col gap-5 md:flex-row">
                <div className="w-full md:hidden">
                    <button type="button" onClick={() => setOpenModal(true)} className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 cursor-pointer p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-sliders2" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <p className="text-white font-bold">Filtros</p>
                    </button>
                </div>
                <ListCard />
                <div className={`bg-white fixed w-screen h-screen z-50 p-4 left-0 top-0 md:h-fit md:sticky md:max-h-screen justify-self-start md:z-40 grow md:top-23 shadow-md rounded-sm md:translate-y-0 flex flex-col justify-between ${openModal ? "translate-y-0" : "translate-y-full"} transition-transform duration-500 ease-in-out`}>
                    <div className="mb-2">
                        <header className="mb-2">
                            <p className="font-bold text-lg">FILTROS</p>
                        </header>
                        <section>
                            <ul className="grid grid-cols-2">
                                <li className="flex flex-col gap-1">
                                    <p className="font-bold" id="localidade">Localidade</p>
                                    <label className="flex gap-2" htmlFor="localidade">
                                        <input type="checkbox" />
                                        <span>São Paulo</span>
                                    </label>
                                    <label className="flex gap-2" htmlFor="localidade">
                                        <input type="checkbox" />
                                        <span>Florianópolis</span>
                                    </label>
                                    <label className="flex gap-2" htmlFor="localidade">
                                        <input type="checkbox" />
                                        <span>Remoto</span>
                                    </label>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <p className="font-bold" id="area">Área</p>
                                    <label className="flex gap-2" htmlFor="area">
                                        <input type="checkbox" />
                                        <span>Desenvolvimento</span>
                                    </label>
                                    <label className="flex gap-2" htmlFor="area">
                                        <input type="checkbox" />
                                        <span>Design</span>
                                    </label>
                                    <label className="flex gap-2" htmlFor="area">
                                        <input type="checkbox" />
                                        <span>Dados</span>
                                    </label>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <p className="font-bold" id="tipoEmprego">Tipo de emprego</p>
                                    <label className="flex gap-2" htmlFor="tipoEmprego">
                                        <input type="checkbox" />
                                        <span>Tempo integral</span>
                                    </label>
                                    <label className="flex gap-2" htmlFor="tipoEmprego">
                                        <input type="checkbox" />
                                        <span>Meio período</span>
                                    </label>
                                    <label className="flex gap-2" htmlFor="tipoEmprego">
                                        <input type="checkbox" />
                                        <span>Estágio</span>
                                    </label>
                                </li>
                                <li className="flex flex-col gap-1 col-span-2 ">
                                    <p className="font-bold" id="faixaSalarial">Faixa salarial</p>
                                    <label className="flex gap-2" htmlFor="faixaSalarial">
                                        <input type="checkbox" />
                                        <span>R$ 120,00 e R$ 500,00</span>
                                    </label>
                                    <label className="flex gap-2" htmlFor="faixaSalarial">
                                        <input type="checkbox" />
                                        <span>R$ 500,00 e R$ 920,00</span>
                                    </label>
                                    <label className="flex gap-2" htmlFor="faixaSalarial">
                                        <input type="checkbox" />
                                        <span>R$ 920,00 e R$ 1400,00</span>
                                    </label>
                                    <label className="flex gap-2 items-center w-full" htmlFor="faixaSalarial">
                                        Entre
                                        <input type="number" min={100} className="w-full shadow-lg focus:outline-1 outline-orange-500 p-1 rounded-sm" placeholder="R$ 150,00" />
                                        e
                                        <input type="number" max={7200} className="w-full shadow-lg focus:outline-1 outline-orange-500 p-1 rounded-sm" placeholder="R$ 7200,00" />
                                    </label>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <footer className="flex gap-3 mb-5">
                        <button onClick={() => setOpenModal(false)} className="max-sm:text-xs md:hidden w-full justify-center cursor-pointer p-2 items-center rounded-sm text-white flex gap-3 bg-red-500 hover:bg-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-5 h-5 max-sm:w-3 max-sm:h-3 bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                            <p>
                                Fechar
                            </p>
                        </button>
                        <button onClick={() => setOpenModal(false)} className="max-sm:text-xs md:text-sm w-full justify-center cursor-pointer p-2 items-center rounded-sm text-white flex gap-3 bg-blue-400 hover:bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-5 h-5 max-sm:w-3 max-sm:h-3 bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                            </svg>
                            <p>
                                Salvar alterações
                            </p>
                        </button>
                        <button onClick={() => setOpenModal(false)} className="md:text-sm max-sm:text-xs w-full justify-center cursor-pointer p-2 items-center rounded-sm text-white flex gap-3 bg-yellow-400 hover:bg-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="w-5 h-5 max-sm:w-3 max-sm:h-3 bi bi-eraser-fill" viewBox="0 0 16 16">
                                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
                            </svg>
                            <p>
                                Limprar filtros
                            </p>
                        </button>
                    </footer>
                </div>
            </section>
        </>
    )
}