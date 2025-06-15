import { useEffect, useState } from "react";

export function useLocalidades() {
    const [estados, setEstados] = useState([]);
    const [municipios, setMunicipios] = useState([])

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/");
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch Estados");
                }
                setEstados(data.sort((a, b) => a.nome.localeCompare(b.nome)));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchMunicipios = async () => {
            try {
                const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios/");
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch Municipios");
                }
                setMunicipios(data.sort((a, b) => a.nome.localeCompare(b.nome)));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEstados()
        fetchMunicipios()
    }, []);

    return { estados, municipios, error, loading };
}