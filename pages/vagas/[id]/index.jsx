import { FindAllCards } from "@/services/FindAllCards";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function vaga_id() {
    const { id } = useRouter().query;
    const [vaga, setVaga] = useState(null)
    useEffect(() => {
        const fetchVaga = async () => {
            const response = await FindAllCards()
            setVaga(response.find((vaga) => vaga.id === Number(id)))
        }
        fetchVaga()
    }, [id])

    return (
        <>
            {vaga ? (
                <div>
                    <h1>{vaga.titulo}</h1>
                    <p>{vaga.descricao}</p>
                    <p>{vaga.empresa}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}