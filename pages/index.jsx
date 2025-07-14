import ListCard from "@/components/Cards/ListCard";
import ListComments from "@/components/Comments/ListComments";
import { useLocalidades } from "@/hooks/useLocalidades";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Index() {
  const { estados, municipios } = useLocalidades();
  const [isMounted, setIsMounted] = useState(false);
  const [valoresBuscados, setValoresBuscados] = useState(null);
  const [inputEstado, setInputEstado] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const showOpcoes = (e) => {
    if (e.length >= 1) {
      const opcoesEstados = estados.filter((estado) =>
        estado.nome.toLowerCase().includes(e.toLowerCase())
      );
      const opcoesMunicipios = municipios
        .filter((municipio) =>
          municipio.nome?.toLowerCase().includes(e.toLowerCase())
        )
        .map((value) => ({
          nome: value?.nome,
          uf: value?.microrregiao?.mesorregiao?.UF?.nome,
        }));
      setValoresBuscados([...opcoesEstados, ...opcoesMunicipios]);
    } else {
      setValoresBuscados(null);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Tela inicial" />
      </Head>
      {/* Hero Section */}
      <section
        className={`relative transition-all duration-500 w-full ${"pt-24"
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-400/5 dark:from-blue-900/10 dark:to-blue-900/5 -z-10"></div>
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-10 transition-all duration-700 ease-out ${isMounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
            }`}
        >
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl max-lg:text-4xl text-blue-400 dark:text-white font-bold mb-6">
              Encontre a{" "}
              <span className="text-blue-500 dark:text-blue-300">
                vaga ideal
              </span>{" "}
              para você
            </h1>
            <p className="text-lg text-blue-600 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
              Conectamos talentos a oportunidades incríveis. Comece sua jornada
              profissional hoje mesmo!
            </p>
          </div>

          <form className="w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  className="w-full h-14 px-6 pr-12 rounded-lg border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400 dark:bg-gray-800 dark:text-white transition-all duration-200 shadow-lg"
                  placeholder="O que você procura? (ex.: vendedor, TI...)"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 dark:text-blue-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </div>
              </div>

              <div className="flex-1 relative group">
                <input
                  type="text"
                  id="buscar-localidade"
                  value={inputEstado}
                  onChange={(e) => {
                    setInputEstado(e.target.value);
                    showOpcoes(e.target.value);
                  }}
                  autoComplete="off"
                  className="w-full h-14 px-6 pr-12 rounded-lg border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400 dark:bg-gray-800 dark:text-white transition-all duration-200 shadow-lg"
                  placeholder="Localização (Cidade/Estado)"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 dark:text-blue-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                </div>

                {valoresBuscados && valoresBuscados.length > 0 && (
                  <div className="absolute w-full mt-1 z-50 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-blue-100 dark:border-gray-700 overflow-hidden">
                    <ul className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                      {valoresBuscados.map((localidade) => (
                        <li
                          key={localidade.id}
                          onClick={() => {
                            setInputEstado(
                              localidade.nome +
                              (localidade?.uf ? `, ${localidade.uf}` : "")
                            );
                            setValoresBuscados(null);
                          }}
                          className="p-4 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 border-b border-blue-50 dark:border-gray-700 last:border-b-0 flex items-center"
                        >
                          <svg
                            className="w-5 h-5 mr-3 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-blue-800 dark:text-blue-100 font-medium">
                            {localidade.nome}
                            {localidade?.uf && `, ${localidade.uf}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button className="h-14 px-8 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                <span>Buscar</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container mx-auto sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-blue-400 dark:text-white mb-4 md:mb-0">
            Vagas em{" "}
            <span className="text-blue-500 dark:text-blue-300">destaque</span>
          </h2>
          <Link
            href={{ pathname: "/vagas" }}
            className="flex items-center gap-2 text-blue-500 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 font-medium transition-colors duration-200"
          >
            Ver todas as vagas
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </Link>
        </div>
        <ListCard quantidade={3} />
      </section>

      {/* How It Works */}
      <section className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-400 dark:text-white mb-4">
            Como{" "}
            <span className="text-blue-500 dark:text-blue-300">funciona</span>?
          </h2>
          <p className="text-center text-blue-600 dark:text-blue-200 max-w-2xl mx-auto mb-12">
            Encontrar seu emprego dos sonhos nunca foi tão fácil. Siga esses
            simples passos:
          </p>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-200 dark:bg-gray-700 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      />
                    </svg>
                  ),
                  title: "1. Cadastre-se",
                  description:
                    "Crie sua conta em minutos e tenha acesso a milhares de vagas",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                    </svg>
                  ),
                  title: "2. Envie seu currículo",
                  description:
                    "Complete seu perfil e adicione seu currículo para se candidatar",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 0 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 1 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.118a.5.5 0 0 1-.447-.276l-1.232-2.465-2.512-4.185a.517.517 0 0 1 .809-.631l2.41 2.41A.5.5 0 0 0 6 9.5V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025" />
                    </svg>
                  ),
                  title: "3. Candidate-se com um clique",
                  description:
                    "Encontre a vaga perfeita e candidate-se em segundos",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center p-6 rounded-xl transition-all duration-200 ${activeStep === index
                      ? "transform scale-105 bg-white dark:bg-gray-700 shadow-lg"
                      : "bg-blue-100/50 dark:bg-gray-700/50"
                    }`}
                >
                  <div
                    className={`mb-4 transition-colors duration-200 ${activeStep === index ? "text-blue-500" : "text-blue-400"
                      }`}
                  >
                    {step.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-2 ${activeStep === index
                        ? "text-blue-500 dark:text-blue-300"
                        : "text-blue-400 dark:text-white"
                      }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-200">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-blue-400 dark:text-white mb-4">
          O que dizem{" "}
          <span className="text-blue-500 dark:text-blue-300">sobre nós</span>
        </h2>
        <p className="text-center text-blue-600 dark:text-blue-200 max-w-2xl mx-auto mb-12">
          Veja o que nossos usuários estão falando sobre suas experiências
        </p>
        <ListComments quantidade={4} />
      </section>

      {/* CTA Section */}
      <section className="bg-blue-500 dark:bg-blue-700 py-16 w-full mb-15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para encontrar seu emprego dos sonhos?
          </h2>
          <p className="text-blue-100 dark:text-blue-200 max-w-2xl mx-auto mb-8">
            Junte-se a milhares de profissionais que já encontraram
            oportunidades incríveis através da nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={{ pathname: "/cadastro" }}
              className="px-8 py-3 bg-white text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-blue-200/50 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
              </svg>
              Criar conta gratuita
            </Link>
            <Link
              href={{ pathname: "/vagas" }}
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              Ver vagas disponíveis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
