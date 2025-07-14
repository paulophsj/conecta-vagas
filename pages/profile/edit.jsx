import ProtectedRouter from "@/components/Router/ProtectedRouter";
import CandidatoUpdate from "@/components/User/Candidato/CandidatoUpdate";
import RecrutadorUpdate from "@/components/User/Recrutador/RecrutadorUpdate";
import { useEffect, useState } from "react";

export default function EditUserPage() {
    const [type, setType] = useState(null)

    useEffect(() => {
        const userType = localStorage.getItem("type")
        setType(userType)
    }, [type])

    return (
        <>
            {
                type === "recrutador" ?
                <ProtectedRouter byRecrutador={true}>
                    <RecrutadorUpdate />
                </ProtectedRouter>
                :
                <ProtectedRouter byCandidato={true}>
                    <CandidatoUpdate />
                </ProtectedRouter>
            }
        </>
    )
}