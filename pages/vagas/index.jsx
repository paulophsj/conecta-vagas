import Card from "@/components/Cards/Card";
import { FindAllCards } from "@/services/FindAllCards";
import { useEffect, useState } from "react";

export default function vaga_index() {
    const [vaga, setVaga] = useState([{}])

    useEffect(() => {
        const fetchVaga = async () => {
            const response = await FindAllCards()
            setVaga(response)
        }
        fetchVaga()
    }, [])

    return (
        <>
        {
            vaga ? (
                vaga.map((vaga) => (
                    <Card key={vaga.id} vagaEmprego={vaga} />
                ))
            ) : (
                <p>Loading...</p>
            )
        }
        </>
    )
}