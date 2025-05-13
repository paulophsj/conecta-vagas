import { useEffect, useState } from "react"

export default function Header() {
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflow = "auto"
        }
    }, [openModal])

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg className="shrink-0 w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="oklch(70.7% 0.165 254.624)" viewBox="0 0 18 20">
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"></path>
                    </svg>
                    <span className="self-center text-2xl font-semibold text-blue-400 whitespace-nowrap dark:text-white">UVagre</span>
                </a>
                <button onClick={(e) => setOpenModal(true)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm hover:cursor-pointer text-blue-400 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 px-3 font-bold text-blue-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Início</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 font-bold text-blue-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Vagas</a>
                        </li>
                        <li>
                            <a href="/" className="block py-2 px-3 font-bold text-blue-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cadastrar Currículo</a>
                        </li>
                        <li>
                            <a href="/" className="block px-8 font-bold text-white bg-orange-400 rounded-sm hover:bg-orange-500 md:hover:bg-orange-500 md:border-0 md:hover:text-white md:px-4 md:py-1 dark:text-white md:dark:hover:text-white dark:hover:bg-orange-500 dark:hover:text-white md:dark:hover:bg-orange-500">Login</a>
                        </li>
                    </ul>
                </div>

                {
                    //Modal ao abrir o menu hamburguer
                    openModal && (
                        <span onClick={() => setOpenModal(false)} className="fixed z-40 w-full h-full top-0 left-0 bg-gray-900 opacity-50"></span>
                    )
                }

                <div id="drawer-navigation" className={`fixed md:hidden lg:hidden top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform bg-white w-64 dark:bg-gray-800 ${openModal ? "transform-none" : "-translate-x-full"}`} tabindex="-1" aria-labelledby="drawer-navigation-label" aria-modal={openModal} role={openModal ? 'dialog' : ''} aria-hidden={openModal ? '' : false}>
                    <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                    <button onClick={(e) => setOpenModal(false)} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 hover:cursor-pointer rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <div className="py-4 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            {
                                /*
                            <li>
                                <button type="button" className="flex items-center w-full p-2 text-base text-blue-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                    <svg className="shrink-0 w-5 h-5 text-blue-400 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"></path>
                                    </svg>
                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"></path>
                                    </svg>
                                </button>
                                <ul id="dropdown-example" className="hidden py-2 space-y-2">
                                    <li>
                                        <a href="/" className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                    </li>
                                    <li>
                                        <a href="/" className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                    </li>
                                    <li>
                                        <a href="/" className="flex items-center w-full p-2 text-blue-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                    </li>
                                </ul>
                            </li>
                                */
                            }
                            <li>
                                <a href="/" className="flex items-center p-2 text-blue-400 font-bold hover:text-white rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700 group">
                                    <svg className="shrink-0 w-5 h-5 text-blue-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"></path>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Início</span>
                                </a>
                            </li>
                            <li>
                                <a href="/" className="flex items-center p-2 text-blue-400 font-bold hover:text-white rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700 group">
                                    <svg className="shrink-0 w-5 h-5 text-blue-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"></path>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Cadastrar Currículo</span>
                                </a>
                            </li>
                            <li>
                                <a href="/" className="flex items-center p-2 text-blue-400 font-bold hover:text-white rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700 group">
                                    <svg className="shrink-0 w-5 h-5 text-blue-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"></path>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Vagas</span>
                                </a>
                            </li>
                            <li>
                                <a href="/" className="flex items-center p-2 text-blue-400 font-bold hover:text-white rounded-lg bg-orange-400 dark:text-white hover:bg-orange-500 dark:hover:bg-gray-700 group">
                                    <svg className="shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap text-white ">Login</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    )
}