import { useLocalidades } from "@/hooks/useLocalidades"

export default function Estados({handleChange}) {
    const {estados} = useLocalidades()
    return (
        <select
            id="estado"
            name="estado"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue=""
            onChange={handleChange}
        >
            <option value={""} disabled>Estado</option>

            {
                estados.map((localidade) => (
                    <option key={localidade.id} value={localidade.sigla}>{localidade.sigla}</option>
                ))
            }
        </select>
    )
}