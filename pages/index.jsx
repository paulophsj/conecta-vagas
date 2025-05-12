export default function index() {
    return (
        <>
            <section className="container mx-auto h-80 p-10 flex flex-col items-center gap-10">
                <h1 className="text-center text-5xl max-lg:text-4xl text-blue-900 font-bold">Encontre a vaga ideal <br/> para você</h1>
                <form action="" className="w-4xl flex justify-center gap-2 max-sm:flex-col max-sm:w-full max-lg:w-full">
                    <div className="w-full flex gap-2">
                        <input type="text" className="w-full max-sm:h-10 placeholder:text-blue-900 pl-5 max-sm:pl-3 focus:outline-1 focus:outline-blue-400 rounded-sm placeholder:text-center h-full" placeholder="O que você procura?(ex.: vendedor, TI...)" />
                        <input type="text" className="max-sm:hidden w-full max-sm:h-10 placeholder:text-blue-900 pl-5 focus:outline-1 focus:outline-blue-400 rounded-sm placeholder:text-center h-full" placeholder="Localização (Cidade/Estado)"/>
                        <button title="Inserir localidade" className="hidden bg-blue-400 w-15 max-sm:flex justify-center items-center rounded-sm hover:bg-blue-500 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                            </svg>
                        </button>
                    </div>
                    <button className="bg-orange-400 p-5 rounded-sm flex justify-center gap-4 hover:bg-orange-500 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        <p className="text-white m-0 hidden max-sm:block">
                            Buscar vagas
                        </p>
                    </button>
                </form>
            </section>
        </>
    )
}