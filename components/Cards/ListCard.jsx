import { FindAllCards } from "@/services/FindAllCards";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useRouter } from "next/router";

export default function ListCard({ quantidade }) {
    const [cards, setCards] = useState([]);
    const { pathname } = useRouter()

    useEffect(() => {
        const fetchCards = async () => {
            const response = await FindAllCards()
            setCards(response.map((vagaEmprego) => <Card key={vagaEmprego.id} vagaEmprego={vagaEmprego} />).slice(0, quantidade));
        };
        fetchCards();
    }, [])

    return (
        <>
            {
                pathname == "/vagas" ? (
                    <ul className="flex flex-col md:w-dvw gap-3">
                        {cards}
                    </ul>

                ) : (
                    <ul className={`m-0 p-0 w-full flex justify-center gap-3 md:gap-10 flex-wrap items-center min-lg:justify-between`}>
                        {cards}
                    </ul>
                )
        }
        </>
    )
}