import Link from "next/link"
import { useSideBar } from "./SideBarProvider"
import { useUser } from "@/components/UserContext"
import { useEffect, useState } from "react"

export default function SideBar() {
    const { user, sairDaConta } = useUser()
    let { isOpen, setIsOpen } = useSideBar()
    const [type, setType] = useState(null)

    useEffect(() => {
        const hasType = localStorage.getItem("type")

        if (hasType) {
            setType(hasType)
        }

    }, [user])
    return (
        <>
            <span onClick={() => setIsOpen(false)} className={`${isOpen ? "opacity-50 pointer-events-all" : "opacity-0 pointer-events-none"} fixed z-50 w-full h-full top-0 left-0 bg-gray-900 transition-all duration-200`}></span>

            <div id="drawer-navigation" className={`fixed md:hidden lg:hidden top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform bg-white w-64 dark:bg-gray-800 ${isOpen ? "transform-none" : "-translate-x-full"}`} tabIndex="-1" aria-labelledby="drawer-navigation-label" aria-modal={isOpen} role={isOpen ? 'dialog' : ''} aria-hidden={isOpen ? '' : false}>
                <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                <button onClick={(e) => setIsOpen(false)} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-500 hover:cursor-pointer rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href={{ pathname: "/" }} onClick={() => setIsOpen(false)} className="flex items-center p-2 text-blue-400 font-bold hover:text-white rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-blue-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"></path>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Início</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={{ pathname: "/vagas" }} onClick={() => setIsOpen(false)} className="flex items-center p-2 text-blue-400 font-bold hover:text-white rounded-lg dark:text-white hover:bg-blue-400 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-blue-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"></path>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Vagas</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={{ pathname: user ? "/profile" : "/login" }} onClick={() => setIsOpen(false)} className="flex items-center p-2 text-blue-400 font-bold hover:text-white rounded-lg bg-blue-400 dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-white transition duration-75 dark:text-white group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap text-white ">{user ? type == "candidato" ? "Área do candidato" : "Área do recrutador" : "Login"}</span>
                            </Link>
                        </li>
                        {
                            user &&
                            <button onClick={() => sairDaConta()} className="flex items-center gap-3 w-full bg-gray-400 text-white py-2 px-2 font-bold rounded-lg hover:bg-gray-500 transition-colors cursor-pointer">
                                <svg className="shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                </svg>
                                Sair da conta
                            </button>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}