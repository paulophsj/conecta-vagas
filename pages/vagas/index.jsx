import ListCard from "@/components/Cards/ListCard";
import Link from "next/link";

export default function vaga_index() {
    return (
        <>

            <section className="container p-5 mx-auto flex flex-col items-center gap-10">
                <div className="w-full">
                    <ul className="flex justify-between gap-1">
                        <li className="border-gray-600 text-center border-2 w-full flex items-center justify-between p-1 hover:border-blue-600">
                            <p>Opção</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                        </li>
                        <li className="border-gray-600 text-center border-2 w-full flex items-center justify-between p-1 hover:border-blue-600">
                            <p>Opção</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                        </li>
                        <li className="border-gray-600 text-center border-2 w-full flex items-center justify-between p-1 hover:border-blue-600">
                            <p>Opção</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                        </li>
                        <li className="border-gray-600 text-center border-2 w-full flex items-center justify-between p-1 hover:border-blue-600">
                            <p>Opção</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                        </li>
                    </ul>
                </div>
                <ListCard />
            </section>
        </>
    )
}