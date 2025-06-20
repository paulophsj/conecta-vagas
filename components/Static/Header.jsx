import Link from "next/link"
import { useEffect } from "react"
import { useSideBar } from "./SideBar/SideBarProvider"
import SideBar from "./SideBar/SideBar"

export default function Header() {
    const { isOpen, setIsOpen } = useSideBar()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        }
        else {
            document.body.style.overflow = "auto"
        }
    }, [isOpen])

    return (
        <nav className="bg-white sticky top-0 border-gray-200 dark:bg-gray-900 shadow-2xl z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href={{ pathname: "/" }} onClick={() => setIsOpen(false)} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg className="shrink-0 w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="oklch(70.7% 0.165 254.624)" viewBox="0 0 18 20">
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"></path>
                    </svg>
                    <span className="self-center text-2xl font-semibold text-blue-400 whitespace-nowrap dark:text-white">Conecta Vagas</span>
                </Link>
                <button onClick={(e) => setIsOpen(true)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm hover:cursor-pointer text-blue-400 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href={{ pathname: "/" }} onClick={() => setIsOpen(false)} className="block py-2 px-3 font-bold text-blue-400 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Início</Link>
                        </li>
                        <li>
                            <Link href={{ pathname: "/vagas" }} onClick={() => setIsOpen(false)} className="block py-2 px-3 font-bold text-blue-400 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Vagas</Link>
                        </li>
                        <li>
                            <Link href={{ pathname: "/login" }} onClick={() => setIsOpen(false)} className="block px-8 font-bold text-white bg-blue-400 rounded-sm hover:bg-blue-500 md:hover:bg-blue-500 md:border-0 md:hover:text-white md:px-4 md:py-1 dark:text-white md:dark:hover:text-white dark:hover:bg-blue-500 dark:hover:text-white md:dark:hover:bg-blue-500">Login</Link>
                        </li>
                    </ul>
                </div>
                <SideBar />
            </div>
        </nav>

    )
}