import { useEffect, useState } from "react";
import Card from "./Card";
import { useRouter } from "next/router";
import { findAllVagas } from "@/api/Vagas";
import Spinner from "../Spinner";

export default function ListCard({ quantidade, setIsLoading = () => {}}) {
    const [cards, setCards] = useState(null);
    const { pathname } = useRouter()

    useEffect(() => {
        const fetchCards = async () => {
            const response = await findAllVagas()
            setCards(response.map((vagaEmprego) => <Card key={vagaEmprego.id} vagaEmprego={vagaEmprego} />).slice(0, quantidade));
            setIsLoading(false)
        };
        fetchCards();
    }, [quantidade, setIsLoading])

    if(cards === null){
        return <Spinner />
    }

    return (
        <>
        {
            pathname == "/vagas" ? (
                    <ul className="flex flex-col w-full gap-3">
                        {cards}
                    </ul>

                ) : (
                    <ul className={`m-0 p-0 w-full flex justify-center gap-3 flex-wrap items-center md:justify-around`}>
                        {cards}
                    </ul>
                )
        }
        </>
    )
}