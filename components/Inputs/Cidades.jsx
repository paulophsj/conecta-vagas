import { useLocalidades } from "@/hooks/useLocalidades"
import { useEffect, useState } from "react"

export default function Cidades({ byEstado }) {
    const [opcoes, setOpcoes] = useState([])
    const { municipios } = useLocalidades()

    useEffect(() => {
        if (byEstado) {
            const filtered = municipios
                .filter((municipio) =>
                    municipio.microrregiao?.mesorregiao?.UF?.sigla?.toLowerCase() === byEstado.toLowerCase()
                )
                .map((value) => ({
                    id: value.id,
                    nome: value.nome
                }));

            setOpcoes(filtered)
        } else {
            setOpcoes([])
        }
    }, [byEstado, municipios])

    return (
        <select
            id="cidade"
            name="cidade"
            className={`${!byEstado ? "bg-gray-200 dark:bg-gray-700 opacity-50 pointer-events-none select-none text-gray-400 dark:text-gray-500" : ""} w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white`}
            defaultValue=""
        >
            <option value={""} disabled>Selecionar Cidade</option>
            {opcoes.map((item) => (
                <option value={item.nome} key={item.id}>
                    {item.nome}
                </option>
            ))}
        </select>
    )
}