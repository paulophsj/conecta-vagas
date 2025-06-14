import { useEffect, useState } from "react";

export default function useLocalidades() {
    const [localidades, setLocalidades] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/");
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch localidades");
                }
                setLocalidades(data.sort((a, b) => a.nome.localeCompare(b.nome)));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLocalidades();
    }, []);

    return {localidades, error, loading};
}