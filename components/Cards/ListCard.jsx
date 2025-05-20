import { FindAllCards } from "@/services/FindAllCards";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function ListCard({quantidade}){
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            const response = await FindAllCards()
            setCards(response);
        };
        fetchCards();
    }, [])

    return (
        <>
            <ul className={`m-0 p-0 w-full flex justify-center gap-3 md:gap-10 flex-wrap items-center min-lg:justify-between`}>
                {
                    cards.map((vagaEmprego) => 
                        <Card key={vagaEmprego.id} vagaEmprego={vagaEmprego} />
                    ).slice(0, quantidade)
                }
            </ul>
        </>
    )
}