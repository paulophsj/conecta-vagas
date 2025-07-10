import ProtectedRouter from "@/components/Router/ProtectedRouter";
import CandidatoDashboard from "@/components/User/Candidato/CandidatoDashboard";
import RecrutadorDashboard from "@/components/User/Recrutador/RecrutadorDashboard";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ProfileIndexPage() {
  const [type, setType] = useState(null)

  useEffect(() => {
    const typeUser = localStorage.getItem("type")
    setType(typeUser)
  }, [])

  return (
    <ProtectedRouter byCandidato={true} byRecrutador={true}>
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Tela de uusário" />
      </Head>
      {
        type == "candidato" ? <CandidatoDashboard /> : <RecrutadorDashboard />
      }
    </ProtectedRouter>
  )
}